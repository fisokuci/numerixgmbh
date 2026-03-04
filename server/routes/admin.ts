import { randomBytes } from "node:crypto";
import type { Request, RequestHandler } from "express";
import { z } from "zod";
import type {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSessionResponse,
  AdminUmamiConfig,
} from "@shared/api";
import {
  getAdminAuthStorePath,
  getAdminCredentials,
  persistAdminPassword,
} from "../admin-auth-store";

const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
const DEFAULT_SESSION_TTL_MINUTES = 8 * 60;
const sessions = new Map<string, number>();

const AdminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const AdminChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8),
  })
  .refine(
    ({ currentPassword, newPassword }) =>
      currentPassword.trim() !== newPassword.trim(),
    {
      message: "New password must be different from the current password.",
      path: ["newPassword"],
    },
  );

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const sessionTtlMinutes = parsePositiveInt(
  process.env.ADMIN_SESSION_TTL_MINUTES,
  DEFAULT_SESSION_TTL_MINUTES,
);

const pruneExpiredSessions = () => {
  const now = Date.now();
  for (const [token, expiresAt] of sessions.entries()) {
    if (expiresAt <= now) sessions.delete(token);
  }
};

const getUmamiConfig = (): AdminUmamiConfig => {
  const websiteId = (
    process.env.VITE_UMAMI_WEBSITE_ID ??
    process.env.UMAMI_WEBSITE_ID ??
    ""
  ).trim();
  const scriptUrl = (
    process.env.VITE_UMAMI_SCRIPT_URL ??
    process.env.UMAMI_SCRIPT_URL ??
    DEFAULT_UMAMI_SCRIPT_URL
  ).trim();
  const dashboardUrl = (process.env.VITE_UMAMI_DASHBOARD_URL ?? "").trim();
  const shareUrl = (process.env.VITE_UMAMI_SHARE_URL ?? "").trim();

  return {
    configured: Boolean(websiteId),
    websiteId,
    scriptUrl,
    dashboardUrl: dashboardUrl || undefined,
    shareUrl: shareUrl || undefined,
  };
};

const getRequestToken = (req: Request) => {
  const authHeader = req.header("authorization") ?? "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  const headerToken = (req.header("x-admin-token") ?? "").trim();
  return headerToken || "";
};

const getValidSession = (req: Request) => {
  pruneExpiredSessions();
  const token = getRequestToken(req);
  if (!token) return null;

  const expiresAtMs = sessions.get(token);
  if (!expiresAtMs) return null;

  if (expiresAtMs <= Date.now()) {
    sessions.delete(token);
    return null;
  }

  return { token, expiresAtMs };
};

export const handleAdminLogin: RequestHandler = (req, res) => {
  const parsed = AdminLoginSchema.safeParse(req.body as AdminLoginRequest);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: "Invalid login payload.",
    } satisfies AdminLoginResponse);
  }

  const credentials = getAdminCredentials();

  const envPassword = (process.env.ADMIN_PASSWORD ?? "").trim();
  if (credentials.source === "env" && !envPassword) {
    return res.status(503).json({
      ok: false,
      message: "Admin authentication is not configured.",
    } satisfies AdminLoginResponse);
  }

  const { username, password } = parsed.data;
  if (
    username.trim() !== credentials.username ||
    !credentials.passwordMatches(password)
  ) {
    return res.status(401).json({
      ok: false,
      message: "Invalid credentials.",
    } satisfies AdminLoginResponse);
  }

  pruneExpiredSessions();
  const token = randomBytes(32).toString("hex");
  const expiresAtMs = Date.now() + sessionTtlMinutes * 60 * 1000;
  sessions.set(token, expiresAtMs);

  return res.status(200).json({
    ok: true,
    message: "Authenticated.",
    token,
    expiresAt: new Date(expiresAtMs).toISOString(),
    umami: getUmamiConfig(),
  } satisfies AdminLoginResponse);
};

export const handleAdminSession: RequestHandler = (req, res) => {
  const session = getValidSession(req);
  if (!session) {
    return res.status(200).json({
      authenticated: false,
    } satisfies AdminSessionResponse);
  }

  return res.status(200).json({
    authenticated: true,
    expiresAt: new Date(session.expiresAtMs).toISOString(),
    umami: getUmamiConfig(),
  } satisfies AdminSessionResponse);
};

export const handleAdminLogout: RequestHandler = (req, res) => {
  const token = getRequestToken(req);
  if (token) sessions.delete(token);

  return res.status(200).json({
    ok: true,
    message: "Logged out.",
  } satisfies AdminLoginResponse);
};

export const handleAdminChangePassword: RequestHandler = (req, res) => {
  const session = getValidSession(req);
  if (!session) {
    return res.status(401).json({
      ok: false,
      message: "Unauthorized.",
    } satisfies AdminLoginResponse);
  }

  const parsed = AdminChangePasswordSchema.safeParse(
    req.body as AdminChangePasswordRequest,
  );
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid payload.";
    return res.status(400).json({
      ok: false,
      message,
    } satisfies AdminLoginResponse);
  }

  const credentials = getAdminCredentials();
  const { currentPassword, newPassword } = parsed.data;
  if (!credentials.passwordMatches(currentPassword)) {
    return res.status(401).json({
      ok: false,
      message: "Current password is incorrect.",
    } satisfies AdminLoginResponse);
  }

  try {
    persistAdminPassword(credentials.username, newPassword);
  } catch (error) {
    console.error(
      `Failed to persist admin password to ${getAdminAuthStorePath()}:`,
      error,
    );
    return res.status(500).json({
      ok: false,
      message:
        "Password could not be saved on this server. Configure a persistent admin auth store for this deployment.",
    } satisfies AdminLoginResponse);
  }

  sessions.clear();
  return res.status(200).json({
    ok: true,
    message: "Password updated. Please sign in again.",
  } satisfies AdminLoginResponse);
};

import { randomBytes } from "node:crypto";
import type { Request, RequestHandler } from "express";
import { z } from "zod";
import type {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSessionResponse,
  AdminUmamiConfig,
} from "@shared/api";

const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
const DEFAULT_SESSION_TTL_MINUTES = 8 * 60;
const sessions = new Map<string, number>();

const AdminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

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

const getAdminCredentials = () => ({
  username: (process.env.ADMIN_USERNAME ?? "admin").trim(),
  password: (process.env.ADMIN_PASSWORD ?? "").trim(),
});

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

  const { username: expectedUsername, password: expectedPassword } =
    getAdminCredentials();

  if (!expectedPassword) {
    return res.status(503).json({
      ok: false,
      message: "Admin authentication is not configured.",
    } satisfies AdminLoginResponse);
  }

  const { username, password } = parsed.data;
  if (username !== expectedUsername || password !== expectedPassword) {
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

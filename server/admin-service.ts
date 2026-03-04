import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSessionResponse,
  AdminUmamiConfig,
} from "@shared/api";
import { getAdminAuthStorePath, getAdminCredentials, persistAdminPassword } from "./admin-auth-store";

const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
const DEFAULT_SESSION_TTL_MINUTES = 8 * 60;

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

const encodeBase64Url = (value: string) =>
  Buffer.from(value, "utf8").toString("base64url");

const decodeBase64Url = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

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

const signPayload = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

const createAdminToken = (username: string, signingSecret: string, tokenVersion: string) => {
  const expiresAtMs = Date.now() + sessionTtlMinutes * 60 * 1000;
  const payload = encodeBase64Url(
    JSON.stringify({
      exp: expiresAtMs,
      u: username,
      v: tokenVersion,
    }),
  );
  const signature = signPayload(payload, signingSecret);
  return {
    token: `${payload}.${signature}`,
    expiresAt: new Date(expiresAtMs).toISOString(),
  };
};

const verifyAdminToken = (token: string) => {
  const credentials = getAdminCredentials();
  if (!credentials.configured || !credentials.signingSecret) return null;

  const [payload, signature] = token.trim().split(".");
  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload, credentials.signingSecret);
  const provided = Buffer.from(signature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");
  if (provided.length !== expected.length) return null;
  if (!timingSafeEqual(provided, expected)) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(payload)) as {
      exp?: number;
      u?: string;
      v?: string;
    };
    if (
      typeof parsed.exp !== "number" ||
      typeof parsed.u !== "string" ||
      typeof parsed.v !== "string"
    ) {
      return null;
    }
    if (parsed.exp <= Date.now()) return null;
    if (parsed.u !== credentials.username) return null;
    if (parsed.v !== credentials.tokenVersion) return null;

    return {
      expiresAt: new Date(parsed.exp).toISOString(),
      umami: getUmamiConfig(),
    };
  } catch {
    return null;
  }
};

export const loginAdmin = (
  payload: AdminLoginRequest,
): { statusCode: number; body: AdminLoginResponse } => {
  const parsed = AdminLoginSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      statusCode: 400,
      body: {
        ok: false,
        message: "Invalid login payload.",
      },
    };
  }

  const credentials = getAdminCredentials();
  if (!credentials.configured) {
    return {
      statusCode: 503,
      body: {
        ok: false,
        message: "Admin authentication is not configured.",
      },
    };
  }

  const { username, password } = parsed.data;
  if (
    username.trim() !== credentials.username ||
    !credentials.passwordMatches(password)
  ) {
    return {
      statusCode: 401,
      body: {
        ok: false,
        message: "Invalid credentials.",
      },
    };
  }

  const { token, expiresAt } = createAdminToken(
    credentials.username,
    credentials.signingSecret,
    credentials.tokenVersion,
  );

  return {
    statusCode: 200,
    body: {
      ok: true,
      message: "Authenticated.",
      token,
      expiresAt,
      umami: getUmamiConfig(),
    },
  };
};

export const getAdminSession = (
  token: string,
): { statusCode: number; body: AdminSessionResponse } => {
  const session = verifyAdminToken(token);
  if (!session) {
    return {
      statusCode: 200,
      body: {
        authenticated: false,
      },
    };
  }

  return {
    statusCode: 200,
    body: {
      authenticated: true,
      expiresAt: session.expiresAt,
      umami: session.umami,
    },
  };
};

export const logoutAdmin = (): { statusCode: number; body: AdminLoginResponse } => ({
  statusCode: 200,
  body: {
    ok: true,
    message: "Logged out.",
  },
});

export const changeAdminPassword = (
  token: string,
  payload: AdminChangePasswordRequest,
): { statusCode: number; body: AdminLoginResponse } => {
  const session = verifyAdminToken(token);
  if (!session) {
    return {
      statusCode: 401,
      body: {
        ok: false,
        message: "Unauthorized.",
      },
    };
  }

  const parsed = AdminChangePasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      statusCode: 400,
      body: {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "Invalid payload.",
      },
    };
  }

  const credentials = getAdminCredentials();
  const { currentPassword, newPassword } = parsed.data;
  if (!credentials.passwordMatches(currentPassword)) {
    return {
      statusCode: 401,
      body: {
        ok: false,
        message: "Current password is incorrect.",
      },
    };
  }

  try {
    persistAdminPassword(credentials.username, newPassword);
    return {
      statusCode: 200,
      body: {
        ok: true,
        message: "Password updated. Please sign in again.",
      },
    };
  } catch (error) {
    console.error(
      `Failed to persist admin password to ${getAdminAuthStorePath()}:`,
      error,
    );
    return {
      statusCode: 500,
      body: {
        ok: false,
        message:
          "Password could not be saved on this server. Configure a persistent admin auth store for this deployment.",
      },
    };
  }
};

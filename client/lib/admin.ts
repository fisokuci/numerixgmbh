import type {
  AdminChangePasswordRequest,
  AdminLoginRequest,
  AdminLoginResponse,
  AdminSessionResponse,
} from "@shared/api";

const ADMIN_TOKEN_KEY = "numerix_admin_token";

const getApiBaseUrl = () => {
  const configuredBaseUrl = (
    (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ""
  )
    .replace(/\/$/, "")
    .trim();

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const isLocalDevHost =
      host === "localhost" || host === "127.0.0.1" || host === "::1";

    // In local development we always use same-origin /api to avoid accidental
    // remote API calls from stale VITE_API_BASE_URL values.
    if (isLocalDevHost) return "";
  }

  return configuredBaseUrl;
};

const toApiUrl = (path: string) => {
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}${path}` : path;
};

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";

export const setAdminToken = (token: string) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const clearAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};

const readJson = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("Server returned an invalid response.");
  }
  return (await response.json()) as T;
};

export const loginAdmin = async (payload: AdminLoginRequest) => {
  const response = await fetch(toApiUrl("/api/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await readJson<AdminLoginResponse>(response);
  return { response, data };
};

export const fetchAdminSession = async (token: string) => {
  const response = await fetch(toApiUrl("/api/admin/session"), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await readJson<AdminSessionResponse>(response);
  return { response, data };
};

export const logoutAdmin = async (token: string) => {
  const response = await fetch(toApiUrl("/api/admin/logout"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await readJson<AdminLoginResponse>(response);
  return { response, data };
};

export const changeAdminPassword = async (
  token: string,
  payload: AdminChangePasswordRequest,
) => {
  const response = await fetch(toApiUrl("/api/admin/password"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await readJson<AdminLoginResponse>(response);
  return { response, data };
};

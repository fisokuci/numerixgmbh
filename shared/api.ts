/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface ContactRequest {
  name: string;
  surname: string;
  email: string;
  message?: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminUmamiConfig {
  configured: boolean;
  websiteId: string;
  scriptUrl: string;
  dashboardUrl?: string;
  shareUrl?: string;
}

export interface AdminLoginResponse {
  ok: boolean;
  message: string;
  token?: string;
  expiresAt?: string;
  umami?: AdminUmamiConfig;
}

export interface AdminSessionResponse {
  authenticated: boolean;
  expiresAt?: string;
  umami?: AdminUmamiConfig;
}

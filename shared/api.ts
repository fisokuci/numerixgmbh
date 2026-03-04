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

export type ContactCustomerType = "private" | "business";

export type ContactSource = "contact-page" | "landing-wizard";

export interface ContactRequest {
  fullName?: string;
  name?: string;
  surname?: string;
  email: string;
  phone?: string;
  message?: string;
  remarks?: string;
  customerType?: ContactCustomerType;
  service?: string;
  source?: ContactSource;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
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

import type { HandlerEvent, HandlerResponse } from "@netlify/functions";

export const adminCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "Authorization, Content-Type, X-Admin-Token",
};

export const jsonResponse = (
  statusCode: number,
  body: unknown,
): HandlerResponse => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    ...adminCorsHeaders,
  },
  body: JSON.stringify(body),
});

export const handleOptions = (event: HandlerEvent) => {
  if (event.httpMethod !== "OPTIONS") return null;
  return {
    statusCode: 204,
    headers: adminCorsHeaders,
    body: "",
  } satisfies HandlerResponse;
};

export const getEventToken = (event: HandlerEvent) => {
  const authorization =
    event.headers.authorization ?? event.headers.Authorization ?? "";
  if (authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.slice(7).trim();
    if (token) return token;
  }

  const tokenHeader =
    event.headers["x-admin-token"] ?? event.headers["X-Admin-Token"] ?? "";
  return tokenHeader.trim();
};

export const parseJsonBody = (event: HandlerEvent) => {
  if (!event.body) return {};
  return JSON.parse(event.body);
};

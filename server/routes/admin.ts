import type { Request, RequestHandler } from "express";
import type { AdminChangePasswordRequest, AdminLoginRequest } from "@shared/api";
import {
  changeAdminPassword,
  getAdminSession,
  loginAdmin,
  logoutAdmin,
} from "../admin-service";

const getRequestToken = (req: Request) => {
  const authHeader = req.header("authorization") ?? "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }

  const headerToken = (req.header("x-admin-token") ?? "").trim();
  return headerToken || "";
};

export const handleAdminLogin: RequestHandler = (req, res) => {
  const result = loginAdmin(req.body as AdminLoginRequest);
  return res.status(result.statusCode).json(result.body);
};

export const handleAdminSession: RequestHandler = (req, res) => {
  const result = getAdminSession(getRequestToken(req));
  return res.status(result.statusCode).json(result.body);
};

export const handleAdminLogout: RequestHandler = (_req, res) => {
  const result = logoutAdmin();
  return res.status(result.statusCode).json(result.body);
};

export const handleAdminChangePassword: RequestHandler = (req, res) => {
  const result = changeAdminPassword(
    getRequestToken(req),
    req.body as AdminChangePasswordRequest,
  );
  return res.status(result.statusCode).json(result.body);
};

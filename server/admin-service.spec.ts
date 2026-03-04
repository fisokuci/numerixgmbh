import path from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import {
  changeAdminPassword,
  getAdminSession,
  loginAdmin,
} from "./admin-service";

const originalAuthFilePath = process.env.ADMIN_AUTH_FILE_PATH;
const originalAdminUsername = process.env.ADMIN_USERNAME;
const originalAdminPassword = process.env.ADMIN_PASSWORD;
const tempDirectories: string[] = [];

afterEach(() => {
  process.env.ADMIN_AUTH_FILE_PATH = originalAuthFilePath;
  process.env.ADMIN_USERNAME = originalAdminUsername;
  process.env.ADMIN_PASSWORD = originalAdminPassword;

  for (const directory of tempDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

describe("admin service", () => {
  it("creates a token that can be verified via the session endpoint", () => {
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "secret-123";

    const login = loginAdmin({
      username: "admin",
      password: "secret-123",
    });

    expect(login.statusCode).toBe(200);
    expect(login.body.ok).toBe(true);
    expect(login.body.token).toBeTruthy();

    const session = getAdminSession(login.body.token ?? "");
    expect(session.body.authenticated).toBe(true);
  });

  it("invalidates existing tokens after a password change", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "numerix-admin-service-"));
    tempDirectories.push(directory);

    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "secret-123";
    process.env.ADMIN_AUTH_FILE_PATH = path.join(directory, "admin-auth.json");

    const login = loginAdmin({
      username: "admin",
      password: "secret-123",
    });

    expect(login.body.token).toBeTruthy();

    const change = changeAdminPassword(login.body.token ?? "", {
      currentPassword: "secret-123",
      newPassword: "new-password-123",
    });
    expect(change.statusCode).toBe(200);

    const oldSession = getAdminSession(login.body.token ?? "");
    expect(oldSession.body.authenticated).toBe(false);

    const newLogin = loginAdmin({
      username: "admin",
      password: "new-password-123",
    });
    expect(newLogin.statusCode).toBe(200);
    expect(newLogin.body.ok).toBe(true);
  });
});

import path from "node:path";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import {
  getAdminCredentials,
  persistAdminPassword,
} from "./admin-auth-store";

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

describe("admin auth store", () => {
  it("falls back to env credentials when no auth file exists", () => {
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "secret-123";
    process.env.ADMIN_AUTH_FILE_PATH = path.join(
      tmpdir(),
      "missing-admin-auth.json",
    );

    const credentials = getAdminCredentials();

    expect(credentials.source).toBe("env");
    expect(credentials.configured).toBe(true);
    expect(credentials.username).toBe("admin");
    expect(credentials.passwordMatches("secret-123")).toBe(true);
    expect(credentials.passwordMatches("wrong-password")).toBe(false);
    expect(credentials.signingSecret).toBe("secret-123");
    expect(credentials.tokenVersion).not.toBe("");
  });

  it("prefers persisted credentials over env credentials", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "numerix-admin-auth-"));
    tempDirectories.push(directory);

    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "old-password";
    process.env.ADMIN_AUTH_FILE_PATH = path.join(directory, "admin-auth.json");

    persistAdminPassword("admin", "new-password-123");

    const credentials = getAdminCredentials();

    expect(credentials.source).toBe("file");
    expect(credentials.configured).toBe(true);
    expect(credentials.username).toBe("admin");
    expect(credentials.passwordMatches("new-password-123")).toBe(true);
    expect(credentials.passwordMatches("old-password")).toBe(false);
    expect(credentials.signingSecret).toContain("scrypt:");
    expect(credentials.tokenVersion).not.toBe("");
  });
});

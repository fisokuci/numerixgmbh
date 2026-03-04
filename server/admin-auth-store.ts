import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const SCRYPT_KEY_LENGTH = 64;
const HASH_PREFIX = "scrypt";
const DEFAULT_AUTH_FILE_PATH = path.join(
  process.cwd(),
  ".data",
  "admin-auth.json",
);

interface StoredAdminCredentials {
  version: 1;
  username: string;
  passwordHash: string;
  updatedAt: string;
}

export interface AdminCredentials {
  username: string;
  configured: boolean;
  passwordMatches: (password: string) => boolean;
  signingSecret: string;
  tokenVersion: string;
  source: "env" | "file";
}

const hashTokenVersion = (value: string) =>
  createHash("sha256").update(value).digest("hex");

const getAuthFilePath = () =>
  (process.env.ADMIN_AUTH_FILE_PATH ?? DEFAULT_AUTH_FILE_PATH).trim();

const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEY_LENGTH).toString("hex");
  return `${HASH_PREFIX}:${salt}:${hash}`;
};

const verifyPasswordHash = (password: string, passwordHash: string) => {
  const [prefix, salt, expectedHash] = passwordHash.split(":");
  if (prefix !== HASH_PREFIX || !salt || !expectedHash) return false;

  const actualHash = scryptSync(password, salt, SCRYPT_KEY_LENGTH);
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  if (actualHash.length !== expectedBuffer.length) return false;

  return timingSafeEqual(actualHash, expectedBuffer);
};

const readStoredCredentials = (): StoredAdminCredentials | null => {
  const filePath = getAuthFilePath();
  if (!filePath || !existsSync(filePath)) return null;

  try {
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoredAdminCredentials>;
    if (
      parsed.version !== 1 ||
      typeof parsed.username !== "string" ||
      typeof parsed.passwordHash !== "string" ||
      typeof parsed.updatedAt !== "string"
    ) {
      return null;
    }

    return {
      version: 1,
      username: parsed.username.trim(),
      passwordHash: parsed.passwordHash.trim(),
      updatedAt: parsed.updatedAt,
    };
  } catch (error) {
    console.error("Failed to read admin auth file:", error);
    return null;
  }
};

export const getAdminCredentials = (): AdminCredentials => {
  const stored = readStoredCredentials();
  if (stored?.username && stored.passwordHash) {
    return {
      configured: true,
      username: stored.username,
      passwordMatches: (password) =>
        verifyPasswordHash(password.trim(), stored.passwordHash),
      signingSecret: stored.passwordHash,
      tokenVersion: hashTokenVersion(`${stored.username}:${stored.passwordHash}`),
      source: "file",
    };
  }

  const username = (process.env.ADMIN_USERNAME ?? "admin").trim();
  const password = (process.env.ADMIN_PASSWORD ?? "").trim();

  return {
    configured: Boolean(password),
    username,
    passwordMatches: (candidate) => candidate.trim() === password,
    signingSecret: password,
    tokenVersion: password ? hashTokenVersion(`${username}:${password}`) : "",
    source: "env",
  };
};

export const persistAdminPassword = (username: string, password: string) => {
  const filePath = getAuthFilePath();
  if (!filePath) {
    throw new Error("No admin auth file path configured.");
  }

  const directory = path.dirname(filePath);
  mkdirSync(directory, { recursive: true });

  const payload: StoredAdminCredentials = {
    version: 1,
    username: username.trim(),
    passwordHash: hashPassword(password.trim()),
    updatedAt: new Date().toISOString(),
  };

  writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf8");

  return { filePath, updatedAt: payload.updatedAt };
};

export const getAdminAuthStorePath = () => getAuthFilePath();

import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import { z } from "zod";
import { Resend } from "resend";
import { randomBytes } from "node:crypto";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const optionalTrimmedString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }
  const trimmed = value.trim();
  return trimmed.length ? trimmed : void 0;
}, z.string().optional());
const ContactSchema = z.object({
  fullName: optionalTrimmedString,
  name: optionalTrimmedString,
  surname: optionalTrimmedString,
  email: z.preprocess(
    (value) => typeof value === "string" ? value.trim() : value,
    z.string().email()
  ),
  phone: optionalTrimmedString,
  message: optionalTrimmedString,
  remarks: optionalTrimmedString,
  customerType: z.enum(["private", "business"]).optional(),
  service: optionalTrimmedString,
  source: z.enum(["contact-page", "landing-wizard"]).optional()
}).superRefine((data, ctx) => {
  const hasFullName = Boolean(data.fullName);
  const hasSplitName = Boolean(data.name && data.surname);
  if (!hasFullName && !hasSplitName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either fullName or name and surname are required.",
      path: ["fullName"]
    });
  }
});
const parseContactPayload = (input) => ContactSchema.safeParse(input);
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const sanitizeHeader = (value) => value.replace(/[\r\n]+/g, " ").trim();
const getDisplayName = (payload) => payload.fullName ?? [payload.name, payload.surname].filter(Boolean).join(" ");
const getCustomerTypeLabel = (value) => {
  if (value === "private") {
    return "Privatperson";
  }
  if (value === "business") {
    return "Unternehmen";
  }
  return void 0;
};
const getSourceLabel = (value) => {
  if (value === "landing-wizard") {
    return "Landingpage Entscheidungsbaum";
  }
  if (value === "contact-page") {
    return "Kontaktseite";
  }
  return void 0;
};
const getEnv = () => {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const from = process.env.RESEND_FROM_EMAIL ?? "";
  const to = process.env.CONTACT_TO_EMAIL ?? "info@numerixgmbh.ch";
  return { apiKey, from, to };
};
const sendContactEmail = async (payload) => {
  const { apiKey, from, to } = getEnv();
  if (!apiKey || !from) {
    return { ok: false, message: "Email service is not configured." };
  }
  const resend = new Resend(apiKey);
  const displayName = getDisplayName(payload);
  const customerTypeLabel = getCustomerTypeLabel(payload.customerType);
  const sourceLabel = getSourceLabel(payload.source);
  const detailsMessage = payload.remarks ?? payload.message;
  const safeDisplayName = escapeHtml(displayName);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = payload.phone ? escapeHtml(payload.phone) : "";
  const safeService = payload.service ? escapeHtml(payload.service) : "";
  const safeCustomerType = customerTypeLabel ? escapeHtml(customerTypeLabel) : "";
  const safeSource = sourceLabel ? escapeHtml(sourceLabel) : "";
  const safeMessage = detailsMessage ? escapeHtml(detailsMessage) : "";
  const htmlMessage = safeMessage ? safeMessage.replace(/\n/g, "<br />") : "<em>No message provided.</em>";
  const subjectParts = [
    "Neue Anfrage",
    customerTypeLabel,
    payload.service,
    sanitizeHeader(displayName)
  ].filter(Boolean).map((value) => sanitizeHeader(value));
  const subject = subjectParts.join(" | ");
  const html = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${safeDisplayName}</p>
    <p><strong>E-Mail:</strong> ${safeEmail}</p>
    ${safePhone ? `<p><strong>Telefon:</strong> ${safePhone}</p>` : ""}
    ${safeCustomerType ? `<p><strong>Kundentyp:</strong> ${safeCustomerType}</p>` : ""}
    ${safeService ? `<p><strong>Anliegen:</strong> ${safeService}</p>` : ""}
    ${safeSource ? `<p><strong>Quelle:</strong> ${safeSource}</p>` : ""}
    <p><strong>Nachricht:</strong><br />${htmlMessage}</p>
  `;
  const text = [
    "Neue Kontaktanfrage",
    `Name: ${displayName}`,
    `E-Mail: ${payload.email}`,
    payload.phone ? `Telefon: ${payload.phone}` : void 0,
    customerTypeLabel ? `Kundentyp: ${customerTypeLabel}` : void 0,
    payload.service ? `Anliegen: ${payload.service}` : void 0,
    sourceLabel ? `Quelle: ${sourceLabel}` : void 0,
    "Nachricht:",
    detailsMessage?.trim() ? detailsMessage : "Keine Nachricht angegeben."
  ].filter(Boolean).join("\n");
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
    replyTo: payload.email
  });
  if (error) {
    console.error("Resend error:", error);
    return { ok: false, message: "Failed to send email." };
  }
  const autoReplyHtml = `
    <p>Hallo ${safeDisplayName},</p>
    <p>vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich.</p>
    ${safeService ? `<p><strong>Ihr Anliegen:</strong> ${safeService}</p>` : ""}
    <p><strong>Ihre Nachricht:</strong><br />${htmlMessage}</p>
    <p>Freundliche Grüsse<br />Numerix GmbH</p>
    <hr />
    <p>Hello ${safeDisplayName},</p>
    <p>Thank you for your message. We have received your request and will get back to you as soon as possible.</p>
    ${safeService ? `<p><strong>Your request:</strong> ${safeService}</p>` : ""}
    <p><strong>Your message:</strong><br />${htmlMessage}</p>
    <p>Best regards<br />Numerix GmbH</p>
  `;
  const autoReplyText = [
    `Hallo ${displayName},`,
    "vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich.",
    payload.service ? `Ihr Anliegen: ${payload.service}` : void 0,
    "",
    "Ihre Nachricht:",
    detailsMessage?.trim() ? detailsMessage : "Keine Nachricht angegeben.",
    "",
    "Freundliche Grüsse",
    "Numerix GmbH",
    "",
    `Hello ${displayName},`,
    "Thank you for your message. We have received your request and will get back to you as soon as possible.",
    payload.service ? `Your request: ${payload.service}` : void 0,
    "",
    "Your message:",
    detailsMessage?.trim() ? detailsMessage : "No message provided.",
    "",
    "Best regards",
    "Numerix GmbH"
  ].filter(Boolean).join("\n");
  const { error: autoError } = await resend.emails.send({
    from,
    to: [payload.email],
    subject: "Wir haben Ihre Nachricht erhalten | We received your message",
    html: autoReplyHtml,
    text: autoReplyText,
    replyTo: to
  });
  if (autoError) {
    console.error("Resend auto-reply error:", autoError);
  }
  return { ok: true, message: "Message sent successfully." };
};
const handleContact = async (req, res) => {
  const parsed = parseContactPayload(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid input" });
  }
  try {
    const response = await sendContactEmail(parsed.data);
    return res.status(response.ok ? 200 : 500).json(response);
  } catch (err) {
    console.error("Resend exception:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to send email."
    });
  }
};
const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
const DEFAULT_SESSION_TTL_MINUTES = 8 * 60;
const sessions = /* @__PURE__ */ new Map();
const AdminLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
const parsePositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const sessionTtlMinutes = parsePositiveInt(
  process.env.ADMIN_SESSION_TTL_MINUTES,
  DEFAULT_SESSION_TTL_MINUTES
);
const pruneExpiredSessions = () => {
  const now = Date.now();
  for (const [token, expiresAt] of sessions.entries()) {
    if (expiresAt <= now) sessions.delete(token);
  }
};
const getAdminCredentials = () => ({
  username: (process.env.ADMIN_USERNAME ?? "admin").trim(),
  password: (process.env.ADMIN_PASSWORD ?? "").trim()
});
const getUmamiConfig = () => {
  const websiteId = (process.env.VITE_UMAMI_WEBSITE_ID ?? process.env.UMAMI_WEBSITE_ID ?? "").trim();
  const scriptUrl = (process.env.VITE_UMAMI_SCRIPT_URL ?? process.env.UMAMI_SCRIPT_URL ?? DEFAULT_UMAMI_SCRIPT_URL).trim();
  const dashboardUrl = (process.env.VITE_UMAMI_DASHBOARD_URL ?? "").trim();
  const shareUrl = (process.env.VITE_UMAMI_SHARE_URL ?? "").trim();
  return {
    configured: Boolean(websiteId),
    websiteId,
    scriptUrl,
    dashboardUrl: dashboardUrl || void 0,
    shareUrl: shareUrl || void 0
  };
};
const getRequestToken = (req) => {
  const authHeader = req.header("authorization") ?? "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }
  const headerToken = (req.header("x-admin-token") ?? "").trim();
  return headerToken || "";
};
const getValidSession = (req) => {
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
const handleAdminLogin = (req, res) => {
  const parsed = AdminLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      message: "Invalid login payload."
    });
  }
  const { username: expectedUsername, password: expectedPassword } = getAdminCredentials();
  if (!expectedPassword) {
    return res.status(503).json({
      ok: false,
      message: "Admin authentication is not configured."
    });
  }
  const { username, password } = parsed.data;
  if (username !== expectedUsername || password !== expectedPassword) {
    return res.status(401).json({
      ok: false,
      message: "Invalid credentials."
    });
  }
  pruneExpiredSessions();
  const token = randomBytes(32).toString("hex");
  const expiresAtMs = Date.now() + sessionTtlMinutes * 60 * 1e3;
  sessions.set(token, expiresAtMs);
  return res.status(200).json({
    ok: true,
    message: "Authenticated.",
    token,
    expiresAt: new Date(expiresAtMs).toISOString(),
    umami: getUmamiConfig()
  });
};
const handleAdminSession = (req, res) => {
  const session = getValidSession(req);
  if (!session) {
    return res.status(200).json({
      authenticated: false
    });
  }
  return res.status(200).json({
    authenticated: true,
    expiresAt: new Date(session.expiresAtMs).toISOString(),
    umami: getUmamiConfig()
  });
};
const handleAdminLogout = (req, res) => {
  const token = getRequestToken(req);
  if (token) sessions.delete(token);
  return res.status(200).json({
    ok: true,
    message: "Logged out."
  });
};
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/contact", handleContact);
  app2.post("/api/admin/login", handleAdminLogin);
  app2.get("/api/admin/session", handleAdminSession);
  app2.post("/api/admin/logout", handleAdminLogout);
  app2.use("/api", (_req, res) => {
    res.status(404).json({ ok: false, message: "Not found" });
  });
  app2.use(
    (err, _req, res, _next) => {
      console.error("Unhandled error:", err);
      res.status(500).json({ ok: false, message: "Internal server error" });
    }
  );
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map

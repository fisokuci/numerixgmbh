import { z } from "zod";
import { Resend } from "resend";
import type { ContactRequest, ContactResponse } from "@shared/api";

const optionalTrimmedString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}, z.string().optional());

const ContactSchema = z.object({
  fullName: optionalTrimmedString,
  name: optionalTrimmedString,
  surname: optionalTrimmedString,
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.string().email(),
  ),
  phone: optionalTrimmedString,
  message: optionalTrimmedString,
  remarks: optionalTrimmedString,
  customerType: z.enum(["private", "business"]).optional(),
  service: optionalTrimmedString,
  source: z.enum(["contact-page", "landing-wizard"]).optional(),
}).superRefine((data, ctx) => {
  const hasFullName = Boolean(data.fullName);
  const hasSplitName = Boolean(data.name && data.surname);

  if (!hasFullName && !hasSplitName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either fullName or name and surname are required.",
      path: ["fullName"],
    });
  }
});

export type ContactPayload = z.infer<typeof ContactSchema>;

export const parseContactPayload = (input: unknown) =>
  ContactSchema.safeParse(input as ContactRequest);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeHeader = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const getDisplayName = (payload: ContactPayload) =>
  payload.fullName ?? [payload.name, payload.surname].filter(Boolean).join(" ");

const getCustomerTypeLabel = (value?: ContactPayload["customerType"]) => {
  if (value === "private") {
    return "Privatperson";
  }

  if (value === "business") {
    return "Unternehmen";
  }

  return undefined;
};

const getSourceLabel = (value?: ContactPayload["source"]) => {
  if (value === "landing-wizard") {
    return "Landingpage Entscheidungsbaum";
  }

  if (value === "contact-page") {
    return "Kontaktseite";
  }

  return undefined;
};

const getEnv = () => {
  const apiKey = process.env.RESEND_API_KEY ?? "";
  const from = process.env.RESEND_FROM_EMAIL ?? "";
  const to = process.env.CONTACT_TO_EMAIL ?? "info@numerixgmbh.ch";
  return { apiKey, from, to };
};

export const sendContactEmail = async (
  payload: ContactPayload,
): Promise<ContactResponse> => {
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
  const htmlMessage = safeMessage
    ? safeMessage.replace(/\n/g, "<br />")
    : "<em>No message provided.</em>";

  const subjectParts = [
    "Neue Anfrage",
    customerTypeLabel,
    payload.service,
    sanitizeHeader(displayName),
  ]
    .filter(Boolean)
    .map((value) => sanitizeHeader(value));
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
    payload.phone ? `Telefon: ${payload.phone}` : undefined,
    customerTypeLabel ? `Kundentyp: ${customerTypeLabel}` : undefined,
    payload.service ? `Anliegen: ${payload.service}` : undefined,
    sourceLabel ? `Quelle: ${sourceLabel}` : undefined,
    "Nachricht:",
    detailsMessage?.trim() ? detailsMessage : "Keine Nachricht angegeben.",
  ]
    .filter(Boolean)
    .join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
    replyTo: payload.email,
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
    payload.service ? `Ihr Anliegen: ${payload.service}` : undefined,
    "",
    "Ihre Nachricht:",
    detailsMessage?.trim() ? detailsMessage : "Keine Nachricht angegeben.",
    "",
    "Freundliche Grüsse",
    "Numerix GmbH",
    "",
    `Hello ${displayName},`,
    "Thank you for your message. We have received your request and will get back to you as soon as possible.",
    payload.service ? `Your request: ${payload.service}` : undefined,
    "",
    "Your message:",
    detailsMessage?.trim() ? detailsMessage : "No message provided.",
    "",
    "Best regards",
    "Numerix GmbH",
  ]
    .filter(Boolean)
    .join("\n");

  const { error: autoError } = await resend.emails.send({
    from,
    to: [payload.email],
    subject: "Wir haben Ihre Nachricht erhalten | We received your message",
    html: autoReplyHtml,
    text: autoReplyText,
    replyTo: to,
  });

  if (autoError) {
    console.error("Resend auto-reply error:", autoError);
  }

  return { ok: true, message: "Message sent successfully." };
};

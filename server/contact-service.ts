import { z } from "zod";
import { Resend } from "resend";
import type { ContactRequest, ContactResponse } from "@shared/api";

const ContactSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
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
  const safeName = escapeHtml(payload.name);
  const safeSurname = escapeHtml(payload.surname);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = payload.message ? escapeHtml(payload.message) : "";
  const htmlMessage = safeMessage
    ? safeMessage.replace(/\n/g, "<br />")
    : "<em>No message provided.</em>";

  const subject = `Neue Kontaktanfrage: ${sanitizeHeader(payload.name)} ${sanitizeHeader(payload.surname)}`;
  const html = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${safeName} ${safeSurname}</p>
    <p><strong>E-Mail:</strong> ${safeEmail}</p>
    <p><strong>Nachricht:</strong><br />${htmlMessage}</p>
  `;
  const text = [
    "Neue Kontaktanfrage",
    `Name: ${payload.name} ${payload.surname}`,
    `E-Mail: ${payload.email}`,
    "Nachricht:",
    payload.message?.trim() ? payload.message : "Keine Nachricht angegeben.",
  ].join("\n");

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
    <p>Hallo ${safeName},</p>
    <p>vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich.</p>
    <p><strong>Ihre Nachricht:</strong><br />${htmlMessage}</p>
    <p>Freundliche Grüsse<br />Numerix GmbH</p>
    <hr />
    <p>Hello ${safeName},</p>
    <p>Thank you for your message. We have received your request and will get back to you as soon as possible.</p>
    <p><strong>Your message:</strong><br />${htmlMessage}</p>
    <p>Best regards<br />Numerix GmbH</p>
  `;
  const autoReplyText = [
    `Hallo ${payload.name},`,
    "vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und melden uns so schnell wie möglich.",
    "",
    "Ihre Nachricht:",
    payload.message?.trim() ? payload.message : "Keine Nachricht angegeben.",
    "",
    "Freundliche Grüsse",
    "Numerix GmbH",
    "",
    "Hello",
    "Thank you for your message. We have received your request and will get back to you as soon as possible.",
    "",
    "Your message:",
    payload.message?.trim() ? payload.message : "No message provided.",
    "",
    "Best regards",
    "Numerix GmbH",
  ].join("\n");

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

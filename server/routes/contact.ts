import { RequestHandler } from "express";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "@shared/api";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY ?? "");
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "info@numerixgmbh.ch";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeHeader = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export const handleContact: RequestHandler = async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body as ContactRequest);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid input" } satisfies ContactResponse);
  }

  const payload = parsed.data;

  if (!process.env.RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    return res.status(500).json({
      ok: false,
      message: "Email service is not configured.",
    } satisfies ContactResponse);
  }

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

  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      subject,
      html,
      text,
      replyTo: payload.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({
        ok: false,
        message: "Failed to send email.",
      } satisfies ContactResponse);
    }

    return res.status(200).json({
      ok: true,
      message: "Message sent successfully.",
    } satisfies ContactResponse);
  } catch (err) {
    console.error("Resend exception:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to send email.",
    } satisfies ContactResponse);
  }
};

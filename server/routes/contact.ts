import { RequestHandler } from "express";
import type { ContactResponse } from "@shared/api";
import { parseContactPayload, sendContactEmail } from "../contact-service";

export const handleContact: RequestHandler = async (req, res) => {
  const parsed = parseContactPayload(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid input" } satisfies ContactResponse);
  }

  try {
    const response = await sendContactEmail(parsed.data);
    return res.status(response.ok ? 200 : 500).json(response satisfies ContactResponse);
  } catch (err) {
    console.error("Resend exception:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to send email.",
    } satisfies ContactResponse);
  }
};

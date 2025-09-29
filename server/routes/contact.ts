import { RequestHandler } from "express";
import { z } from "zod";
import type { ContactRequest, ContactResponse } from "@shared/api";

const ContactSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  address: z.string().min(1),
});

export const handleContact: RequestHandler = (req, res) => {
  const parsed = ContactSchema.safeParse(req.body as ContactRequest);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, message: "Invalid input" } satisfies ContactResponse);
  }

  const payload = parsed.data;

  // In a real app you would persist this to a database or send an email.
  // For now, log it so it can be reviewed from server logs.
  console.log("New coming-soon signup:", payload);

  const response: ContactResponse = {
    ok: true,
    message: "Well be in touch soon.",
  };

  return res.status(200).json(response);
};

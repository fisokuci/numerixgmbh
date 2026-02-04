import type { Handler } from "@netlify/functions";
import type { ContactResponse } from "@shared/api";
import { parseContactPayload, sendContactEmail } from "../../server/contact-service";

export const handler: Handler = async (event) => {
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type": "application/json", ...corsHeaders },
      body: JSON.stringify({ ok: false, message: "Method not allowed" } satisfies ContactResponse),
    };
  }

  let data: unknown;
  try {
    data = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json", ...corsHeaders },
      body: JSON.stringify({ ok: false, message: "Invalid JSON" } satisfies ContactResponse),
    };
  }

  const parsed = parseContactPayload(data);
  if (!parsed.success) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json", ...corsHeaders },
      body: JSON.stringify({ ok: false, message: "Invalid input" } satisfies ContactResponse),
    };
  }

  const response = await sendContactEmail(parsed.data);
  return {
    statusCode: response.ok ? 200 : 500,
    headers: { "content-type": "application/json", ...corsHeaders },
    body: JSON.stringify(response),
  };
};

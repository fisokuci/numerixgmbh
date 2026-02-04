import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  const message = process.env.PING_MESSAGE ?? "ping";
  const corsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "Content-Type",
  };
  return {
    statusCode: 200,
    headers: { "content-type": "application/json", ...corsHeaders },
    body: JSON.stringify({ message }),
  };
};

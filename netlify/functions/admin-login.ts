import type { Handler } from "@netlify/functions";
import { loginAdmin } from "../../server/admin-service";
import { handleOptions, jsonResponse, parseJsonBody } from "./admin-utils";

export const handler: Handler = async (event) => {
  const optionsResponse = handleOptions(event);
  if (optionsResponse) return optionsResponse;

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed" });
  }

  try {
    const result = loginAdmin(parseJsonBody(event));
    return jsonResponse(result.statusCode, result.body);
  } catch {
    return jsonResponse(400, { ok: false, message: "Invalid JSON" });
  }
};

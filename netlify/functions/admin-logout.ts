import type { Handler } from "@netlify/functions";
import { logoutAdmin } from "../../server/admin-service";
import { handleOptions, jsonResponse } from "./admin-utils";

export const handler: Handler = async (event) => {
  const optionsResponse = handleOptions(event);
  if (optionsResponse) return optionsResponse;

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, message: "Method not allowed" });
  }

  const result = logoutAdmin();
  return jsonResponse(result.statusCode, result.body);
};

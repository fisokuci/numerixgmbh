import type { Handler } from "@netlify/functions";
import { getAdminSession } from "../../server/admin-service";
import { getEventToken, handleOptions, jsonResponse } from "./admin-utils";

export const handler: Handler = async (event) => {
  const optionsResponse = handleOptions(event);
  if (optionsResponse) return optionsResponse;

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { ok: false, message: "Method not allowed" });
  }

  const result = getAdminSession(getEventToken(event));
  return jsonResponse(result.statusCode, result.body);
};

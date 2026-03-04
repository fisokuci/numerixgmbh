import type { AdminUmamiConfig } from "@shared/api";

export const UMAMI_SCRIPT_ID = "umami-analytics-script";
export const DEFAULT_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";

const DEFAULT_UMAMI_WEBSITE_ID = "70655b6e-4de0-42db-b8a8-c18f1632472b";
const DEFAULT_UMAMI_SHARE_URL =
  "https://cloud.umami.is/analytics/eu/share/5Vkt2kpt3BD7W7Bp";

const readPublicEnv = (key: keyof ImportMetaEnv) =>
  (import.meta.env[key] as string | undefined)?.trim();

export const getFrontendUmamiConfig = (): AdminUmamiConfig => {
  const script =
    typeof document !== "undefined"
      ? document.getElementById(UMAMI_SCRIPT_ID)
      : null;

  const websiteId =
    script?.getAttribute("data-website-id")?.trim() ||
    readPublicEnv("VITE_UMAMI_WEBSITE_ID") ||
    DEFAULT_UMAMI_WEBSITE_ID;

  const scriptUrl =
    (script instanceof HTMLScriptElement ? script.src.trim() : "") ||
    readPublicEnv("VITE_UMAMI_SCRIPT_URL") ||
    DEFAULT_UMAMI_SCRIPT_URL;

  const dashboardUrl = readPublicEnv("VITE_UMAMI_DASHBOARD_URL");
  const shareUrl =
    readPublicEnv("VITE_UMAMI_SHARE_URL") || DEFAULT_UMAMI_SHARE_URL;

  return {
    configured: Boolean(websiteId),
    websiteId,
    scriptUrl,
    dashboardUrl: dashboardUrl || undefined,
    shareUrl: shareUrl || undefined,
  };
};

const SCRIPT_ID = "Cookiebot";
const SCRIPT_URL = "https://consent.cookiebot.com/uc.js";

function isLocalHostname(hostname: string) {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

export function getCookiebotConfig() {
  const enabled =
    (import.meta.env.VITE_COOKIEBOT_ENABLED as string | undefined)
      ?.trim()
      .toLowerCase() === "true";
  const cbid = (
    import.meta.env.VITE_COOKIEBOT_CBID as string | undefined
  )?.trim();
  const culture = (
    import.meta.env.VITE_COOKIEBOT_CULTURE as string | undefined
  )?.trim();

  const hostname =
    typeof window === "undefined" ? "" : window.location.hostname;
  const active = enabled && !!cbid && !isLocalHostname(hostname);

  return {
    active,
    cbid,
    culture,
    scriptId: SCRIPT_ID,
    scriptUrl: SCRIPT_URL,
  };
}

export function isCookiebotActive() {
  return getCookiebotConfig().active;
}

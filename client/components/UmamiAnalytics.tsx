import { useEffect } from "react";

const SCRIPT_ID = "umami-analytics-script";
const DEFAULT_SCRIPT_URL = "https://cloud.umami.is/script.js";

export default function UmamiAnalytics() {
  useEffect(() => {
    const websiteId = (
      import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined
    )?.trim();
    if (!websiteId) return;

    const loadUmami = () => {
      const existingScript = document.getElementById(SCRIPT_ID);
      if (existingScript) return;

      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.defer = true;
      script.src =
        (import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined)?.trim() ||
        DEFAULT_SCRIPT_URL;
      script.setAttribute("data-website-id", websiteId);
      script.setAttribute("data-auto-track", "true");
      script.setAttribute("data-do-not-track", "true");

      const hostUrl = (
        import.meta.env.VITE_UMAMI_HOST_URL as string | undefined
      )?.trim();
      if (hostUrl) {
        script.setAttribute("data-host-url", hostUrl);
      }

      const domains = (
        import.meta.env.VITE_UMAMI_DOMAINS as string | undefined
      )?.trim();
      if (domains) {
        script.setAttribute("data-domains", domains);
      }

      document.head.append(script);
    };

    const hasCookiebot = document.getElementById("Cookiebot") !== null;
    if (!hasCookiebot) {
      loadUmami();
      return;
    }

    const maybeLoadUmami = () => {
      if (window.Cookiebot?.consent.statistics) {
        loadUmami();
      }
    };

    maybeLoadUmami();

    window.addEventListener("CookiebotOnConsentReady", maybeLoadUmami);
    window.addEventListener("CookiebotOnAccept", maybeLoadUmami);

    return () => {
      window.removeEventListener("CookiebotOnConsentReady", maybeLoadUmami);
      window.removeEventListener("CookiebotOnAccept", maybeLoadUmami);
    };
  }, []);

  return null;
}

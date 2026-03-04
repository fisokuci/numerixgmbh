import { useEffect } from "react";
import {
  hasCookiebotStatisticsConsent,
  isCookiebotActive,
} from "@/lib/cookiebot";
import {
  DEFAULT_UMAMI_SCRIPT_URL,
  getFrontendUmamiConfig,
  UMAMI_SCRIPT_ID,
} from "@/lib/umami";

export default function UmamiAnalytics() {
  useEffect(() => {
    const { websiteId, scriptUrl } = getFrontendUmamiConfig();
    if (!websiteId) return;

    const loadUmami = () => {
      const existingScript = document.getElementById(UMAMI_SCRIPT_ID);
      if (existingScript) return;

      const script = document.createElement("script");
      script.id = UMAMI_SCRIPT_ID;
      script.defer = true;
      script.src = scriptUrl || DEFAULT_UMAMI_SCRIPT_URL;
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

    if (!isCookiebotActive()) {
      loadUmami();
      return;
    }

    const maybeLoadUmami = () => {
      if (hasCookiebotStatisticsConsent()) {
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

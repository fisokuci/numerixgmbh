import { useEffect } from "react";
import { getCookiebotConfig } from "@/lib/cookiebot";

export default function CookiebotBanner() {
  useEffect(() => {
    const config = getCookiebotConfig();
    if (!config.active || !config.cbid) return;

    const existingScript = document.getElementById(config.scriptId);
    if (existingScript) return;

    const script = document.createElement("script");
    script.id = config.scriptId;
    script.src = config.scriptUrl;
    script.async = true;
    script.type = "text/javascript";
    script.setAttribute("data-cbid", config.cbid);

    if (config.culture) {
      script.setAttribute("data-culture", config.culture);
    }

    document.head.append(script);
  }, []);

  return null;
}

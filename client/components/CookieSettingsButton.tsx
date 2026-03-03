import { Button } from "@/components/ui/button";
import { isCookiebotActive } from "@/lib/cookiebot";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck } from "lucide-react";

type CookieSettingsButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
};

export default function CookieSettingsButton({
  className,
  variant = "outline",
}: CookieSettingsButtonProps) {
  const { lang } = useLanguage();

  if (!isCookiebotActive()) return null;

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => window.Cookiebot?.renew()}
    >
      <ShieldCheck className="h-4 w-4" />
      {lang === "de" ? "Cookie-Einstellungen" : "Cookie settings"}
    </Button>
  );
}

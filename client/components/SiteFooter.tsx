import CookieSettingsButton from "@/components/CookieSettingsButton";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { lang } = useLanguage();

  const content = {
    de: {
      tagline:
        "Digitale Treuhand, klare Prozesse und verlässliche Begleitung für Schweizer Unternehmen.",
      legalTitle: "Rechtliches",
      contactTitle: "Kontakt",
      links: [
        { href: "/#/", label: "Startseite" },
        { href: "/#/kontakt", label: "Kontakt" },
        { href: "/#/impressum", label: "Impressum" },
        { href: "/#/datenschutz", label: "Datenschutz" },
        { href: "/#/formulare", label: "Formulare" },
      ],
      rights: "Alle Rechte vorbehalten.",
    },
    en: {
      tagline:
        "Digital fiduciary services, clear processes and reliable support for Swiss businesses.",
      legalTitle: "Legal",
      contactTitle: "Contact",
      links: [
        { href: "/#/", label: "Home" },
        { href: "/#/kontakt", label: "Contact" },
        { href: "/#/imprint", label: "Imprint" },
        { href: "/#/privacy", label: "Privacy" },
        { href: "/#/formulare", label: "Forms" },
      ],
      rights: "All rights reserved.",
    },
  };

  const t = content[lang];

  return (
    <footer className="relative border-t border-border/70 bg-muted/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Numerix GmbH
          </p>
          <p className="max-w-md text-sm text-muted-foreground">{t.tagline}</p>
          <CookieSettingsButton className="rounded-xl border-primary/30 bg-background/70 hover:bg-primary/10" />
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t.legalTitle}
          </h2>
          <div className="flex flex-col gap-2">
            {t.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {t.contactTitle}
          </h2>
          <div className="space-y-2 text-sm text-foreground/80">
            <p>Numerix GmbH</p>
            <p>Pratteln, Schweiz</p>
            <a
              href="mailto:info@numerixgmbh.ch"
              className="block transition-colors hover:text-primary"
            >
              info@numerixgmbh.ch
            </a>
            <a
              href="tel:+41798333733"
              className="block transition-colors hover:text-primary"
            >
              +41 79 833 37 33
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container flex flex-col gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} Numerix GmbH. {t.rights}</p>
          <p>{lang === "de" ? "Stand: 3. März 2026" : "Last updated: March 3, 2026"}</p>
        </div>
      </div>
    </footer>
  );
}

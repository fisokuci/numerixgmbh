import { useLanguage } from "@/contexts/LanguageContext";

type ImprintRow = {
  label: string;
  value: string;
  href?: string;
};

export default function Imprint() {
  const { lang } = useLanguage();

  const content: Record<
    "de" | "en",
    {
      title: string;
      subtitle: string;
      company: string;
      addressLabel: string;
      address: string[];
      contactTitle: string;
      contact: ImprintRow[];
      registryTitle: string;
      registry: ImprintRow[];
    }
  > = {
    de: {
      title: "Impressum",
      subtitle:
        "Unternehmensangaben gemäss Handelsregister und den auf dieser Website verwendeten Kontaktdaten.",
      company: "Numerix GmbH",
      addressLabel: "Adresse",
      address: ["Bahnhofstrasse 16", "4133 Pratteln", "Schweiz"],
      contactTitle: "Kontakt",
      contact: [
        {
          label: "Telefon",
          value: "+41 79 833 37 33",
          href: "tel:+41798333733",
        },
        {
          label: "E-Mail",
          value: "info@numerixgmbh.ch",
          href: "mailto:info@numerixgmbh.ch",
        },
        {
          label: "Webseite",
          value: "numerixgmbh.ch",
          href: "https://numerixgmbh.ch",
        },
      ],
      registryTitle: "Registerdaten",
      registry: [
        {
          label: "Rechtsform",
          value: "Gesellschaft mit beschränkter Haftung",
        },
        { label: "Sitz", value: "Pratteln" },
        { label: "Status", value: "aktiv" },
        { label: "UID", value: "CHE-249.233.629" },
        { label: "CH-ID", value: "CH-280-4031391-4" },
      ],
    },
    en: {
      title: "Imprint",
      subtitle:
        "Company details based on the commercial register and the contact information used on this website.",
      company: "Numerix GmbH",
      addressLabel: "Address",
      address: ["Bahnhofstrasse 16", "4133 Pratteln", "Switzerland"],
      contactTitle: "Contact",
      contact: [
        {
          label: "Phone",
          value: "+41 79 833 37 33",
          href: "tel:+41798333733",
        },
        {
          label: "Email",
          value: "info@numerixgmbh.ch",
          href: "mailto:info@numerixgmbh.ch",
        },
        {
          label: "Website",
          value: "numerixgmbh.ch",
          href: "https://numerixgmbh.ch",
        },
      ],
      registryTitle: "Register details",
      registry: [
        {
          label: "Legal form",
          value: "Private limited liability company (GmbH)",
        },
        { label: "Registered office", value: "Pratteln" },
        { label: "Status", value: "active" },
        { label: "UID", value: "CHE-249.233.629" },
        { label: "CH-ID", value: "CH-280-4031391-4" },
      ],
    },
  };

  const t = content[lang];

  return (
    <div className="relative min-h-screen overflow-hidden bg-muted/30">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute left-[-6rem] top-28 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-[-5rem] top-40 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />

      <main className="container relative py-16 md:py-24">
        <section className="mb-14 text-center md:mb-20">
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Numerix GmbH
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {t.subtitle}
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div className="rounded-[2rem] border border-border/70 bg-background/95 p-8 shadow-sm backdrop-blur md:p-12">
            <p className="text-2xl font-semibold sm:text-3xl">{t.company}</p>
            <div className="mt-8 space-y-3 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.addressLabel}
              </p>
              {t.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-border/70 pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.contactTitle}
              </p>
              <div className="mt-5 space-y-4">
                {t.contact.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
                  >
                    <span className="text-base font-semibold text-foreground">
                      {item.label}:
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base text-foreground/80 transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-base text-foreground/80">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-border/70 bg-background/80 p-8 shadow-sm backdrop-blur md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {t.registryTitle}
            </p>
            <div className="mt-6 space-y-5">
              {t.registry.map((item) => (
                <div key={item.label} className="border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

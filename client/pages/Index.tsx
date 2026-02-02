import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_URL = "./landing_page_numerix.jpg";

export default function Index() {
  const { lang } = useLanguage();
  const content = {
    de: {
      eyebrow: "Numerix GmbH",
      title: "Digital. Klar. Zuverlässig.",
      subtitle: "Sie fokussieren sich auf Ihr Business - wir auf Ihre Zahlen.",
      subline: "Treuhand neu gedacht",
      body:
        "Ihr Unternehmen verdient einen Partner, der nicht nur verwaltet, sondern mitdenkt. Numerix GmbH steht für digitale Prozesse, transparente Beratung und messbaren Mehrwert. Gemeinsam schaffen wir eine stabile finanzielle Basis für nachhaltiges Wachstum.",
      ctaPrimary: "Kontakt aufnehmen",
      ctaSecondary: "Leistungen ansehen",
      highlights: [],
      servicesTitle: "Leistungen, die den Alltag erleichtern",
      services: [
        {
          title: "Treuhand & Finanzbuchhaltung",
          description:
            "Saubere Abschlüsse, laufende Buchhaltung und fundierte Beratung.",
        },
        {
          title: "Lohn & HR-Administration",
          description:
            "Payroll, Verträge und Mutationen effizient abgewickelt.",
        },
        {
          title: "Steuern & Reporting",
          description:
            "Klare Zahlen, verständliche Reports und vorausschauende Planung.",
        },
      ],
      processTitle: "So arbeiten wir",
      processIntro:
        "Wir schaffen eine stabile Basis und halten die Umsetzung transparent.",
      process: [
        {
          title: "Analyse",
          description:
            "Wir verstehen Ihre Abläufe und identifizieren Optimierungspotenzial.",
        },
        {
          title: "Umsetzung",
          description:
            "Digitale Prozesse, die zuverlässig und transparent laufen.",
        },
        {
          title: "Begleitung",
          description:
            "Regelmäßige Reviews und klare Kommunikation auf Augenhöhe.",
        },
      ],
      ctaTitle: "Bereit für klare Zahlen?",
      ctaText:
        "Wir zeigen Ihnen, wie wir Ihre Administration entlasten und Entscheidungen vereinfachen.",
    },
    en: {
      eyebrow: "Numerix GmbH",
      title: "Digital. Clear. Reliable.",
      subtitle: "You focus on your business - we focus on your numbers.",
      subline: "Fiduciary reimagined",
      body:
        "We bring structure to finance, payroll and administration with transparency, efficiency and clear decisions.",
      ctaPrimary: "Get in touch",
      ctaSecondary: "View services",
      highlights: [
        "Digital collaboration with clear processes.",
        "Personal guidance with dedicated contacts.",
        "Transparent reporting and reliable timelines.",
      ],
      servicesTitle: "Services that simplify your day",
      services: [
        {
          title: "Fiduciary & Financial Accounting",
          description:
            "Accurate bookkeeping, clean closings and reliable advice.",
        },
        {
          title: "Payroll & HR Administration",
          description:
            "Payroll, contracts and changes handled efficiently.",
        },
        {
          title: "Tax & Reporting",
          description:
            "Clear numbers, understandable reports and forward planning.",
        },
      ],
      processTitle: "How we work",
      processIntro:
        "We build a stable foundation and keep execution transparent.",
      process: [
        {
          title: "Analysis",
          description:
            "We understand your workflows and uncover optimization potential.",
        },
        {
          title: "Execution",
          description:
            "Digital processes that run reliably and transparently.",
        },
        {
          title: "Guidance",
          description:
            "Regular reviews and clear communication at eye level.",
        },
      ],
      ctaTitle: "Ready for clarity in your numbers?",
      ctaText:
        "We show you how we reduce admin effort and simplify decisions.",
    },
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative overflow-hidden">
          <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-6 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {t.eyebrow}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                {t.subtitle}
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.subline}
              </p>
              {t.body ? (
                <p className="max-w-2xl text-muted-foreground">{t.body}</p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="/#/kontakt">{t.ctaPrimary}</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/#/dienstleistungen">{t.ctaSecondary}</a>
                </Button>
              </div>
              {t.highlights.length ? (
                <div className="grid gap-3 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                  {t.highlights.map((item) => (
                    <div key={item} className="rounded-lg border bg-background/70 p-3">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-primary/15 via-transparent to-primary/25" />
              <div className="relative overflow-hidden rounded-3xl border bg-background shadow-lg">
                <img
                  src={HERO_URL}
                  alt="Numerix GmbH"
                  className="h-[420px] w-full object-cover sm:h-[520px]"
                  style={{ objectPosition: "50% 12%" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="mb-10 max-w-2xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.servicesTitle}
            </h2>
            <p className="text-muted-foreground">
              {lang === "de"
                ? "Strukturiert, digital und immer nachvollziehbar."
                : "Structured, digital and always transparent."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {t.services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container pb-16">
          <div className="rounded-3xl border bg-muted/30 p-8 md:p-12">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.processTitle}
              </h2>
              <p className="max-w-lg text-muted-foreground">{t.processIntro}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {t.process.map((step, index) => (
                <div key={step.title} className="rounded-2xl bg-background p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container pb-20">
          <div className="rounded-3xl border bg-primary/10 px-6 py-10 text-center md:px-10 md:py-12">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {t.ctaText}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href="/#/kontakt">{t.ctaPrimary}</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/#/dienstleistungen">{t.ctaSecondary}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

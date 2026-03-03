import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Briefcase,
  Shield,
  Users,
  FileText,
  TrendingUp,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_URL = "./logo_header.jpeg";

type ServiceCard = {
  id: string;
  icon: typeof Briefcase;
  title: string;
  description: string;
  color: string;
  detailTitle: string;
  detailText: string;
  detailPoints: Array<{
    title: string;
    text: string;
  }>;
};

export default function Products() {
  const { lang } = useLanguage();
  const detailsRef = useRef<HTMLElement | null>(null);
  const shouldScrollRef = useRef(false);

  const content = {
    de: {
      title: "Unsere Leistungen",
      subtitle: "Umfassende Lösungen für Ihr Geschäft",
      description:
        "Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen.",
      detailEyebrow: "Mehr zu dieser Leistung",
      detailCta: "Unverbindlich anfragen",
      services: [
        {
          id: "unternehmensberatung",
          icon: Briefcase,
          title: "Unternehmensberatung",
          description:
            "Strategische Begleitung für fundierte Entscheidungen – von der Gründung bis zur Skalierung.",
          color: "from-blue-500 to-blue-600",
          detailTitle: "Unternehmensberatung für klare Entscheidungen im Alltag und im Wachstum",
          detailText:
            "Wir begleiten Schweizer Unternehmen vom ersten Businessplan bis zur Weiterentwicklung bestehender Strukturen. Dabei geht es nicht um Theorie, sondern um umsetzbare Entscheidungen mit Blick auf Liquidität, Organisation und Verantwortlichkeiten.",
          detailPoints: [
            {
              title: "Gründung und Aufbau",
              text:
                "Wir unterstützen bei Rechtsform, Aufbau der Finanzprozesse und einer sauberen organisatorischen Basis für den Start.",
            },
            {
              title: "Führung und Steuerung",
              text:
                "Gemeinsam schärfen wir Rollen, Abläufe und Kennzahlen, damit Entscheidungen schneller und fundierter getroffen werden können.",
            },
            {
              title: "Wachstum und Struktur",
              text:
                "Bei Expansion, neuen Standorten oder zusätzlichem Personal helfen wir, die nächste Phase kontrolliert und wirtschaftlich sinnvoll aufzusetzen.",
            },
          ],
        },
        {
          id: "rechnungswesen-controlling",
          icon: TrendingUp,
          title: "Rechnungswesen & Controlling",
          description:
            "Digitale Buchhaltung, klare Auswertungen und volle Kostenkontrolle in Echtzeit.",
          color: "from-green-500 to-green-600",
          detailTitle: "Rechnungswesen mit Überblick statt Nachbearbeitung",
          detailText:
            "Ein sauberes Rechnungswesen schafft nicht nur Ordnung, sondern liefert die Grundlage für bessere Entscheidungen. Wir sorgen dafür, dass Zahlen aktuell, verständlich und direkt nutzbar sind.",
          detailPoints: [
            {
              title: "Digitale Buchhaltung",
              text:
                "Belege, Kreditoren und Debitoren werden effizient verarbeitet, damit Ihre Administration weniger Zeit kostet und jederzeit nachvollziehbar bleibt.",
            },
            {
              title: "Monatliche Auswertungen",
              text:
                "Sie erhalten verständliche Reports zu Umsatz, Kosten, Marge und Liquidität, abgestimmt auf die Realität Ihres Betriebs.",
            },
            {
              title: "Budget und Kontrolle",
              text:
                "Wir richten Budgets, Forecasts und einfache Kontrollmechanismen ein, damit Abweichungen früh sichtbar werden.",
            },
          ],
        },
        {
          id: "vorsorge-nachlassplanung",
          icon: Lock,
          title: "Vorsorge- & Nachlassplanung",
          description:
            "Weitsichtige Planung für Unternehmer, Familien und die nächste Generation – von finanzieller Vorsorge bis zur optimalen Nachlassregelung.",
          color: "from-purple-500 to-purple-600",
          detailTitle: "Vorsorge- und Nachlassplanung mit Weitblick",
          detailText:
            "Gerade für Unternehmerinnen, Unternehmer und Familien in der Schweiz lohnt sich eine frühzeitige Planung. So lassen sich private Ziele, Unternehmensinteressen und steuerliche Fragen rechtzeitig aufeinander abstimmen.",
          detailPoints: [
            {
              title: "Private Vorsorgeplanung",
              text:
                "Wir prüfen Ihre heutige Situation und zeigen auf, wie Säule 3a, BVG und freie Mittel sinnvoll zusammenspielen können.",
            },
            {
              title: "Unternehmensnachfolge",
              text:
                "Bei einer Übergabe innerhalb der Familie oder an Dritte begleiten wir die finanzielle und organisatorische Vorbereitung.",
            },
            {
              title: "Dokumente und Abstimmung",
              text:
                "Wir helfen, wichtige Unterlagen, Zuständigkeiten und finanzielle Eckpunkte geordnet vorzubereiten und mit Fachpartnern abzustimmen.",
            },
          ],
        },
        {
          id: "steuerberatung",
          icon: FileText,
          title: "Steuerberatung",
          description:
            "Vorausschauend, gesetzeskonform und optimiert – damit Sie keine Chancen verschenken.",
          color: "from-orange-500 to-orange-600",
          detailTitle: "Steuerberatung mit Fokus auf Planung und Sicherheit",
          detailText:
            "Steuern sollten kein Jahresthema kurz vor Fristablauf sein. Wir begleiten Unternehmen laufend, damit Belastungen planbar bleiben und Optimierungsmöglichkeiten sauber genutzt werden können.",
          detailPoints: [
            {
              title: "Steuerplanung für KMU",
              text:
                "Wir betrachten Gewinne, Investitionen, Lohnbezüge und Dividenden im Zusammenhang, damit die steuerliche Gesamtbelastung nachvollziehbar bleibt.",
            },
            {
              title: "MWST und Deklarationen",
              text:
                "Wir unterstützen bei MWST-Abrechnungen, Steuererklärungen und den Unterlagen, die für eine korrekte Einreichung nötig sind.",
            },
            {
              title: "Begleitung bei Rückfragen",
              text:
                "Wenn Behörden Rückfragen stellen oder eine Veranlagung geprüft werden soll, stehen wir strukturiert und fristgerecht zur Seite.",
            },
          ],
        },
        {
          id: "versicherungen-sozialversicherungen",
          icon: Shield,
          title: "Versicherungen & Sozialversicherungen",
          description:
            "Massgeschneiderte Lösungen für KMU und Privatpersonen – Schutz, Absicherung und gesetzliche Vorsorge, damit Sie und Ihre Mitarbeitenden sicher planen können.",
          color: "from-red-500 to-red-600",
          detailTitle: "Versicherungslösungen, die zum Betrieb passen",
          detailText:
            "Versicherungen und Sozialversicherungen sollten weder überdimensioniert noch lückenhaft sein. Wir helfen, bestehende Lösungen kritisch zu prüfen und passend aufzustellen.",
          detailPoints: [
            {
              title: "Analyse bestehender Policen",
              text:
                "Wir prüfen Deckungen, Überschneidungen und Prämien, damit Ihr Betrieb weder zu viel bezahlt noch unnötige Risiken trägt.",
            },
            {
              title: "Sozialversicherungen für Mitarbeitende",
              text:
                "Von AHV bis BVG begleiten wir die korrekte Anmeldung und die saubere Einbettung in Ihre Lohn- und HR-Prozesse.",
            },
            {
              title: "Praxisnahe Betreuung",
              text:
                "Auch bei Mutationen, Schadenfällen oder Veränderungen im Unternehmen bleiben wir Ansprechpartner und koordinieren die nächsten Schritte.",
            },
          ],
        },
        {
          id: "treuhand-hr-administration",
          icon: Users,
          title: "Treuhand & HR Administration",
          description:
            "Kompetente Betreuung von Personaladministration, Lohnbuchhaltung und Treuhanddienstleistungen – effizient, zuverlässig und massgeschneidert für KMU.",
          color: "from-cyan-500 to-cyan-600",
          detailTitle: "Treuhand und HR Administration aus einer Hand",
          detailText:
            "Gerade für kleinere und mittlere Unternehmen ist eine verlässliche Administration entscheidend. Wir übernehmen laufende Aufgaben strukturiert und entlasten interne Ressourcen.",
          detailPoints: [
            {
              title: "Lohnbuchhaltung und Personaladministration",
              text:
                "Wir kümmern uns um Löhne, Abrechnungen, Eintritte, Austritte und die laufende Abstimmung mit Versicherungen und Behörden.",
            },
            {
              title: "Treuhänderische Begleitung",
              text:
                "Von der laufenden Buchführung bis zum Jahresabschluss erhalten Sie einen festen Ansprechpartner und klare Abläufe.",
            },
            {
              title: "Entlastung im Tagesgeschäft",
              text:
                "Wir bringen Struktur in wiederkehrende Aufgaben, damit Sie sich stärker auf Kundschaft, Team und Wachstum konzentrieren können.",
            },
          ],
        },
      ],
    },
    en: {
      title: "Services",
      subtitle: "Comprehensive solutions for your business",
      description: "Discover our wide range of professional services.",
      detailEyebrow: "More about this service",
      detailCta: "Request a consultation",
      services: [
        {
          id: "business-consulting",
          icon: Briefcase,
          title: "Business Consulting",
          description:
            "Strategic optimization of business processes and corporate management.",
          color: "from-blue-500 to-blue-600",
          detailTitle: "Business consulting focused on practical decision-making",
          detailText:
            "We support Swiss businesses with structure, planning and operational clarity, from setup to the next stage of growth.",
          detailPoints: [
            {
              title: "Company setup",
              text:
                "We help define the legal, financial and administrative foundation required for a clean start.",
            },
            {
              title: "Management support",
              text:
                "We translate goals into clear responsibilities, processes and measurable business priorities.",
            },
            {
              title: "Growth readiness",
              text:
                "When your business expands, we help align internal structure with the new level of complexity.",
            },
          ],
        },
        {
          id: "financial-advice",
          icon: TrendingUp,
          title: "Financial Advice",
          description: "Professional financial planning and asset management.",
          color: "from-green-500 to-green-600",
          detailTitle: "Financial management with real-time visibility",
          detailText:
            "We create reliable accounting foundations so management decisions are based on current numbers rather than assumptions.",
          detailPoints: [
            {
              title: "Digital bookkeeping",
              text:
                "We streamline document handling and routine finance processes for better efficiency and transparency.",
            },
            {
              title: "Reporting",
              text:
                "Clear monthly reporting helps you track margin, liquidity and cost development without added complexity.",
            },
            {
              title: "Budget control",
              text:
                "We set up simple planning and monitoring tools to identify deviations early.",
            },
          ],
        },
        {
          id: "retirement-estate-planning",
          icon: Lock,
          title: "Retirement & Estate Planning",
          description:
            "Forward-looking planning for entrepreneurs, families and succession scenarios.",
          color: "from-purple-500 to-purple-600",
          detailTitle: "Retirement and estate planning with long-term perspective",
          detailText:
            "We help align personal planning, family interests and business continuity before important decisions become urgent.",
          detailPoints: [
            {
              title: "Retirement structure",
              text:
                "We review pillars, pension solutions and available assets to build a coherent financial picture.",
            },
            {
              title: "Succession planning",
              text:
                "Whether within the family or via an external transition, we support the financial preparation process.",
            },
            {
              title: "Coordination",
              text:
                "Important documents, responsibilities and planning assumptions are prepared in a structured way.",
            },
          ],
        },
        {
          id: "tax-consulting",
          icon: FileText,
          title: "Tax Consulting",
          description: "Comprehensive tax planning and tax returns.",
          color: "from-orange-500 to-orange-600",
          detailTitle: "Tax consulting built around planning and compliance",
          detailText:
            "We help businesses stay compliant while improving visibility around tax consequences and planning options.",
          detailPoints: [
            {
              title: "Corporate tax planning",
              text:
                "We look at profit, compensation, dividends and investments in one coordinated view.",
            },
            {
              title: "Returns and VAT",
              text:
                "Tax returns, VAT filings and supporting documentation are prepared clearly and on time.",
            },
            {
              title: "Authority communication",
              text:
                "We support follow-up questions and reviews with structured, timely responses.",
            },
          ],
        },
        {
          id: "insurance-consulting",
          icon: Shield,
          title: "Insurance Consulting",
          description: "Customized insurance solutions and mediation.",
          color: "from-red-500 to-red-600",
          detailTitle: "Insurance structures matched to actual business needs",
          detailText:
            "Insurance should protect your business without adding unnecessary cost or complexity.",
          detailPoints: [
            {
              title: "Policy review",
              text:
                "We check current coverage, overlaps and premium efficiency in a practical business context.",
            },
            {
              title: "Social insurance setup",
              text:
                "We help embed AHV, BVG and related obligations into payroll and HR operations.",
            },
            {
              title: "Ongoing support",
              text:
                "Changes, claims and operational updates are handled with continuity and clear next steps.",
            },
          ],
        },
        {
          id: "fiduciary-administration",
          icon: Users,
          title: "Fiduciary & HR Administration",
          description: "Fiduciary services, payroll and administrative support.",
          color: "from-cyan-500 to-cyan-600",
          detailTitle: "Fiduciary and HR administration from one partner",
          detailText:
            "We take over recurring finance and people administration tasks so your team can stay focused on core operations.",
          detailPoints: [
            {
              title: "Payroll and HR admin",
              text:
                "We manage payroll, onboarding, departures and supporting administrative processes.",
            },
            {
              title: "Fiduciary support",
              text:
                "Bookkeeping, closings and routine financial administration are handled with defined processes and continuity.",
            },
            {
              title: "Operational relief",
              text:
                "Reliable back-office support creates breathing room for leadership and day-to-day execution.",
            },
          ],
        },
      ],
    },
  };

  const t = content[lang as keyof typeof content];
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const selectedService =
    t.services.find((service) => service.id === selectedServiceId) ?? null;

  useEffect(() => {
    setSelectedServiceId(null);
    shouldScrollRef.current = false;
  }, [lang]);

  useEffect(() => {
    if (!shouldScrollRef.current) return;
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    shouldScrollRef.current = false;
  }, [selectedServiceId]);

  const handleServiceSelect = (serviceId: string) => {
    if (serviceId === selectedServiceId) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    shouldScrollRef.current = true;
    setSelectedServiceId(serviceId);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden flex items-center">
          <img
            src={HERO_URL}
            alt={t.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 12%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

          <div className="container relative z-10 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container my-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-lg text-muted-foreground">{t.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((service) => {
              const Icon = service.icon;
              const isActive = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(service.id)}
                  className="group relative overflow-hidden rounded-2xl text-left cursor-pointer"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} transition-opacity ${
                      isActive ? "opacity-20" : "opacity-10 group-hover:opacity-20"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50" />

                  {/* Border animation */}
                  <div
                    className={`absolute inset-0 rounded-2xl border transition-colors ${
                      isActive
                        ? "border-primary/70"
                        : "border-border/50 group-hover:border-primary/50"
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 transition-transform ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3
                      className={`text-xl font-bold mb-3 transition-colors ${
                        isActive ? "text-primary" : "group-hover:text-primary"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-6">
                      {service.description}
                    </p>

                    <span
                      className={`inline-flex items-center gap-2 text-primary font-semibold text-sm transition-all ${
                        isActive
                          ? "opacity-100 gap-3"
                          : "opacity-0 group-hover:opacity-100 group-hover:gap-3"
                      }`}
                    >
                      {lang === "de" ? "Mehr" : "Learn More"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {selectedService ? (
          <section ref={detailsRef} className="container mb-20 scroll-mt-24">
            <div className="rounded-3xl border bg-muted/30 p-8 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t.detailEyebrow}
              </p>
              <div className="mt-4 flex flex-col gap-8 lg:grid lg:grid-cols-[1.1fr_1.3fr]">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {selectedService.detailTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                    {selectedService.detailText}
                  </p>
                  <Button asChild className="mt-6 rounded-xl">
                    <a href="/#/kontakt">
                      {t.detailCta}
                    </a>
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {selectedService.detailPoints.map((point) => (
                    <div key={point.title} className="rounded-2xl bg-background p-6">
                      <h3 className="text-lg font-semibold">{point.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* CTA Section */}
        <section className="container mb-20">
          <div className="text-center py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === "de" ? "Bereit zu beginnen?" : "Ready to begin?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {lang === "de"
                ? "Kontaktieren Sie unser Team für eine unverbindliche Beratung."
                : "Contact our team for a free consultation."}
            </p>
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 px-8"
            >
              <a href="/#/kontakt">
                {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

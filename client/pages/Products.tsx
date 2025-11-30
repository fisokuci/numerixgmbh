import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, TrendingUp, Users, FileText, Shield, Briefcase } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function Products() {
  const { lang } = useLanguage();

  const services = [
    {
      icon: Briefcase,
      titleDe: "Unternehmensberatung",
      titleEn: "Business Consulting",
      descDe: "Strategische Beratung für Unternehmensgründung, -entwicklung und -optimierung. Wir unterstützen Sie bei der Geschäftsmodellentwicklung, Marktanalyse und Wachstumsstrategien.",
      descEn: "Strategic consulting for business formation, development and optimization. We support you with business model development, market analysis and growth strategies."
    },
    {
      icon: TrendingUp,
      titleDe: "Finanzberatung",
      titleEn: "Financial Consulting",
      descDe: "Umfassende Vermögensberatung, Finanzplanung und Investitionsstrategien. Vom Risikomanagement bis zur Vermögensoptimierung – wir finden die richtige Lösung für Ihre finanziellen Ziele.",
      descEn: "Comprehensive wealth management, financial planning and investment strategies. From risk management to asset optimization – we find the right solution for your financial goals."
    },
    {
      icon: FileText,
      titleDe: "Steuerberatung",
      titleEn: "Tax Consulting",
      descDe: "Professionelle Steuerplanung und -optimierung für Privatpersonen und Unternehmen. Wir helfen Ihnen, Steuern legal zu sparen und alle Compliance-Anforderungen zu erfüllen.",
      descEn: "Professional tax planning and optimization for individuals and companies. We help you save taxes legally and meet all compliance requirements."
    },
    {
      icon: Users,
      titleDe: "HR-Administration",
      titleEn: "HR Administration",
      descDe: "Vollständige Personalverwaltung von der Rekrutierung bis zum Personalmanagement. Inklusive Lohnabrechnung, Arbeitgeberversicherungen und HR-Compliance.",
      descEn: "Complete personnel management from recruitment to personnel management. Including payroll, employer insurance and HR compliance."
    },
    {
      icon: Shield,
      titleDe: "Versicherungsberatung & Vermittlung",
      titleEn: "Insurance Consulting & Brokerage",
      descDe: "Maßgeschneiderte Versicherungslösungen für Ihre speziellen Bedürfnisse. Bedarfsanalyse, Vergleich von Versicherungsprodukten und kompetente Beratung bei der Auswahl.",
      descEn: "Tailor-made insurance solutions for your specific needs. Needs analysis, comparison of insurance products and expert advice on selection."
    },
    {
      icon: CheckCircle,
      titleDe: "Treuhand- & Administrative Dienstleistungen",
      titleEn: "Fiduciary & Administrative Services",
      descDe: "Professionelle Treuhandverwaltung, Buchführung und Administrative Services. Wir kümmern uns um Ihre administrativen Aufgaben, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
      descEn: "Professional fiduciary management, bookkeeping and administrative services. We take care of your administrative tasks so you can focus on your core business."
    }
  ];

  const benefits = [
    {
      titleDe: "Umfassendes Angebot",
      titleEn: "Comprehensive Offering",
      descDe: "Alle Services aus einer Hand für maximale Effizienz"
    },
    {
      titleDe: "Expertise",
      titleEn: "Expertise",
      descDe: "Jahrelange Erfahrung und zertifizierte Fachkräfte"
    },
    {
      titleDe: "Verlässlichkeit",
      titleEn: "Reliability",
      descDe: "Diskrete und langfristige Partnerschaft"
    },
    {
      titleDe: "Effizienz",
      titleEn: "Efficiency",
      descDe: "Moderne Prozesse und digitale Lösungen"
    },
    {
      titleDe: "Anpassbarkeit",
      titleEn: "Flexibility",
      descDe: "Lösungen, die auf Ihre Bedürfnisse zugeschnitten sind"
    },
    {
      titleDe: "Support",
      titleEn: "Support",
      descDe: "Kontinuierliche Betreuung und Beratung"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative h-[35svh] min-h-[250px] w-full overflow-hidden">
          <img
            src={HERO_URL}
            alt={lang === "de" ? "Unsere Dienstleistungen" : "Our Services"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {lang === "de" ? "Unsere Dienstleistungen" : "Our Services"}
              </h1>
              <p className="mt-2 text-lg text-white/90 drop-shadow-md">
                {lang === "de" ? "Umfassende Lösungen für Ihre Anforderungen" : "Comprehensive solutions for your needs"}
              </p>
            </div>
          </div>
        </section>

        <section className="container -mt-16 mb-12 rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mt-24 md:p-8">
          <div className="grid gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {lang === "de" ? "Unser Leistungsspektrum" : "Our Service Range"}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {lang === "de"
                  ? "Numerix bietet ein breites Spektrum an professionellen Dienstleistungen für Privat- und Unternehmenskunden. Von der Gründungsberatung bis zur laufenden Verwaltung – wir begleiten Sie auf Ihrem Weg zum Erfolg."
                  : "Numerix offers a wide range of professional services for private and corporate clients. From formation consulting to ongoing management – we support you on your path to success."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <Card key={idx} className="backdrop-blur supports-[backdrop-filter]:bg-background/80 hover:border-sky-400/50 transition-colors">
                    <CardHeader>
                      <div className="flex gap-3 items-start">
                        <Icon className="h-6 w-6 text-sky-400 flex-shrink-0 mt-1" />
                        <CardTitle className="text-lg">
                          {lang === "de" ? service.titleDe : service.titleEn}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {lang === "de" ? service.descDe : service.descEn}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">
                {lang === "de" ? "Warum Numerix?" : "Why Numerix?"}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-sky-400/10 to-blue-400/10 border border-sky-200/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      {lang === "de" ? benefit.titleDe : benefit.titleEn}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {lang === "de" ? benefit.descDe : benefit.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-400/10 to-blue-400/10 border border-sky-200/20 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                {lang === "de" ? "Individuelle Lösungen" : "Tailored Solutions"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "de"
                  ? "Wir verstehen, dass jeder Kunde unterschiedliche Anforderungen hat. Daher entwickeln wir maßgeschneiderte Lösungen, die perfekt zu Ihren Zielen und Ihrem Budget passen. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch."
                  : "We understand that each client has different requirements. That's why we develop tailor-made solutions that perfectly fit your goals and budget. Contact us for a non-binding consultation."}
              </p>
              <a href="/#/kontakt" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors">
                {lang === "de" ? "Jetzt beraten lassen" : "Get Consulting Now"}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

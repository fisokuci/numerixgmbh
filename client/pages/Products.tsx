import { useLanguage } from "@/contexts/LanguageContext";
import { Briefcase, Shield, Users, FileText, TrendingUp, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_URL = "./logo_header.jpeg";

export default function Products() {
  const { lang } = useLanguage();

  const content = {
    de: {
      title: "Dienstleistungen",
      subtitle: "Umfassende Lösungen für Ihr Geschäft",
      description: "Entdecken Sie unser breites Spektrum an professionellen Dienstleistungen.",
      services: [
        {
          icon: Briefcase,
          title: "Unternehmensberatung",
          description: "Strategische Optimierung von Geschäftsprozessen und Unternehmensführung.",
          color: "from-blue-500 to-blue-600",
        },
        {
          icon: TrendingUp,
          title: "Finanzberatung",
          description: "Professionelle Finanzplanung und Vermögensmanagement.",
          color: "from-green-500 to-green-600",
        },
        {
          icon: Users,
          title: "HR-Administration",
          description: "Vollständige HR-Dienstleistungen von Personaladministration bis Lohnabrechnung.",
          color: "from-purple-500 to-purple-600",
        },
        {
          icon: FileText,
          title: "Steuerberatung",
          description: "Umfassende Steuerplanung und Steuererklärungen.",
          color: "from-orange-500 to-orange-600",
        },
        {
          icon: Shield,
          title: "Versicherungsberatung",
          description: "Bedarfsgerechte Versicherungslösungen und Vermittlung.",
          color: "from-red-500 to-red-600",
        },
        {
          icon: Lock,
          title: "Treuhand & Administration",
          description: "Treuhanddienstleistungen und administrative Unterstützung.",
          color: "from-cyan-500 to-cyan-600",
        },
      ],
    },
    en: {
      title: "Services",
      subtitle: "Comprehensive solutions for your business",
      description: "Discover our wide range of professional services.",
      services: [
        {
          icon: Briefcase,
          title: "Business Consulting",
          description: "Strategic optimization of business processes and corporate management.",
          color: "from-blue-500 to-blue-600",
        },
        {
          icon: TrendingUp,
          title: "Financial Advice",
          description: "Professional financial planning and asset management.",
          color: "from-green-500 to-green-600",
        },
        {
          icon: Users,
          title: "HR Administration",
          description: "Complete HR services from personnel administration to payroll.",
          color: "from-purple-500 to-purple-600",
        },
        {
          icon: FileText,
          title: "Tax Consulting",
          description: "Comprehensive tax planning and tax returns.",
          color: "from-orange-500 to-orange-600",
        },
        {
          icon: Shield,
          title: "Insurance Consulting",
          description: "Customized insurance solutions and mediation.",
          color: "from-red-500 to-red-600",
        },
        {
          icon: Lock,
          title: "Fiduciary & Administration",
          description: "Fiduciary services and administrative support.",
          color: "from-cyan-500 to-cyan-600",
        },
      ],
    },
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden flex items-center">
          <img src={HERO_URL} alt={t.title} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 12%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

          <div className="container relative z-10 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container my-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-lg text-muted-foreground">
              {t.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50" />

                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-2xl border border-border/50 group-hover:border-primary/50 transition-colors" />

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground flex-1 mb-6">
                      {service.description}
                    </p>

                    <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all opacity-0 group-hover:opacity-100">
                      {lang === "de" ? "Mehr" : "Learn More"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="container mb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 px-8 md:px-12 py-16 md:py-20">
              <h2 className="text-4xl font-bold mb-4">
                {lang === "de" ? "Warum Numerix?" : "Why Numerix?"}
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
                {lang === "de"
                  ? "Wir kombinieren tiefe Fachkompetenz mit innovativen Lösungen."
                  : "We combine deep expertise with innovative solutions."}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    de: "Umfassende Expertise",
                    en: "Comprehensive Expertise",
                    descDe: "Jahrelange Erfahrung in verschiedenen Branchen.",
                    descEn: "Years of experience across industries.",
                  },
                  {
                    de: "Persönliche Betreuung",
                    en: "Personal Service",
                    descDe: "Dedizierte Ansprechpartner für Ihre Anfragen.",
                    descEn: "Dedicated support for your needs.",
                  },
                  {
                    de: "Innovative Lösungen",
                    en: "Innovative Solutions",
                    descDe: "Moderne Technologien und Best Practices.",
                    descEn: "Modern technologies and best practices.",
                  },
                  {
                    de: "Schweizer Standards",
                    en: "Swiss Standards",
                    descDe: "Höchste Standards für Qualität und Sicherheit.",
                    descEn: "Highest standards for quality and security.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {lang === "de" ? item.de : item.en}
                      </h3>
                      <p className="text-muted-foreground">
                        {lang === "de" ? item.descDe : item.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
            <a href="/#/kontakt">
              <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 px-8">
                {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

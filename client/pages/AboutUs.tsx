import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Zap, Shield, Users } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function AboutUs() {
  const { lang } = useLanguage();

  const content = {
    de: {
      title: "Über uns",
      subtitle: "Vertrauensvolle Partnerschaft seit Jahren",
      description:
        "Numerix GmbH ist Ihr Spezialist für Unternehmens-, Finanz-, HR-, Steuer- und Versicherungsberatung sowie Treuhand- und Administrativdienstleistungen.",
      mission: "Unsere Mission",
      missionText:
        "Wir schaffen nachhaltige Lösungen, die Ihr Geschäft optimieren und Ihr Vermögen schützen.",
      stats: [
        { number: "20+", label: "Jahre Erfahrung" },
        { number: "500+", label: "Zufriedene Kunden" },
        { number: "50+", label: "Experten im Team" },
      ],
      values: [
        {
          icon: Zap,
          title: "Integrität",
          description:
            "Vollständige Transparenz und Ehrlichkeit in allen Geschäftsbeziehungen.",
        },
        {
          icon: Shield,
          title: "Fachkompetenz",
          description:
            "Umfassende Expertise durch kontinuierliche Weiterbildung.",
        },
        {
          icon: Users,
          title: "Verlässlichkeit",
          description:
            "Langfristige Partnerschaften mit persönlicher Betreuung.",
        },
      ],
      cta: "Kontaktieren Sie uns",
    },
    en: {
      title: "About Us",
      subtitle: "Trusted partnership for years",
      description:
        "Numerix GmbH is your specialist in corporate, financial, HR, tax and insurance consulting as well as fiduciary and administrative services.",
      mission: "Our Mission",
      missionText:
        "We create sustainable solutions that optimize your business and protect your assets.",
      stats: [
        { number: "20+", label: "Years Experience" },
        { number: "500+", label: "Satisfied Clients" },
        { number: "50+", label: "Team Experts" },
      ],
      values: [
        {
          icon: Zap,
          title: "Integrity",
          description:
            "Complete transparency and honesty in all business relationships.",
        },
        {
          icon: Shield,
          title: "Expertise",
          description:
            "Comprehensive expertise through continuous professional development.",
        },
        {
          icon: Users,
          title: "Reliability",
          description: "Long-term partnerships with personal attention.",
        },
      ],
      cta: "Contact Us",
    },
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center">
          <img
            src={HERO_URL}
            alt={t.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 12%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />

          <div className="container relative z-10 max-w-2xl">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                {lang === "de" ? "Seit 20+ Jahren" : "Since 20+ Years"}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative -mt-20 container mb-20 z-20">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {t.stats.map((stat, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 md:p-8 hover:border-primary/50 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base text-muted-foreground mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Description */}
        <section className="container mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t.mission}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.missionText}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
              <img
                src={HERO_URL}
                alt="Mission"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 12%" }}
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mb-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {lang === "de" ? "Unsere Werte" : "Our Values"}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background to-background/50 p-8 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-background transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40'
              }
            />
            <div className="relative z-10 px-8 md:px-12 py-12 md:py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {lang === "de" ? "Bereit zu starten?" : "Ready to start?"}
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                {lang === "de"
                  ? "Kontaktieren Sie unser Team für eine unverbindliche Beratung."
                  : "Contact our team for a free consultation."}
              </p>
              <a
                href="/#/kontakt"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-all hover:gap-3"
              >
                {t.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

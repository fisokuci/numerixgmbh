import { useLanguage } from "@/contexts/LanguageContext";

const HERO_URL = "./logo_header.jpeg";
const MISSION_IMAGE_URL = "/tablet_dashboard.jpg";

export default function AboutUs() {
  const { lang } = useLanguage();

  const content = {
    de: {
      title: "Über uns",
      subtitle: "Vertrauensvolle Partnerschaft seit Jahren",
      description: "",
      mission: "Digital & effizient",
      missionText: "Einfachere Abläufe. Weniger Aufwand. Mehr Überblick.",
      missionSubtext:
        "Mit unseren digitalen Lösungen vermeiden Sie Papierberge, sparen wertvolle Zeit und behalten Ihre Finanzen jederzeit im Griff. Prozesse, die früher Stunden dauerten, erledigen wir heute effizient und sicher.",
      stats: [
        { number: "10+", label: "Jahre Erfahrung" },
        { number: "50+", label: "Zufriedene Kunden" },
        { number: "3", label: "Experten im Team" },
      ],
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
              {t.missionSubtext ? (
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  {t.missionSubtext}
                </p>
              ) : null}
              {t.description ? (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              ) : null}
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
              <img
                src={MISSION_IMAGE_URL}
                alt="Mission"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 12%" }}
              />
            </div>
          </div>
        </section>

        {/* CTA Section removed */}
      </main>
    </div>
  );
}

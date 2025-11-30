import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, TrendingUp, Users, FileText, Shield, Briefcase } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function Products() {
  const { lang } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: Briefcase,
      titleDe: "Unternehmensberatung",
      titleEn: "Business Consulting",
      descDe: "Strategische Beratung für Unternehmensgründung, -entwicklung und -optimierung. Wir unterstützen Sie bei der Geschäftsmodellentwicklung, Marktanalyse und Wachstumsstrategien.",
      descEn: "Strategic consulting for business formation, development and optimization. We support you with business model development, market analysis and growth strategies.",
      gradient: "from-blue-500/30 to-cyan-500/20"
    },
    {
      icon: TrendingUp,
      titleDe: "Finanzberatung",
      titleEn: "Financial Consulting",
      descDe: "Umfassende Vermögensberatung, Finanzplanung und Investitionsstrategien. Vom Risikomanagement bis zur Vermögensoptimierung – wir finden die richtige Lösung für Ihre finanziellen Ziele.",
      descEn: "Comprehensive wealth management, financial planning and investment strategies. From risk management to asset optimization – we find the right solution for your financial goals.",
      gradient: "from-purple-500/30 to-pink-500/20"
    },
    {
      icon: FileText,
      titleDe: "Steuerberatung",
      titleEn: "Tax Consulting",
      descDe: "Professionelle Steuerplanung und -optimierung für Privatpersonen und Unternehmen. Wir helfen Ihnen, Steuern legal zu sparen und alle Compliance-Anforderungen zu erfüllen.",
      descEn: "Professional tax planning and optimization for individuals and companies. We help you save taxes legally and meet all compliance requirements.",
      gradient: "from-green-500/30 to-emerald-500/20"
    },
    {
      icon: Users,
      titleDe: "HR-Administration",
      titleEn: "HR Administration",
      descDe: "Vollständige Personalverwaltung von der Rekrutierung bis zum Personalmanagement. Inklusive Lohnabrechnung, Arbeitgeberversicherungen und HR-Compliance.",
      descEn: "Complete personnel management from recruitment to personnel management. Including payroll, employer insurance and HR compliance.",
      gradient: "from-orange-500/30 to-amber-500/20"
    },
    {
      icon: Shield,
      titleDe: "Versicherungsberatung & Vermittlung",
      titleEn: "Insurance Consulting & Brokerage",
      descDe: "Maßgeschneiderte Versicherungslösungen für Ihre speziellen Bedürfnisse. Bedarfsanalyse, Vergleich von Versicherungsprodukten und kompetente Beratung bei der Auswahl.",
      descEn: "Tailor-made insurance solutions for your specific needs. Needs analysis, comparison of insurance products and expert advice on selection.",
      gradient: "from-red-500/30 to-rose-500/20"
    },
    {
      icon: CheckCircle,
      titleDe: "Treuhand- & Administrative Dienstleistungen",
      titleEn: "Fiduciary & Administrative Services",
      descDe: "Professionelle Treuhandverwaltung, Buchführung und Administrative Services. Wir kümmern uns um Ihre administrativen Aufgaben, damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
      descEn: "Professional fiduciary management, bookkeeping and administrative services. We take care of your administrative tasks so you can focus on your core business.",
      gradient: "from-cyan-500/30 to-sky-500/20"
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
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-slate-900/5 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <main className="relative flex flex-col">
        <motion.section
          className="relative h-[40svh] min-h-[300px] w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={HERO_URL}
            alt={lang === "de" ? "Unsere Dienstleistungen" : "Our Services"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center">
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {lang === "de" ? "Unsere Dienstleistungen" : "Our Services"}
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-white/90 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {lang === "de" ? "Umfassende Lösungen für Ihre Anforderungen" : "Comprehensive solutions for your needs"}
              </motion.p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          className="container -mt-16 mb-12 rounded-2xl border border-white/20 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl md:-mt-24 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid gap-12">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Unser Leistungsspektrum" : "Our Service Range"}
              </motion.h2>
              <motion.p
                className="text-muted-foreground leading-relaxed max-w-3xl text-lg"
                variants={itemVariants}
              >
                {lang === "de"
                  ? "Numerix bietet ein breites Spektrum an professionellen Dienstleistungen für Privat- und Unternehmenskunden. Von der Gründungsberatung bis zur laufenden Verwaltung – wir begleiten Sie auf Ihrem Weg zum Erfolg."
                  : "Numerix offers a wide range of professional services for private and corporate clients. From formation consulting to ongoing management – we support you on your path to success."}
              </motion.p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${service.gradient} p-8 backdrop-blur-xl hover:border-white/40 transition-all duration-300 shadow-xl`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="mb-4"
                        >
                          <Icon className="h-10 w-10 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {lang === "de" ? service.titleDe : service.titleEn}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {lang === "de" ? service.descDe : service.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.h3
                className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Warum Numerix?" : "Why Numerix?"}
              </motion.h3>
              <div className="grid gap-4 md:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-white/5 to-transparent p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <h4 className="font-bold text-white mb-2 relative group-hover:text-cyan-300 transition-colors">
                        {lang === "de" ? benefit.titleDe : benefit.titleEn}
                      </h4>
                      <p className="text-sm text-gray-300 relative">
                        {lang === "de" ? benefit.descDe : benefit.descEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent p-8 backdrop-blur-xl shadow-xl"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <motion.h3
                className="text-2xl font-bold mb-3 relative bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {lang === "de" ? "Individuelle Lösungen" : "Tailored Solutions"}
              </motion.h3>
              <p className="text-gray-300 leading-relaxed mb-6 relative">
                {lang === "de"
                  ? "Wir verstehen, dass jeder Kunde unterschiedliche Anforderungen hat. Daher entwickeln wir maßgeschneiderte Lösungen, die perfekt zu Ihren Zielen und Ihrem Budget passen. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch."
                  : "We understand that each client has different requirements. That's why we develop tailor-made solutions that perfectly fit your goals and budget. Contact us for a non-binding consultation."}
              </p>
              <motion.a
                href="/#/kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 h-10 px-6 py-2 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {lang === "de" ? "Jetzt beraten lassen" : "Get Consulting Now"}
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

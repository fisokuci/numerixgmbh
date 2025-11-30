import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Target, Zap, Award } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function AboutUs() {
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

  const values = [
    {
      icon: Target,
      titleDe: "Präzision",
      titleEn: "Precision",
      descDe: "Exakte Beratung und sichere Verwaltung Ihrer Vermögenswerte mit höchster Sorgfalt.",
      descEn: "Precise consulting and secure management of your assets with utmost care."
    },
    {
      icon: Users,
      titleDe: "Vertrauenswürdigkeit",
      titleEn: "Trustworthiness",
      descDe: "Jahrelange Erfahrung und diskrete Partnerschaft für Privat- und Unternehmenskunden.",
      descEn: "Years of experience and discreet partnership for private and corporate clients."
    },
    {
      icon: Zap,
      titleDe: "Innovation",
      titleEn: "Innovation",
      descDe: "Moderne Prozesse und digitale Lösungen für effiziente Verwaltung.",
      descEn: "Modern processes and digital solutions for efficient management."
    },
    {
      icon: Award,
      titleDe: "Exzellenz",
      titleEn: "Excellence",
      descDe: "Kompetente Fachkräfte mit umfassender Branchenkenntnis und Zertifikationen.",
      descEn: "Competent professionals with comprehensive industry knowledge and certifications."
    }
  ];

  const services = [
    {
      titleDe: "Unternehmensberatung",
      titleEn: "Business Consulting",
      descDe: "Strategische Beratung für Wachstum und Optimierung Ihres Unternehmens.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      titleDe: "Finanzberatung",
      titleEn: "Financial Consulting",
      descDe: "Vermögensmanagement und Investitionsstrategien für langfristigen Erfolg.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      titleDe: "HR-Administration",
      titleEn: "HR Administration",
      descDe: "Professionelle Personalverwaltung und Lohnabrechnung nach aktuellen Standards.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      titleDe: "Steuerberatung",
      titleEn: "Tax Consulting",
      descDe: "Optimale Steuerplanung und Compliance für Unternehmen und Privatpersonen.",
      gradient: "from-orange-500/20 to-amber-500/20"
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
            alt={lang === "de" ? "Über uns" : "About us"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 30%" }}
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
                {lang === "de" ? "Über Numerix" : "About Numerix"}
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-white/90 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {lang === "de" ? "Ihre vertrauenswürdigen Partner für Beratung" : "Your trusted partners for consulting"}
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
                {lang === "de" ? "Wer wir sind" : "Who we are"}
              </motion.h2>
              <motion.p
                className="text-muted-foreground leading-relaxed max-w-3xl text-lg"
                variants={itemVariants}
              >
                {lang === "de"
                  ? "Numerix ist ein modernes Beratungsunternehmen mit Leidenschaft für Exzellenz. Seit Jahren unterstützen wir Privat- und Unternehmenskunden mit umfassenden Dienstleistungen in den Bereichen Unternehmensberatung, Finanz-, HR-, Steuer- und Versicherungsberatung sowie Treuhand- und administrativen Dienstleistungen."
                  : "Numerix is a modern consulting company with a passion for excellence. For years, we have supported private and corporate clients with comprehensive services in business consulting, financial, HR, tax and insurance consulting, as well as fiduciary and administrative services."}
              </motion.p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h3
                className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Unsere Werte" : "Our Values"}
              </motion.h3>
              <div className="grid gap-6 md:grid-cols-2">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    >
                      <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className="h-8 w-8 text-cyan-400 flex-shrink-0" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {lang === "de" ? value.titleDe : value.titleEn}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {lang === "de" ? value.descDe : value.descEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h3
                className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Unsere Kernkompetenzen" : "Our Core Competencies"}
              </motion.h3>
              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${service.gradient} p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-xl`}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <h4 className="font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {lang === "de" ? service.titleDe : service.titleEn}
                        </h4>
                        <p className="text-sm text-gray-300">
                          {lang === "de" ? service.descDe : service.descEn}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-transparent p-8 backdrop-blur-xl shadow-xl"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <motion.h3
                className="text-2xl font-bold mb-3 relative bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {lang === "de" ? "Unser Versprechen" : "Our Promise"}
              </motion.h3>
              <p className="text-gray-300 leading-relaxed relative">
                {lang === "de"
                  ? "Wir verpflichten uns, höchste Standards in Beratung, Diskretion und Professionalität zu wahren. Mit uns erhalten Sie einen Partner, der Ihre Ziele versteht und die Expertise hat, diese zu erreichen."
                  : "We are committed to maintaining the highest standards in consulting, discretion, and professionalism. With us, you get a partner who understands your goals and has the expertise to achieve them."}
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

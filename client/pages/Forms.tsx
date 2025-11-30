import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download as DownloadIcon, FileText } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function Forms() {
  const { lang } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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

  const forms = [
    {
      titleDe: "Kundenaufnahmeformular",
      titleEn: "Client Intake Form",
      descDe: "Grundlegende Informationen für die Kundenregistrierung und Profilerstellung",
      descEn: "Basic information for customer registration and profile creation",
      categoryDe: "Allgemein",
      categoryEn: "General"
    },
    {
      titleDe: "Mandatsvertrag",
      titleEn: "Mandate Agreement",
      descDe: "Vertragsvorlage für die Beaufragung von Beratungsdienstleistungen",
      descEn: "Contract template for engaging consulting services",
      categoryDe: "Verträge",
      categoryEn: "Contracts"
    },
    {
      titleDe: "Datenschutzerklärung",
      titleEn: "Privacy Declaration",
      descDe: "Datenschutzmitteilung gemäß geltenden Bestimmungen",
      descEn: "Privacy notification in accordance with applicable regulations",
      categoryDe: "Compliance",
      categoryEn: "Compliance"
    },
    {
      titleDe: "Vollmachtsformular",
      titleEn: "Power of Attorney",
      descDe: "Bevollmächtigungsformular für administrative und finanzielle Aufgaben",
      descEn: "Authorization form for administrative and financial matters",
      categoryDe: "Ermächtigungen",
      categoryEn: "Authorizations"
    },
    {
      titleDe: "Finanzielle Übersicht",
      titleEn: "Financial Overview",
      descDe: "Template zur Erfassung von Vermögenswerten und Verbindlichkeiten",
      descEn: "Template for recording assets and liabilities",
      categoryDe: "Finanz",
      categoryEn: "Finance"
    },
    {
      titleDe: "HR-Fragebogen",
      titleEn: "HR Questionnaire",
      descDe: "Fragebogen für HR-Daten und Personalverwaltung",
      descEn: "Questionnaire for HR data and personnel administration",
      categoryDe: "Personal",
      categoryEn: "Personnel"
    },
    {
      titleDe: "Steuererklärungsformular",
      titleEn: "Tax Declaration Form",
      descDe: "Vorlage für Einkommens- und Vermögensangaben zur Steuererklärung",
      descEn: "Template for income and asset information for tax declaration",
      categoryDe: "Steuern",
      categoryEn: "Taxes"
    },
    {
      titleDe: "Versicherungsanalyse",
      titleEn: "Insurance Analysis",
      descDe: "Fragebogen zur Bedarfsanalyse von Versicherungsschutz",
      descEn: "Questionnaire for insurance coverage needs analysis",
      categoryDe: "Versicherung",
      categoryEn: "Insurance"
    },
    {
      titleDe: "Feedback-Formular",
      titleEn: "Feedback Form",
      descDe: "Formular zur Einholung von Kundenfeedback und Verbesserungsvorschlägen",
      descEn: "Form to gather customer feedback and improvement suggestions",
      categoryDe: "Kundenservice",
      categoryEn: "Customer Service"
    }
  ];

  const categories = [
    { de: "Allgemein", en: "General", count: 1, color: "from-blue-500/30 to-cyan-500/20" },
    { de: "Verträge", en: "Contracts", count: 1, color: "from-purple-500/30 to-pink-500/20" },
    { de: "Compliance", en: "Compliance", count: 1, color: "from-green-500/30 to-emerald-500/20" },
    { de: "Ermächtigungen", en: "Authorizations", count: 1, color: "from-orange-500/30 to-amber-500/20" },
    { de: "Finanz", en: "Finance", count: 1, color: "from-red-500/30 to-rose-500/20" },
    { de: "Personal", en: "Personnel", count: 1, color: "from-cyan-500/30 to-sky-500/20" },
    { de: "Steuern", en: "Taxes", count: 1, color: "from-indigo-500/30 to-violet-500/20" },
    { de: "Versicherung", en: "Insurance", count: 1, color: "from-teal-500/30 to-cyan-500/20" },
    { de: "Kundenservice", en: "Customer Service", count: 1, color: "from-pink-500/30 to-rose-500/20" }
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
            alt={lang === "de" ? "Formulare" : "Forms"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 45%" }}
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
                {lang === "de" ? "Allgemeine Formulare" : "General Forms"}
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-white/90 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {lang === "de" ? "Wichtige Vorlagen für Ihre Verwaltung" : "Important templates for your administration"}
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
                {lang === "de" ? "Dokumentenvorlagen" : "Document Templates"}
              </motion.h2>
              <motion.p
                className="text-muted-foreground leading-relaxed max-w-3xl text-lg"
                variants={itemVariants}
              >
                {lang === "de"
                  ? "Hier finden Sie eine Sammlung wichtiger Formulare und Vorlagen für Ihre administrative und geschäftliche Verwaltung. Diese Dokumente sind speziell für Beratungsdienstleistungen, Treuhand und HR-Administration entwickelt worden."
                  : "Here you will find a collection of important forms and templates for your administrative and business management. These documents have been specifically developed for consulting services, fiduciary and HR administration."}
              </motion.p>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.h3
                className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Nach Kategorie" : "By Category"}
              </motion.h3>
              <div className="grid gap-4 md:grid-cols-3">
                {categories.map((cat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  >
                    <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${cat.color} p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-lg cursor-pointer`}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <p className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {lang === "de" ? cat.de : cat.en}
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          {cat.count} {lang === "de" ? "Formular" : "Form"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <motion.h3
                className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                variants={itemVariants}
              >
                {lang === "de" ? "Alle Formulare" : "All Forms"}
              </motion.h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {forms.map((form, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl hover:border-white/40 transition-all duration-300 shadow-xl flex flex-col h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative p-6 flex-1 flex flex-col">
                        <div className="flex gap-3 items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors leading-snug">
                              {lang === "de" ? form.titleDe : form.titleEn}
                            </h4>
                            <motion.p
                              className="text-xs text-cyan-400 mt-2 font-semibold"
                              initial={{ opacity: 0.7 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {lang === "de" ? form.categoryDe : form.categoryEn}
                            </motion.p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <FileText className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                          </motion.div>
                        </div>
                        <p className="text-sm text-gray-300 mb-6 flex-1">
                          {lang === "de" ? form.descDe : form.descEn}
                        </p>
                      </div>

                      <div className="relative px-6 pb-6 pt-4 border-t border-white/10">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-white/20 text-white hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-white/40 py-2 px-4 text-sm font-medium transition-all duration-300"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          {lang === "de" ? "Herunterladen" : "Download"}
                        </motion.button>
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
                {lang === "de" ? "Nicht finden, was Sie suchen?" : "Can't find what you're looking for?"}
              </motion.h3>
              <p className="text-gray-300 leading-relaxed mb-6 relative">
                {lang === "de"
                  ? "Falls Sie ein bestimmtes Formular oder eine spezifische Vorlage benötigen, kontaktieren Sie unsere Spezialisten. Wir erstellen gerne kundenspezifische Formulare, die auf Ihre Anforderungen zugeschnitten sind."
                  : "If you need a specific form or custom template, please contact our specialists. We are happy to create custom forms tailored to your requirements."}
              </p>
              <motion.a
                href="/#/kontakt"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 h-10 px-6 py-2 text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {lang === "de" ? "Kontakt aufnehmen" : "Get in Touch"}
              </motion.a>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

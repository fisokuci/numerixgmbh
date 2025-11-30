import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Download, FileText, Download as DownloadIcon } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function Forms() {
  const { lang } = useLanguage();

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
    { de: "Allgemein", en: "General", count: 1 },
    { de: "Verträge", en: "Contracts", count: 1 },
    { de: "Compliance", en: "Compliance", count: 1 },
    { de: "Ermächtigungen", en: "Authorizations", count: 1 },
    { de: "Finanz", en: "Finance", count: 1 },
    { de: "Personal", en: "Personnel", count: 1 },
    { de: "Steuern", en: "Taxes", count: 1 },
    { de: "Versicherung", en: "Insurance", count: 1 },
    { de: "Kundenservice", en: "Customer Service", count: 1 }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative h-[35svh] min-h-[250px] w-full overflow-hidden">
          <img
            src={HERO_URL}
            alt={lang === "de" ? "Formulare" : "Forms"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 45%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {lang === "de" ? "Allgemeine Formulare" : "General Forms"}
              </h1>
              <p className="mt-2 text-lg text-white/90 drop-shadow-md">
                {lang === "de" ? "Wichtige Vorlagen für Ihre Verwaltung" : "Important templates for your administration"}
              </p>
            </div>
          </div>
        </section>

        <section className="container -mt-16 mb-12 rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mt-24 md:p-8">
          <div className="grid gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {lang === "de" ? "Dokumentenvorlagen" : "Document Templates"}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {lang === "de"
                  ? "Hier finden Sie eine Sammlung wichtiger Formulare und Vorlagen für Ihre administrative und geschäftliche Verwaltung. Diese Dokumente sind speziell für Beratungsdienstleistungen, Treuhand und HR-Administration entwickelt worden."
                  : "Here you will find a collection of important forms and templates for your administrative and business management. These documents have been specifically developed for consulting services, fiduciary and HR administration."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                {lang === "de" ? "Nach Kategorie" : "By Category"}
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {categories.map((cat, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start h-auto py-3 px-4 text-left hover:border-sky-400 hover:bg-sky-400/5 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lang === "de" ? cat.de : cat.en}</p>
                      <p className="text-xs text-muted-foreground">
                        {cat.count} {lang === "de" ? "Formular" : "Form"}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                {lang === "de" ? "Alle Formulare" : "All Forms"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {forms.map((form, idx) => (
                  <Card key={idx} className="backdrop-blur supports-[backdrop-filter]:bg-background/80 hover:border-sky-400/50 transition-colors flex flex-col">
                    <CardHeader>
                      <div className="flex gap-3 items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {lang === "de" ? form.titleDe : form.titleEn}
                          </CardTitle>
                          <p className="text-xs text-sky-400 mt-2 font-medium">
                            {lang === "de" ? form.categoryDe : form.categoryEn}
                          </p>
                        </div>
                        <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground mb-4">
                        {lang === "de" ? form.descDe : form.descEn}
                      </p>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 hover:bg-sky-400/10 hover:border-sky-400"
                      >
                        <DownloadIcon className="h-4 w-4" />
                        {lang === "de" ? "Herunterladen" : "Download"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-400/10 to-blue-400/10 border border-sky-200/20 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                {lang === "de" ? "Nicht finden, was Sie suchen?" : "Can't find what you're looking for?"}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "de"
                  ? "Falls Sie ein bestimmtes Formular oder eine spezifische Vorlage benötigen, kontaktieren Sie unsere Spezialisten. Wir erstellen gerne kundenspezifische Formulare, die auf Ihre Anforderungen zugeschnitten sind."
                  : "If you need a specific form or custom template, please contact our specialists. We are happy to create custom forms tailored to your requirements."}
              </p>
              <a href="/#/kontakt" className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors">
                {lang === "de" ? "Kontakt aufnehmen" : "Get in Touch"}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useLanguage } from "@/contexts/LanguageContext";
import { Download, FileText, CheckCircle2, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HERO_URL = "./logo_header.jpeg";

export default function Forms() {
  const { lang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const content = {
    de: {
      title: "Formulare",
      subtitle: "Alle notwendigen Dokumentvorlagen",
      description: "Laden Sie die benötigten Formulare herunter und senden Sie sie ausgefüllt an uns zurück.",
      forms: [
        {
          title: "Kundenaufnahmeformular",
          description: "Grundlegende Informationen für die Kundenregistrierung und Profilerstellung.",
          category: "Allgemein",
          color: "bg-blue-500/20 text-blue-700",
        },
        {
          title: "Mandatsvertrag",
          description: "Vertragsvorlage für die Beaufragung von Beratungsdienstleistungen.",
          category: "Verträge",
          color: "bg-purple-500/20 text-purple-700",
        },
        {
          title: "Datenschutzerklärung",
          description: "Datenschutzmitteilung gemäß geltenden Bestimmungen.",
          category: "Compliance",
          color: "bg-green-500/20 text-green-700",
        },
        {
          title: "Vollmachtsformular",
          description: "Bevollmächtigungsformular für administrative und finanzielle Aufgaben.",
          category: "Ermächtigungen",
          color: "bg-orange-500/20 text-orange-700",
        },
        {
          title: "Finanzielle Übersicht",
          description: "Template zur Erfassung von Vermögenswerten und Verbindlichkeiten.",
          category: "Finanz",
          color: "bg-red-500/20 text-red-700",
        },
        {
          title: "HR-Fragebogen",
          description: "Fragebogen für HR-Daten und Personalverwaltung.",
          category: "Personal",
          color: "bg-cyan-500/20 text-cyan-700",
        },
        {
          title: "Steuererklärungsformular",
          description: "Vorlage für Einkommens- und Vermögensangaben zur Steuererklärung.",
          category: "Steuern",
          color: "bg-indigo-500/20 text-indigo-700",
        },
        {
          title: "Versicherungsanalyse",
          description: "Fragebogen zur Bedarfsanalyse von Versicherungsschutz.",
          category: "Versicherung",
          color: "bg-pink-500/20 text-pink-700",
        },
      ],
    },
    en: {
      title: "Forms",
      subtitle: "All necessary document templates",
      description: "Download the required forms and send them back to us completed.",
      forms: [
        {
          title: "Client Intake Form",
          description: "Basic information for customer registration and profile creation.",
          category: "General",
          color: "bg-blue-500/20 text-blue-700",
        },
        {
          title: "Mandate Agreement",
          description: "Contract template for engaging consulting services.",
          category: "Contracts",
          color: "bg-purple-500/20 text-purple-700",
        },
        {
          title: "Privacy Declaration",
          description: "Privacy notification in accordance with applicable regulations.",
          category: "Compliance",
          color: "bg-green-500/20 text-green-700",
        },
        {
          title: "Power of Attorney",
          description: "Authorization form for administrative and financial matters.",
          category: "Authorizations",
          color: "bg-orange-500/20 text-orange-700",
        },
        {
          title: "Financial Overview",
          description: "Template for recording assets and liabilities.",
          category: "Finance",
          color: "bg-red-500/20 text-red-700",
        },
        {
          title: "HR Questionnaire",
          description: "Questionnaire for HR data and personnel administration.",
          category: "Personnel",
          color: "bg-cyan-500/20 text-cyan-700",
        },
        {
          title: "Tax Declaration Form",
          description: "Template for income and asset information for tax declaration.",
          category: "Taxes",
          color: "bg-indigo-500/20 text-indigo-700",
        },
        {
          title: "Insurance Analysis",
          description: "Questionnaire for insurance coverage needs analysis.",
          category: "Insurance",
          color: "bg-pink-500/20 text-pink-700",
        },
      ],
    },
  };

  const t = content[lang as keyof typeof content];

  const filteredForms = t.forms.filter(
    (form) =>
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Search Bar */}
        <section className="container -mt-12 relative z-20 mb-20">
          <div className="relative max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 rounded-2xl blur-xl" />
            <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-background/80 to-background p-4 backdrop-blur-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <Input
                placeholder={lang === "de" ? "Formulare durchsuchen..." : "Search forms..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Forms Grid */}
        <section className="container mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredForms.length > 0 ? (
              filteredForms.map((form, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors mb-2">
                          {form.title}
                        </h3>
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${form.color}`}>
                          {form.category}
                        </span>
                      </div>
                      <FileText className="w-6 h-6 text-primary flex-shrink-0" />
                    </div>

                    <p className="text-sm text-muted-foreground flex-1 mb-6">
                      {form.description}
                    </p>

                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all group/btn"
                      onClick={() => {
                        alert(`${lang === "de" ? "Formular wird heruntergeladen" : "Form downloading"}: ${form.title}`);
                      }}
                    >
                      <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      {lang === "de" ? "Herunterladen" : "Download"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  {lang === "de" ? "Keine Formulare gefunden." : "No forms found."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Steps Section */}
        <section className="container mb-20">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10 px-8 md:px-12 py-16 md:py-20">
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-primary" />
                {lang === "de" ? "So funktioniert es" : "How it works"}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  {
                    num: "01",
                    de: "Formular wählen",
                    en: "Select Form",
                    descDe: "Wählen Sie das benötigte Formular aus.",
                    descEn: "Choose the form you need.",
                  },
                  {
                    num: "02",
                    de: "Herunterladen",
                    en: "Download",
                    descDe: "Laden Sie das Formular herunter.",
                    descEn: "Download the form.",
                  },
                  {
                    num: "03",
                    de: "Ausfüllen",
                    en: "Complete",
                    descDe: "Füllen Sie alle Felder aus.",
                    descEn: "Fill in all fields.",
                  },
                  {
                    num: "04",
                    de: "Einreichen",
                    en: "Submit",
                    descDe: "Senden Sie es uns zu.",
                    descEn: "Send it to us.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Connector line */}
                    {idx < 3 && (
                      <div className="hidden lg:block absolute top-12 left-full w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                    )}

                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group hover:scale-110 transition-transform">
                        <span className="text-white text-3xl font-bold">{step.num}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">
                        {lang === "de" ? step.de : step.en}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === "de" ? step.descDe : step.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="container mb-20">
          <div className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">
              {lang === "de" ? "Benötigen Sie Hilfe?" : "Need help?"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {lang === "de"
                ? "Unsere Experten unterstützen Sie gerne bei Fragen zu den Formularen."
                : "Our experts are here to help with any questions about the forms."}
            </p>
            <a href="/#/kontakt">
              <Button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 px-8 flex items-center gap-2 mx-auto">
                {lang === "de" ? "Kontaktieren Sie uns" : "Contact us"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

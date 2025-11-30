import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Target, Zap, Award } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function AboutUs() {
  const { lang } = useLanguage();

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
      descDe: "Strategische Beratung für Wachstum und Optimierung Ihres Unternehmens."
    },
    {
      titleDe: "Finanzberatung",
      titleEn: "Financial Consulting",
      descDe: "Vermögensmanagement und Investitionsstrategien für langfristigen Erfolg."
    },
    {
      titleDe: "HR-Administration",
      titleEn: "HR Administration",
      descDe: "Professionelle Personalverwaltung und Lohnabrechnung nach aktuellen Standards."
    },
    {
      titleDe: "Steuerberatung",
      titleEn: "Tax Consulting",
      descDe: "Optimale Steuerplanung und Compliance für Unternehmen und Privatpersonen."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative h-[35svh] min-h-[250px] w-full overflow-hidden">
          <img
            src={HERO_URL}
            alt={lang === "de" ? "Über uns" : "About us"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {lang === "de" ? "Über Numerix" : "About Numerix"}
              </h1>
              <p className="mt-2 text-lg text-white/90 drop-shadow-md">
                {lang === "de" ? "Ihre vertrauenswürdigen Partner für Beratung" : "Your trusted partners for consulting"}
              </p>
            </div>
          </div>
        </section>

        <section className="container -mt-16 mb-12 rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mt-24 md:p-8">
          <div className="grid gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                {lang === "de" ? "Wer wir sind" : "Who we are"}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {lang === "de"
                  ? "Numerix ist ein modernes Beratungsunternehmen mit Leidenschaft für Exzellenz. Seit Jahren unterstützen wir Privat- und Unternehmenskunden mit umfassenden Dienstleistungen in den Bereichen Unternehmensberatung, Finanz-, HR-, Steuer- und Versicherungsberatung sowie Treuhand- und administrativen Dienstleistungen."
                  : "Numerix is a modern consulting company with a passion for excellence. For years, we have supported private and corporate clients with comprehensive services in business consulting, financial, HR, tax and insurance consulting, as well as fiduciary and administrative services."}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">
                {lang === "de" ? "Unsere Werte" : "Our Values"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <Card key={idx} className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Icon className="h-8 w-8 text-sky-400 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold mb-2">
                              {lang === "de" ? value.titleDe : value.titleEn}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {lang === "de" ? value.descDe : value.descEn}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">
                {lang === "de" ? "Unsere Kernkompetenzen" : "Our Core Competencies"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service, idx) => (
                  <Card key={idx} className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {lang === "de" ? service.titleDe : service.titleEn}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {lang === "de" ? service.descDe : service.descEn}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-sky-400/10 to-blue-400/10 border border-sky-200/20 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                {lang === "de" ? "Unser Versprechen" : "Our Promise"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "de"
                  ? "Wir verpflichten uns, höchste Standards in Beratung, Diskretion und Professionalität zu wahren. Mit uns erhalten Sie einen Partner, der Ihre Ziele versteht und die Expertise hat, diese zu erreichen."
                  : "We are committed to maintaining the highest standards in consulting, discretion, and professionalism. With us, you get a partner who understands your goals and has the expertise to achieve them."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

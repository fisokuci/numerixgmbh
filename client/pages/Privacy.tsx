import CookieSettingsButton from "@/components/CookieSettingsButton";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Database, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

type PrivacySection = {
  title: string;
  body: string[];
};

export default function Privacy() {
  const { lang } = useLanguage();

  const content: Record<
    "de" | "en",
    {
      title: string;
      subtitle: string;
      intro: string;
      updated: string;
      cards: Array<{ title: string; body: string; icon: typeof Database }>;
      sections: PrivacySection[];
      note: string;
      contactLabel: string;
      contactText: string;
      cookieText: string;
      contactButton: string;
    }
  > = {
    de: {
      title: "Datenschutzerklärung",
      subtitle: "Transparent, nachvollziehbar und auf das Wesentliche fokussiert.",
      intro:
        "Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten Numerix GmbH bei der Nutzung dieser Website verarbeitet, zu welchen Zwecken dies geschieht und welche Wahlmöglichkeiten Ihnen zur Verfügung stehen.",
      updated: "Stand: 3. März 2026",
      cards: [
        {
          title: "Verantwortlich",
          body: "Numerix GmbH, Bahnhofstrasse 16, 4133 Pratteln, Schweiz, info@numerixgmbh.ch, +41 79 833 37 33",
          icon: ShieldCheck,
        },
        {
          title: "Eingesetzte Dienste",
          body: "Kontaktformular, technisch notwendige Website-Bereitstellung, Cookiebot für Einwilligungen und Umami für Statistik nach Zustimmung.",
          icon: Database,
        },
        {
          title: "Ihre Kontrolle",
          body: "Sie können Ihre Cookie-Einstellungen jederzeit erneut öffnen und bereits erteilte Einwilligungen für Statistik anpassen.",
          icon: LockKeyhole,
        },
      ],
      sections: [
        {
          title: "1. Verantwortliche Stelle",
          body: [
            "Verantwortlich für die Bearbeitung personenbezogener Daten auf dieser Website ist Numerix GmbH, Bahnhofstrasse 16, 4133 Pratteln, Schweiz.",
            "Für Datenschutzanliegen können Sie uns unter info@numerixgmbh.ch oder telefonisch unter +41 79 833 37 33 kontaktieren.",
          ],
        },
        {
          title: "2. Welche Daten wir bearbeiten",
          body: [
            "Beim Besuch der Website können technisch notwendige Verbindungsdaten verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seiten, Browser- und Geräteinformationen sowie Referrer-Informationen.",
            "Wenn Sie das Kontaktformular verwenden, bearbeiten wir die von Ihnen angegebenen Angaben wie Name, Vorname, E-Mail-Adresse, Nachricht und weitere freiwillige Informationen, damit wir Ihre Anfrage beantworten können.",
          ],
        },
        {
          title: "3. Zwecke der Bearbeitung",
          body: [
            "Wir bearbeiten personenbezogene Daten, um die Website sicher und stabil bereitzustellen, Anfragen zu beantworten, die Kommunikation mit Interessenten zu ermöglichen sowie unsere Inhalte und Prozesse technisch zu verbessern.",
            "Soweit Statistikdienste eingesetzt werden, erfolgt dies erst nach Ihrer entsprechenden Einwilligung über Cookiebot.",
          ],
        },
        {
          title: "4. Cookies, Consent Management und Cookiebot",
          body: [
            "Diese Website verwendet Cookiebot by Usercentrics als Consent-Management-Plattform. Cookiebot speichert Ihre Auswahl zu Cookie-Kategorien, damit Ihre Entscheidung dokumentiert und bei weiteren Seitenaufrufen berücksichtigt werden kann.",
            "Die Cookie-Einstellungen können jederzeit über den Button 'Cookie-Einstellungen' erneut geöffnet werden. Rechtsgrundlage beziehungsweise Grundlage der Bearbeitung ist Ihre Einwilligung für nicht notwendige Cookies und ähnliche Technologien.",
          ],
        },
        {
          title: "5. Statistik mit Umami",
          body: [
            "Wir nutzen Umami Analytics, um die Nutzung unserer Website in aggregierter Form besser zu verstehen. Das Statistik-Skript wird auf dieser Website erst geladen, wenn Sie Statistik-Cookies beziehungsweise Statistikverarbeitung zugestimmt haben.",
            "Zusätzlich ist die Umami-Integration mit 'Do Not Track' konfiguriert. Ohne Ihre Einwilligung findet über diese Einbindung keine Statistikverarbeitung statt.",
          ],
        },
        {
          title: "6. Weitergabe an Dienstleister",
          body: [
            "Wir können personenbezogene Daten an technische Dienstleister weitergeben, soweit dies für Hosting, Consent-Management, E-Mail-Kommunikation oder den sicheren Betrieb der Website erforderlich ist.",
            "Soweit Dienstleister Daten außerhalb der Schweiz bearbeiten, erfolgt dies nur im Rahmen der anwendbaren datenschutzrechtlichen Vorgaben, etwa auf Basis von Angemessenheitsentscheidungen oder vertraglichen Garantien.",
          ],
        },
        {
          title: "7. Aufbewahrung",
          body: [
            "Wir bewahren personenbezogene Daten nur so lange auf, wie dies für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
            "Kontaktanfragen werden in der Regel nur so lange gespeichert, wie dies zur Bearbeitung und für eine angemessene Nachverfolgung erforderlich ist.",
          ],
        },
        {
          title: "8. Ihre Rechte",
          body: [
            "Sie können im Rahmen des anwendbaren Datenschutzrechts Auskunft über Ihre gespeicherten Daten verlangen sowie Berichtigung, Löschung, Einschränkung der Bearbeitung oder Herausgabe der Daten beantragen.",
            "Bereits erteilte Einwilligungen können Sie mit Wirkung für die Zukunft widerrufen. Zudem können Sie sich an die zuständige Datenschutzaufsicht wenden, insbesondere in der Schweiz an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten.",
          ],
        },
        {
          title: "9. Änderungen",
          body: [
            "Wir können diese Datenschutzerklärung anpassen, wenn sich unsere Website, eingesetzte Dienste oder die rechtlichen Anforderungen ändern.",
            "Es gilt die jeweils auf dieser Seite veröffentlichte Fassung.",
          ],
        },
      ],
      note:
        "Diese Fassung ist auf die aktuell auf der Website sichtbaren Dienste abgestimmt. Für eine vollständig rechtlich geprüfte Endfassung sollten insbesondere die vollständige Geschäftsadresse und allfällige zusätzliche Drittanbieter ergänzt werden.",
      contactLabel: "Fragen zum Datenschutz?",
      contactText:
        "Wenn Sie eine Auskunftsanfrage stellen oder Daten berichtigen lassen möchten, schreiben Sie uns direkt.",
      cookieText:
        "Ihre Consent-Auswahl können Sie jederzeit erneut öffnen und anpassen.",
      contactButton: "Kontakt aufnehmen",
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Transparent, practical and focused on the services used on this website.",
      intro:
        "This privacy policy explains which personal data Numerix GmbH processes when you use this website, for which purposes that happens and which choices you have.",
      updated: "Last updated: March 3, 2026",
      cards: [
        {
          title: "Controller",
          body: "Numerix GmbH, Bahnhofstrasse 16, 4133 Pratteln, Switzerland, info@numerixgmbh.ch, +41 79 833 37 33",
          icon: ShieldCheck,
        },
        {
          title: "Services used",
          body: "Contact form, technically necessary website delivery, Cookiebot for consent management and Umami for analytics after consent.",
          icon: Database,
        },
        {
          title: "Your control",
          body: "You can reopen your cookie settings at any time and change a previously given analytics consent.",
          icon: LockKeyhole,
        },
      ],
      sections: [
        {
          title: "1. Controller",
          body: [
            "The controller for processing personal data on this website is Numerix GmbH, Bahnhofstrasse 16, 4133 Pratteln, Switzerland.",
            "For privacy-related requests you can contact us at info@numerixgmbh.ch or by phone at +41 79 833 37 33.",
          ],
        },
        {
          title: "2. Which data we process",
          body: [
            "When you visit the website, technically necessary connection data may be processed, including IP address, date and time of access, requested pages, browser and device information and referrer data.",
            "If you use the contact form, we process the information you provide, such as last name, first name, email address, message and any additional voluntary information, so we can answer your request.",
          ],
        },
        {
          title: "3. Purposes of processing",
          body: [
            "We process personal data to provide the website securely and reliably, answer inquiries, communicate with prospects and improve our content and processes from a technical and operational perspective.",
            "Where analytics services are used, this happens only after your consent via Cookiebot.",
          ],
        },
        {
          title: "4. Cookies, consent management and Cookiebot",
          body: [
            "This website uses Cookiebot by Usercentrics as its consent management platform. Cookiebot stores your cookie category choices so your decision can be documented and respected on future page views.",
            "You can reopen your cookie settings at any time using the 'Cookie settings' button. The basis for non-essential cookies and similar technologies is your consent.",
          ],
        },
        {
          title: "5. Analytics with Umami",
          body: [
            "We use Umami Analytics to understand website usage in aggregated form. On this website the analytics script is loaded only if you consent to statistics processing.",
            "The Umami integration is additionally configured with 'Do Not Track'. Without your consent, no analytics processing happens through this integration.",
          ],
        },
        {
          title: "6. Disclosure to service providers",
          body: [
            "We may share personal data with technical service providers where this is necessary for hosting, consent management, email communication or secure operation of the website.",
            "If providers process data outside Switzerland, this happens only in line with applicable data protection requirements, for example on the basis of adequacy decisions or contractual safeguards.",
          ],
        },
        {
          title: "7. Retention",
          body: [
            "We retain personal data only as long as necessary for the stated purposes or as required by law.",
            "Contact inquiries are generally stored only as long as needed for handling the inquiry and a reasonable follow-up period.",
          ],
        },
        {
          title: "8. Your rights",
          body: [
            "Under applicable data protection law, you may request information about your stored personal data and ask for rectification, deletion, restriction of processing or delivery of your data.",
            "You can withdraw consent with effect for the future. You may also contact the competent supervisory authority, in Switzerland in particular the Federal Data Protection and Information Commissioner.",
          ],
        },
        {
          title: "9. Changes",
          body: [
            "We may update this privacy policy if our website, the services used or legal requirements change.",
            "The version published on this page applies.",
          ],
        },
      ],
      note:
        "This version is tailored to the services currently visible on the website. For a fully lawyer-reviewed final version, the full business address and any additional third-party providers should still be added if relevant.",
      contactLabel: "Questions about privacy?",
      contactText:
        "If you want to make an access request or ask for a correction, contact us directly.",
      cookieText: "You can reopen and change your consent choices at any time.",
      contactButton: "Contact us",
    },
  };

  const t = content[lang];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <main className="flex flex-col">
        <section className="relative overflow-hidden">
          <img
            src={HERO_URL}
            alt={t.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 14%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/60" />
          <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
          <div className="container relative py-20 md:py-24">
            <div className="max-w-3xl space-y-5">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Numerix GmbH
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl">
                {t.subtitle}
              </p>
              <p className="max-w-2xl text-muted-foreground">{t.intro}</p>
              <div className="flex flex-wrap gap-3">
                <CookieSettingsButton className="rounded-xl border-primary/30 bg-background/80 hover:bg-primary/10" />
                <Button asChild variant="ghost" className="rounded-xl">
                  <a href="/#/kontakt">{t.contactButton}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="container -mt-10 relative z-10 pb-16">
          <div className="grid gap-5 md:grid-cols-3">
            {t.cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-3xl border border-primary/15 bg-background/95 p-6 shadow-sm backdrop-blur"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="container pb-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              {t.sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-3xl border bg-muted/20 p-7 md:p-8"
                >
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border bg-primary/10 p-7">
                <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                  {t.updated}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{t.contactLabel}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {t.contactText}
                </p>
                <div className="mt-5 space-y-3 text-sm text-foreground/85">
                  <a
                    href="mailto:info@numerixgmbh.ch"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    info@numerixgmbh.ch
                  </a>
                  <p>Numerix GmbH, Pratteln, Schweiz</p>
                  <p>+41 79 833 37 33</p>
                </div>
                <Button asChild className="mt-6 rounded-xl">
                  <a href="/#/kontakt">{t.contactButton}</a>
                </Button>
              </div>

              <div className="rounded-3xl border bg-background p-7">
                <h2 className="text-xl font-semibold">
                  {lang === "de" ? "Cookie-Auswahl verwalten" : "Manage cookie choices"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {t.cookieText}
                </p>
                <CookieSettingsButton className="mt-5 w-full rounded-xl border-primary/30 hover:bg-primary/10" />
              </div>

              <div className="rounded-3xl border bg-muted/20 p-7">
                <h2 className="text-xl font-semibold">
                  {lang === "de" ? "Hinweis" : "Note"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                  {t.note}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

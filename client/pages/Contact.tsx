import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import type { ContactRequest, ContactResponse } from "@shared/api";

const HERO_URL = "./logo_header.jpeg";

export default function Contact() {
  const { lang } = useLanguage();
  const [form, setForm] = useState<ContactRequest>({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const content = {
    de: {
      title: "Kontakt",
      subtitle: "Wir freuen uns auf Ihre Nachricht",
      description:
        "Haben Sie Fragen? Unser Team antwortet Ihnen schnellstmöglich.",
      contactInfo: "Kontaktinformationen",
      address: "Adresse",
      addressValue: "Numerix GmbH\nPratteln, Schweiz",
      phone: "Telefon",
      phoneValue: "+41 79 833 37 33",
      email: "E-Mail",
      emailValue: "info@numerixgmbh.ch",
      hours: "Öffnungszeiten",
      hoursValue: "Mo-Fr: 08:00 - 18:00",
      formTitle: "Nachricht senden",
      name: "Name",
      surname: "Vorname",
      addressLabel: "E-Mail",
      message: "Nachricht",
      messagePlaceholder: "Ihre Nachricht...",
      submit: "Abschicken",
      sending: "Senden...",
    },
    en: {
      title: "Contact",
      subtitle: "We look forward to hearing from you",
      description:
        "Have questions? Our team will get back to you as soon as possible.",
      contactInfo: "Contact Information",
      address: "Address",
      addressValue: "Numerix GmbH\nZurich, Switzerland",
      phone: "Phone",
      phoneValue: "+41 44 XXX XX XX",
      email: "Email",
      emailValue: "info@numerixgmbh.ch",
      hours: "Business Hours",
      hoursValue: "Mon-Fri: 08:00 - 18:00",
      formTitle: "Send us a message",
      name: "Last name",
      surname: "First name",
      addressLabel: "Email",
      message: "Message",
      messagePlaceholder: "Your message...",
      submit: "Submit",
      sending: "Sending...",
    },
  };

  const t = content[lang as keyof typeof content];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.surname || !form.email) {
      toast({
        title: lang === "de" ? "Fehlende Angaben" : "Missing information",
      });
      return;
    }

    try {
      setLoading(true);
      const apiBaseUrl =
        (import.meta.env.VITE_API_BASE_URL as string | undefined)
          ?.replace(/\/$/, "") ?? "";
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "/api/contact";

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
          message: form.message,
        }),
      });
      const contentType = res.headers.get("content-type") ?? "";
      let data: ContactResponse | null = null;
      if (contentType.includes("application/json")) {
        data = (await res.json()) as ContactResponse;
      } else {
        const fallbackMessage =
          lang === "de"
            ? "Server hat keine gültige Antwort geliefert."
            : "Server returned an invalid response.";
        throw new Error(fallbackMessage);
      }
      if (!res.ok || !data.ok) {
        throw new Error(
          data.message ||
            (lang === "de"
              ? "Nachricht konnte nicht gesendet werden."
              : "Message could not be sent."),
        );
      }

      toast({
        title: lang === "de" ? "Danke!" : "Thank you!",
        description: data.message,
      });
      setForm({ name: "", surname: "", email: "", message: "" });
    } catch (err: any) {
      toast({
        title: lang === "de" ? "Fehler" : "Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    { icon: MapPin, label: t.address, value: t.addressValue },
    { icon: Phone, label: t.phone, value: t.phoneValue, href: "tel:+41" },
    {
      icon: Mail,
      label: t.email,
      value: t.emailValue,
      href: "mailto:info@numerixgmbh.ch",
    },
    { icon: Clock, label: t.hours, value: t.hoursValue },
  ];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[45vh] min-h-[350px] w-full overflow-hidden flex items-center">
          <img
            src={HERO_URL}
            alt={t.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 12%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />

          <div className="container relative z-10 max-w-2xl">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="container my-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.contactInfo}</h2>
                <p className="text-muted-foreground">{t.description}</p>
              </div>

              <div className="grid gap-4">
                {contacts.map((contact, idx) => {
                  const Icon = contact.icon;
                  const content = (
                    <div
                      className="group relative rounded-2xl border border-border/50 bg-gradient-to-br from-background to-background/50 p-6 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 transition-all"
                      key={idx}
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-muted-foreground">
                            {contact.label}
                          </p>
                          <p
                            className={`text-foreground font-medium whitespace-pre-line ${contact.href ? "hover:text-primary transition-colors" : ""}`}
                          >
                            {contact.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                  return contact.href ? (
                    <a href={contact.href} key={idx}>
                      {content}
                    </a>
                  ) : (
                    content
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-background/80 to-background p-8 md:p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6">{t.formTitle}</h3>

                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        {t.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="rounded-xl border-border/50 bg-background/50 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname" className="text-sm font-medium">
                        {t.surname}
                      </Label>
                      <Input
                        id="surname"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        className="rounded-xl border-border/50 bg-background/50 focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t.addressLabel}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="rounded-xl border-border/50 bg-background/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      {t.message}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      rows={4}
                      className="rounded-xl border-border/50 bg-background/50 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? t.sending : t.submit}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import type { ContactRequest, ContactResponse } from "@shared/api";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const HERO_URL = "./logo_header.jpeg";

export default function Contact() {
  const { lang } = useLanguage();
  const [form, setForm] = useState<ContactRequest & { email?: string; phone?: string; message?: string }>({
    name: "",
    surname: "",
    address: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.surname || !form.address) {
      toast({
        title: lang === "de" ? "Fehlende Angaben" : "Missing information",
        description: lang === "de" ? "Bitte alle erforderlichen Felder ausfüllen." : "Please fill in all required fields."
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          address: form.address
        })
      });
      const data = (await res.json()) as ContactResponse;
      if (!res.ok || !data.ok) throw new Error(data.message || "Submission failed");

      toast({
        title: lang === "de" ? "Danke!" : "Thank you!",
        description: data.message
      });
      setForm({
        name: "",
        surname: "",
        address: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (err: any) {
      toast({
        title: lang === "de" ? "Etwas ist schief gelaufen" : "Something went wrong",
        description: err.message ?? (lang === "de" ? "Bitte erneut versuchen." : "Please try again.")
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      titleDe: "Adresse",
      titleEn: "Address",
      contentDe: "Zürich, Switzerland",
      contentEn: "Zurich, Switzerland"
    },
    {
      icon: Phone,
      titleDe: "Telefon",
      titleEn: "Phone",
      contentDe: "+41 (0) 44 123 4567",
      contentEn: "+41 (0) 44 123 4567"
    },
    {
      icon: Mail,
      titleDe: "Email",
      titleEn: "Email",
      contentDe: "info@numerix.ch",
      contentEn: "info@numerix.ch"
    },
    {
      icon: Clock,
      titleDe: "Öffnungszeiten",
      titleEn: "Hours",
      contentDe: "Mo-Fr 08:00 - 17:00",
      contentEn: "Mon-Fri 08:00 - 17:00"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative h-[35svh] min-h-[250px] w-full overflow-hidden">
          <img
            src={HERO_URL}
            alt={lang === "de" ? "Kontakt" : "Contact"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {lang === "de" ? "Kontaktieren Sie uns" : "Get in Touch"}
              </h1>
              <p className="mt-2 text-lg text-white/90 drop-shadow-md">
                {lang === "de" ? "Wir freuen uns auf Ihre Anfrage" : "We look forward to your inquiry"}
              </p>
            </div>
          </div>
        </section>

        <section className="container -mt-16 mb-12 rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mt-24 md:p-8">
          <div className="grid gap-8">
            <div className="grid gap-4 md:grid-cols-2">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <Card key={idx} className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Icon className="h-6 w-6 text-sky-400 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-sm">
                            {lang === "de" ? info.titleDe : info.titleEn}
                          </h4>
                          <p className="text-muted-foreground text-sm mt-1">
                            {lang === "de" ? info.contentDe : info.contentEn}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <CardHeader>
                <CardTitle>{lang === "de" ? "Nachricht senden" : "Send a Message"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-1">
                      <Label htmlFor="name">{lang === "de" ? "Name" : "Last Name"}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={lang === "de" ? "Schweizer" : "Doe"}
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="surname">{lang === "de" ? "Vorname" : "First Name"}</Label>
                      <Input
                        id="surname"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        placeholder={lang === "de" ? "Anna" : "Jane"}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="grid gap-1">
                      <Label htmlFor="address">{lang === "de" ? "Email" : "Email"}</Label>
                      <Input
                        id="address"
                        name="address"
                        type="email"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="max@email.ch"
                        required
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label htmlFor="phone">{lang === "de" ? "Telefon" : "Phone"}</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+41 44 123 4567"
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="message">{lang === "de" ? "Nachricht" : "Message"}</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={lang === "de" ? "Ihre Nachricht..." : "Your message..."}
                      className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto">
                      {loading
                        ? lang === "de"
                          ? "Senden..."
                          : "Sending..."
                        : lang === "de"
                          ? "Abschicken"
                          : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-sky-400/10 to-blue-400/10 border border-sky-200/20 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-3">
                {lang === "de" ? "Schnelle Antwort" : "Quick Response"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {lang === "de"
                  ? "Wir werden Ihre Anfrage schnellstmöglich bearbeiten. In der Regel erhalten Sie innerhalb von 24 Stunden eine Rückmeldung von unserem Team."
                  : "We will process your inquiry as quickly as possible. You will typically receive a response from our team within 24 hours."}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

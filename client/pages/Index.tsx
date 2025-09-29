import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { ContactRequest, ContactResponse } from "@shared/api";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_URL = "./logo_header.jpeg";

export default function Index() {
  const { lang } = useLanguage();
  const [form, setForm] = useState<ContactRequest>({ name: "", surname: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.surname || !form.address) {
      toast({ title: lang === "de" ? "Fehlende Angaben" : "Missing information", description: lang === "de" ? "Bitte alle Felder ausfüllen." : "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as ContactResponse;
      if (!res.ok || !data.ok) throw new Error(data.message || "Submission failed");

      toast({ title: lang === "de" ? "Danke!" : "Thank you!", description: data.message });
      setForm({ name: "", surname: "", address: "" });
    } catch (err: any) {
      toast({ title: lang === "de" ? "Etwas ist schief gelaufen" : "Something went wrong", description: err.message ?? (lang === "de" ? "Bitte erneut versuchen." : "Please try again.") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <main className="flex flex-col">
        <section className="relative h-[42svh] min-h-[300px] w-full overflow-hidden">
          <img src={HERO_URL} alt={lang === "de" ? "Alpenlandschaft" : "Alpine landscape"} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 12%" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background/90" />
        </section>

            <section className="container -mt-16 mb-12 rounded-xl border bg-background/90 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 md:-mt-24 md:p-8">
              <div className="mb-6 text-left">
                <p className="mt-2 text-muted-foreground md:text-lg">
                  {lang === "de" ? (
                    <>
                      <span className="text-sky-400">Willkommen bei Numerix.</span>
                      <br />
                      Experten in Treuhand, Versicherung, Vorsorge und HR-Administration
                    </>
                  ) : (
                    <>
                      Welcome to Numerix.
                      <br />
                      Experts in fiduciary services, insurance, and HR administration
                    </>
                  )}
                </p>
              </div>

          <p className="mb-6 max-w-3xl text-balance text-muted-foreground md:text-base">
            {lang === "de" ? "Eine allgemeine Info: Unsere Website befindet sich derzeit im Aufbau, gerne können Sie uns über unser Kontaktformular kontaktieren." : "General info: Our website is currently under construction. Feel free to contact us via the form below."}
          </p>

          <Card className="w-full max-w-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <CardHeader>
              <CardTitle>{lang === "de" ? "Kontaktieren Sie uns" : "Contact us"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-1">
                    <Label htmlFor="name">{lang === "de" ? "Name" : "Last name"}</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder={lang === "de" ? "Schweizer" : "Doe"} required />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="surname">{lang === "de" ? "Vorname" : "First name"}</Label>
                    <Input id="surname" name="surname" value={form.surname} onChange={handleChange} placeholder={lang === "de" ? "Anna" : "Jane"} required />
                  </div>
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="address">{lang === "de" ? "Adresse" : "Address"}</Label>
                  <Input id="address" name="address" value={form.address} onChange={handleChange} placeholder={lang === "de" ? "Musterstrasse 1, Zürich" : "123 Main St, City"} required />
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? (lang === "de" ? "Senden..." : "Sending...") : lang === "de" ? "Abschicken" : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

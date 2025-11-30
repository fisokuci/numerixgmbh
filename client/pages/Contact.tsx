import { useState } from "react";
import { motion } from "framer-motion";
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
      contentEn: "Zurich, Switzerland",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Phone,
      titleDe: "Telefon",
      titleEn: "Phone",
      contentDe: "+41 (0) 44 123 4567",
      contentEn: "+41 (0) 44 123 4567",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Mail,
      titleDe: "Email",
      titleEn: "Email",
      contentDe: "info@numerix.ch",
      contentEn: "info@numerix.ch",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: Clock,
      titleDe: "Öffnungszeiten",
      titleEn: "Hours",
      contentDe: "Mo-Fr 08:00 - 17:00",
      contentEn: "Mon-Fri 08:00 - 17:00",
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
            alt={lang === "de" ? "Kontakt" : "Contact"}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "50% 40%" }}
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
                {lang === "de" ? "Kontaktieren Sie uns" : "Get in Touch"}
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-white/90 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {lang === "de" ? "Wir freuen uns auf Ihre Anfrage" : "We look forward to your inquiry"}
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
              <div className="grid gap-4 md:grid-cols-2">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      whileHover={{ y: -4, transition: { duration: 0.3 } }}
                    >
                      <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${info.gradient} p-6 backdrop-blur-xl hover:border-white/30 transition-all duration-300 shadow-xl`}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex gap-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-white text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                              {lang === "de" ? info.titleDe : info.titleEn}
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {lang === "de" ? info.contentDe : info.contentEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-xl shadow-xl"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 hover:opacity-50 transition-opacity duration-300" />
              <motion.h3
                className="text-2xl font-bold mb-6 relative bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {lang === "de" ? "Nachricht senden" : "Send a Message"}
              </motion.h3>
              <form onSubmit={handleSubmit} className="grid gap-6 relative">
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <Label htmlFor="name" className="text-white">{lang === "de" ? "Name" : "Last Name"}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={lang === "de" ? "Schweizer" : "Doe"}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
                    <Label htmlFor="surname" className="text-white">{lang === "de" ? "Vorname" : "First Name"}</Label>
                    <Input
                      id="surname"
                      name="surname"
                      value={form.surname}
                      onChange={handleChange}
                      placeholder={lang === "de" ? "Anna" : "Jane"}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/20 transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <Label htmlFor="address" className="text-white">{lang === "de" ? "Email" : "Email"}</Label>
                    <Input
                      id="address"
                      name="address"
                      type="email"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="max@email.ch"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/20 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                    <Label htmlFor="phone" className="text-white">{lang === "de" ? "Telefon" : "Phone"}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+41 44 123 4567"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/20 transition-all duration-300"
                    />
                  </motion.div>
                </div>
                <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  <Label htmlFor="message" className="text-white">{lang === "de" ? "Nachricht" : "Message"}</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={lang === "de" ? "Ihre Nachricht..." : "Your message..."}
                    className="min-h-32 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-cyan-400/50 focus:bg-white/20 focus:outline-none transition-all duration-300 resize-none"
                  />
                </motion.div>
                <motion.div className="pt-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-8 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading
                      ? lang === "de"
                        ? "Senden..."
                        : "Sending..."
                      : lang === "de"
                        ? "Abschicken"
                        : "Submit"}
                  </motion.button>
                </motion.div>
              </form>
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
                {lang === "de" ? "Schnelle Antwort" : "Quick Response"}
              </motion.h3>
              <p className="text-gray-300 leading-relaxed relative">
                {lang === "de"
                  ? "Wir werden Ihre Anfrage schnellstmöglich bearbeiten. In der Regel erhalten Sie innerhalb von 24 Stunden eine Rückmeldung von unserem Team."
                  : "We will process your inquiry as quickly as possible. You will typically receive a response from our team within 24 hours."}
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

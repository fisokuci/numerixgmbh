import { useState } from "react";
import type { ReactNode } from "react";
import type { ContactCustomerType, ContactResponse } from "@shared/api";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Building2, Check, FileText, Landmark, Mail, Phone, Shield, Sparkles, UserRound, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type WizardStep = 1 | 2 | 3;

type ServiceOption = {
  value: string;
  label: {
    de: string;
    en: string;
  };
  description: {
    de: string;
    en: string;
  };
  icon: typeof Landmark;
};

const privateServices: ServiceOption[] = [
  {
    value: "steuern",
    label: { de: "Steuern", en: "Taxes" },
    description: {
      de: "Steuererklärung, Optimierung und Fristen im Griff.",
      en: "Tax returns, optimisation and deadline support.",
    },
    icon: Landmark,
  },
  {
    value: "versicherungen",
    label: { de: "Versicherungen", en: "Insurance" },
    description: {
      de: "Absicherung prüfen, ordnen und passend aufsetzen.",
      en: "Review, structure and optimise your insurance setup.",
    },
    icon: Shield,
  },
  {
    value: "vorsorge",
    label: { de: "Vorsorge", en: "Retirement planning" },
    description: {
      de: "Pensions- und Vorsorgethemen verständlich geplant.",
      en: "Clear guidance for pension and long-term planning.",
    },
    icon: Wallet,
  },
  {
    value: "allgemeine-administration",
    label: { de: "Allgemeine Administration", en: "General administration" },
    description: {
      de: "Unterstützung bei Formularen, Korrespondenz und Abläufen.",
      en: "Support with forms, correspondence and admin tasks.",
    },
    icon: FileText,
  },
];

const businessServices: ServiceOption[] = [
  {
    value: "treuhand",
    label: { de: "Treuhand", en: "Fiduciary services" },
    description: {
      de: "Finanzen, Abschlüsse und laufende Betreuung aus einer Hand.",
      en: "Accounting, closings and ongoing fiduciary support.",
    },
    icon: BriefcaseBusiness,
  },
  {
    value: "steuern-unternehmen",
    label: { de: "Steuern Unternehmen", en: "Corporate taxes" },
    description: {
      de: "Steuerplanung und Unternehmenssteuern sauber umgesetzt.",
      en: "Corporate tax planning and compliant execution.",
    },
    icon: Landmark,
  },
  {
    value: "versicherungen",
    label: { de: "Versicherungen", en: "Insurance" },
    description: {
      de: "Passende Versicherungsstruktur für Ihr Unternehmen.",
      en: "Insurance structures aligned to your business.",
    },
    icon: Shield,
  },
  {
    value: "allgemeine-administration",
    label: { de: "Allgemeine Administration", en: "General administration" },
    description: {
      de: "Entlastung bei Backoffice, Dokumenten und Prozessen.",
      en: "Relief for back office, documents and processes.",
    },
    icon: FileText,
  },
  {
    value: "rundumbetreuung",
    label: { de: "Rundumbetreuung", en: "Full-service support" },
    description: {
      de: "Ganzheitliche Begleitung für Finanzen und Administration.",
      en: "Holistic support across finance and administration.",
    },
    icon: Sparkles,
  },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  remarks: "",
};

export function InquiryWizard({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<WizardStep>(1);
  const [customerType, setCustomerType] = useState<ContactCustomerType | "">("");
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const content = {
    de: {
      steps: ["Auswahl", "Anliegen", "Kontakt"],
      chooseType: "Sind Sie Privatperson oder Unternehmen?",
      privateTitle: "Privatperson",
      privateText: "Persönliche Unterstützung bei Steuern, Vorsorge und Administration.",
      businessTitle: "Unternehmen",
      businessText: "Begleitung für Treuhand, Steuern und laufende Unternehmensprozesse.",
      serviceTitle: "Was können wir für Sie tun?",
      contactTitle: "Wie dürfen wir Sie kontaktieren?",
      fullName: "Voller Name",
      fullNamePlaceholder: "Max Muster",
      email: "E-Mail",
      emailPlaceholder: "max@beispiel.ch",
      phone: "Telefonnummer",
      phonePlaceholder: "+41 79 123 45 67",
      remarks: "Bemerkungen",
      remarksPlaceholder:
        "Teilen Sie uns kurz mit, worum es geht oder was wir vorbereiten sollen.",
      selectedType: "Kategorie",
      selectedService: "Anliegen",
      back: "Zurück",
      next: "Weiter",
      submit: "Anfrage senden",
      sending: "Wird gesendet...",
      successTitle: "Anfrage gesendet",
      successText: "Vielen Dank. Wir melden uns schnellstmöglich bei Ihnen.",
      errorTitle: "Fehler",
      missingTitle: "Fehlende Angaben",
      missingText: "Bitte füllen Sie Ihren Namen und Ihre E-Mail aus.",
      missingServices: "Bitte wählen Sie mindestens ein Anliegen aus.",
    },
    en: {
      steps: ["Selection", "Service", "Contact"],
      chooseType: "Are you a private person or a business?",
      privateTitle: "Private person",
      privateText: "Personal support for taxes, retirement planning and administration.",
      businessTitle: "Business",
      businessText: "Support for fiduciary work, taxes and ongoing business operations.",
      serviceTitle: "What can we help you with?",
      contactTitle: "How can we reach you?",
      fullName: "Full name",
      fullNamePlaceholder: "Max Example",
      email: "Email",
      emailPlaceholder: "max@example.com",
      phone: "Phone number",
      phonePlaceholder: "+41 79 123 45 67",
      remarks: "Notes",
      remarksPlaceholder: "Add context, questions or anything we should prepare.",
      selectedType: "Category",
      selectedService: "Request",
      back: "Back",
      next: "Next",
      submit: "Submit request",
      sending: "Sending...",
      successTitle: "Request sent",
      successText: "Thank you. We will get back to you as soon as possible.",
      errorTitle: "Error",
      missingTitle: "Missing information",
      missingText: "Please provide your full name and email.",
      missingServices: "Please select at least one request.",
    },
  };

  const t = content[lang as keyof typeof content];

  const serviceOptions =
    customerType === "private"
      ? privateServices
      : customerType === "business"
        ? businessServices
        : [];

  const selectedServices = serviceOptions.filter((option) =>
    services.includes(option.value),
  );
  const selectedTypeLabel =
    customerType === "private"
      ? t.privateTitle
      : customerType === "business"
        ? t.businessTitle
        : "";

  const resetWizard = () => {
    setStep(1);
    setCustomerType("");
    setServices([]);
    setForm(initialForm);
    setLoading(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !loading) {
      resetWizard();
    }

    setOpen(nextOpen);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
    }
  };

  const toggleService = (value: string) => {
    setServices((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleStepTwoNext = () => {
    if (!services.length) {
      toast({
        title: t.missingTitle,
        description: t.missingServices,
      });
      return;
    }

    setStep(3);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !customerType || !services.length) {
      toast({
        title: t.missingTitle,
        description: t.missingText,
      });
      return;
    }

    try {
      setLoading(true);

      const apiBaseUrl =
        (import.meta.env.VITE_API_BASE_URL as string | undefined)
          ?.replace(/\/$/, "") ?? "";
      const apiUrl = apiBaseUrl ? `${apiBaseUrl}/api/contact` : "/api/contact";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          remarks: form.remarks,
          customerType,
          service: selectedServices
            .map((item) => item.label[lang as "de" | "en"])
            .join(", "),
          source: "landing-wizard",
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          lang === "de"
            ? "Server hat keine gültige Antwort geliefert."
            : "Server returned an invalid response.",
        );
      }

      const data = (await response.json()) as ContactResponse;
      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ||
            (lang === "de"
              ? "Anfrage konnte nicht gesendet werden."
              : "Request could not be sent."),
        );
      }

      toast({
        title: t.successTitle,
        description: t.successText,
      });
      setOpen(false);
      resetWizard();
    } catch (error) {
      const description =
        error instanceof Error ? error.message : t.errorTitle;

      toast({
        title: t.errorTitle,
        description,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden border-slate-800 bg-slate-950 p-0 text-slate-50">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.22),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.2),_transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative flex max-h-[92vh] flex-col overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            <DialogHeader className="space-y-4 text-left">
              <div className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:justify-center">
                {t.steps.map((label, index) => {
                  const itemStep = (index + 1) as WizardStep;
                  const isActive = step === itemStep;
                  const isComplete = step > itemStep;

                  return (
                    <div
                      key={label}
                      className={cn(
                        "grid min-h-[88px] w-full justify-items-center grid-cols-1 items-center gap-3 rounded-[1.5rem] border px-4 py-3 text-center md:min-h-[96px] md:w-[220px] lg:w-[250px]",
                        isComplete && "border-teal-300/30 bg-teal-300/10",
                        isActive &&
                          "border-sky-300/40 bg-slate-900/80 shadow-[0_0_40px_rgba(103,232,249,0.14)]",
                        !isActive &&
                          !isComplete &&
                          "border-slate-800 bg-slate-950/50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base font-semibold",
                          isComplete &&
                            "border-teal-300 bg-teal-300 text-slate-950",
                          isActive &&
                            "border-sky-300 bg-gradient-to-br from-teal-300 via-sky-300 to-fuchsia-400 text-slate-950 shadow-[0_0_40px_rgba(103,232,249,0.35)]",
                          !isActive &&
                            !isComplete &&
                            "border-slate-700 bg-slate-900 text-slate-300",
                        )}
                      >
                        {isComplete ? <Check className="h-5 w-5" /> : itemStep}
                      </div>
                      <div className="min-w-0 text-center">
                        <p className="text-xl font-medium leading-none text-slate-100">
                          {label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </DialogHeader>

            <div className="mt-8 flex-1">
              {step === 1 ? (
                <section className="space-y-6">
                  <div>
                    <DialogTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {t.chooseType}
                    </DialogTitle>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        value: "private" as const,
                        title: t.privateTitle,
                        description: t.privateText,
                        icon: UserRound,
                      },
                      {
                        value: "business" as const,
                        title: t.businessTitle,
                        description: t.businessText,
                        icon: Building2,
                      },
                    ].map((option) => {
                      const Icon = option.icon;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setCustomerType(option.value);
                            setServices([]);
                            setStep(2);
                          }}
                          className="group rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6 text-left transition duration-200 hover:border-teal-300/60 hover:bg-slate-900"
                        >
                          <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-teal-300 ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-teal-300/10">
                            <Icon className="h-7 w-7" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <h3 className="text-2xl font-semibold text-white">
                                {option.title}
                              </h3>
                              <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-teal-300" />
                            </div>
                            <p className="text-base leading-7 text-slate-300">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section className="mx-auto max-w-4xl space-y-4">
                  <div>
                    <DialogTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {t.serviceTitle}
                    </DialogTitle>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {serviceOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = services.includes(option.value);

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleService(option.value)}
                          className={cn(
                            "group relative flex min-h-[138px] w-full flex-col items-start gap-3 rounded-[1.5rem] border bg-slate-950/70 px-4 py-4 text-left transition duration-200",
                            isSelected
                              ? "border-teal-300/70 bg-teal-300/10 shadow-[0_0_0_1px_rgba(94,234,212,0.15)]"
                              : "border-slate-800 hover:border-sky-300/40 hover:bg-slate-900",
                          )}
                        >
                          <div
                            className={cn(
                              "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                              isSelected
                                ? "border-teal-300 bg-teal-300 text-slate-950"
                                : "border-slate-700 bg-slate-900 text-slate-500",
                            )}
                          >
                            {isSelected ? <Check className="h-4 w-4" /> : null}
                          </div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-teal-300 ring-1 ring-white/10">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-lg font-semibold text-white">
                              {option.label[lang as "de" | "en"]}
                            </p>
                            <p className="mt-1 text-sm leading-5 text-slate-300">
                              {option.description[lang as "de" | "en"]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="sticky bottom-0 z-10 -mx-2 flex flex-col-reverse gap-3 border-t border-slate-800 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-2 pb-1 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      className="justify-start rounded-full px-0 text-slate-300 hover:bg-transparent hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t.back}
                    </Button>

                    <Button
                      type="button"
                      onClick={handleStepTwoNext}
                      className="h-12 rounded-full bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-400 px-6 text-base font-semibold text-slate-950 hover:opacity-90"
                    >
                      {t.next}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </section>
              ) : null}

              {step === 3 ? (
                <section className="mx-auto max-w-4xl space-y-5">
                  <div>
                    <DialogTitle className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {t.contactTitle}
                    </DialogTitle>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedTypeLabel ? (
                      <div className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-200">
                        <span className="text-slate-400">{t.selectedType}:</span>{" "}
                        {selectedTypeLabel}
                      </div>
                    ) : null}
                    {selectedServices.map((item) => (
                      <div
                        key={item.value}
                        className="rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-teal-100"
                      >
                        {item.label[lang as "de" | "en"]}
                      </div>
                    ))}
                  </div>

                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">
                          {t.fullName}
                        </span>
                        <Input
                          value={form.fullName}
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              fullName: event.target.value,
                            }))
                          }
                          placeholder={t.fullNamePlaceholder}
                          className="h-12 rounded-2xl border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500"
                          required
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">
                          {t.email}
                        </span>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                          <Input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                email: event.target.value,
                              }))
                            }
                            placeholder={t.emailPlaceholder}
                            className="h-12 rounded-2xl border-slate-700 bg-slate-950/80 pl-11 text-white placeholder:text-slate-500"
                            required
                          />
                        </div>
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-200">
                          {t.phone}
                        </span>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                          <Input
                            value={form.phone}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                phone: event.target.value,
                              }))
                            }
                            placeholder={t.phonePlaceholder}
                            className="h-12 rounded-2xl border-slate-700 bg-slate-950/80 pl-11 text-white placeholder:text-slate-500"
                          />
                        </div>
                      </label>
                    </div>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-slate-200">
                        {t.remarks}
                      </span>
                      <Textarea
                        value={form.remarks}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            remarks: event.target.value,
                          }))
                        }
                        placeholder={t.remarksPlaceholder}
                        rows={4}
                        className="min-h-[112px] rounded-[1.5rem] border-slate-700 bg-slate-950/80 text-white placeholder:text-slate-500"
                      />
                    </label>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBack}
                        className="justify-start rounded-full px-0 text-slate-300 hover:bg-transparent hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        {t.back}
                      </Button>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 rounded-full bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-400 px-6 text-base font-semibold text-slate-950 hover:opacity-90"
                      >
                        {loading ? t.sending : t.submit}
                        {!loading ? <ArrowRight className="h-4 w-4" /> : null}
                      </Button>
                    </div>
                  </form>
                </section>
              ) : null}
            </div>

            {step === 1 ? (
              <div className="mt-8 border-t border-slate-800 pt-5">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="rounded-full px-0 text-slate-300 hover:bg-transparent hover:text-white disabled:text-slate-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.back}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { FormEvent, useEffect, useState } from "react";
import {
  clearAdminToken,
  fetchAdminSession,
  getAdminToken,
  loginAdmin,
  logoutAdmin,
  setAdminToken,
} from "@/lib/admin";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminUmamiConfig } from "@shared/api";

type AuthState = "checking" | "guest" | "authenticated";

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function Admin() {
  const { lang } = useLanguage();
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [umami, setUmami] = useState<AdminUmamiConfig | undefined>(undefined);
  const [iframeBlocked, setIframeBlocked] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setAuthState("guest");
      return;
    }

    let isCancelled = false;
    (async () => {
      try {
        const { data } = await fetchAdminSession(token);
        if (isCancelled) return;

        if (!data.authenticated) {
          clearAdminToken();
          setAuthState("guest");
          return;
        }

        setAuthState("authenticated");
        setExpiresAt(data.expiresAt ?? "");
        setUmami(data.umami);
      } catch {
        if (isCancelled) return;
        clearAdminToken();
        setAuthState("guest");
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const { response, data } = await loginAdmin({ username, password });
      if (!response.ok || !data.ok || !data.token) {
        throw new Error(
          data.message ||
            (lang === "de" ? "Login fehlgeschlagen." : "Login failed."),
        );
      }

      setAdminToken(data.token);
      setAuthState("authenticated");
      setPassword("");
      setExpiresAt(data.expiresAt ?? "");
      setUmami(data.umami);

      toast({
        title:
          lang === "de" ? "Admin Login erfolgreich" : "Admin login successful",
      });
    } catch (error: any) {
      toast({
        title: lang === "de" ? "Login fehlgeschlagen" : "Login failed",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    const token = getAdminToken();
    if (token) {
      try {
        await logoutAdmin(token);
      } catch {
        // Ignore logout request errors and clear local state anyway.
      }
    }

    clearAdminToken();
    setAuthState("guest");
    setPassword("");
    setExpiresAt("");
    setUmami(undefined);
  };

  const hasShareUrl = Boolean(umami?.shareUrl);
  const hasDashboardUrl = Boolean(umami?.dashboardUrl);

  return (
    <div className="relative min-h-screen bg-background">
      <main className="container py-10 space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            {lang === "de" ? "Admin Panel" : "Admin Panel"}
          </h1>
          <p className="text-muted-foreground">
            {lang === "de"
              ? "Verwalte Zugriff und überprüfe deine Umami Analytics."
              : "Manage access and review your Umami analytics."}
          </p>
        </section>

        {authState === "checking" ? (
          <Card>
            <CardContent className="py-8">
              {lang === "de"
                ? "Session wird geprüft..."
                : "Checking session..."}
            </CardContent>
          </Card>
        ) : null}

        {authState === "guest" ? (
          <Card className="max-w-xl">
            <CardHeader>
              <CardTitle>
                {lang === "de" ? "Admin Login" : "Admin login"}
              </CardTitle>
              <CardDescription>
                {lang === "de"
                  ? "Melde dich mit deinen Admin-Zugangsdaten an."
                  : "Sign in with your admin credentials."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Username</Label>
                  <Input
                    id="admin-username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button disabled={submitting} type="submit">
                  {submitting
                    ? lang === "de"
                      ? "Anmelden..."
                      : "Signing in..."
                    : lang === "de"
                      ? "Anmelden"
                      : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : null}

        {authState === "authenticated" ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  {lang === "de" ? "Zugriff aktiv" : "Access active"}
                </CardTitle>
                <CardDescription>
                  {lang === "de"
                    ? "Admin Session ist gültig."
                    : "Admin session is valid."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {lang === "de" ? "Gültig bis:" : "Valid until:"}{" "}
                  {formatDateTime(expiresAt)}
                </p>
                <Button variant="outline" onClick={handleLogout}>
                  {lang === "de" ? "Abmelden" : "Sign out"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Umami Analytics</CardTitle>
                <CardDescription>
                  {lang === "de"
                    ? "Tracking ist aktiv, sobald Website-ID und Script URL gesetzt sind."
                    : "Tracking is active when Website ID and script URL are configured."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  {lang === "de" ? "Status:" : "Status:"}{" "}
                  <span className="font-medium text-foreground">
                    {umami?.configured
                      ? lang === "de"
                        ? "Konfiguriert"
                        : "Configured"
                      : lang === "de"
                        ? "Nicht konfiguriert"
                        : "Not configured"}
                  </span>
                </p>
                <p>
                  {lang === "de" ? "Website ID:" : "Website ID:"}{" "}
                  <span className="font-medium text-foreground">
                    {umami?.websiteId || "-"}
                  </span>
                </p>
                <p>
                  {lang === "de" ? "Script URL:" : "Script URL:"}{" "}
                  <span className="font-medium text-foreground">
                    {umami?.scriptUrl || "-"}
                  </span>
                </p>

                {hasDashboardUrl ? (
                  <Button asChild variant="secondary">
                    <a
                      href={umami?.dashboardUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {lang === "de"
                        ? "Umami Dashboard öffnen"
                        : "Open Umami dashboard"}
                    </a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>

            {hasShareUrl ? (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === "de"
                      ? "Analytics im Panel"
                      : "Analytics in panel"}
                  </CardTitle>
                  <CardDescription>
                    {lang === "de"
                      ? "Diese Ansicht basiert auf einer Umami Share URL."
                      : "This view is rendered from an Umami share URL."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Button asChild variant="secondary">
                      <a href={umami?.shareUrl} target="_blank" rel="noreferrer">
                        {lang === "de"
                          ? "Share URL in neuem Tab öffnen"
                          : "Open share URL in new tab"}
                      </a>
                    </Button>
                  </div>
                  {iframeBlocked ? (
                    <p className="mb-4 text-sm text-muted-foreground">
                      {lang === "de"
                        ? "Einige Browser-Erweiterungen oder Sicherheitseinstellungen blockieren die Einbettung. Bitte öffne die Share URL im neuen Tab."
                        : "Some browser extensions or security settings block embedding. Please open the share URL in a new tab."}
                    </p>
                  ) : null}
                  <iframe
                    title="Umami analytics"
                    src={umami?.shareUrl}
                    className="w-full h-[760px] rounded-md border"
                    onError={() => setIframeBlocked(true)}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {lang === "de" ? "Share URL fehlt" : "Missing share URL"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {lang === "de"
                    ? "Setze VITE_UMAMI_SHARE_URL, wenn du Analytics direkt im Admin-Panel einbetten möchtest."
                    : "Set VITE_UMAMI_SHARE_URL if you want to embed analytics directly in the admin panel."}
                </CardContent>
              </Card>
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}

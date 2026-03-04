import { FormEvent, useEffect, useState } from "react";
import {
  changeAdminPassword,
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
import { getFrontendUmamiConfig } from "@/lib/umami";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const umami = getFrontendUmamiConfig();

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
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setExpiresAt("");
  };

  const handlePasswordChange = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword.trim().length < 8) {
      toast({
        title:
          lang === "de" ? "Passwort zu kurz" : "Password too short",
        description:
          lang === "de"
            ? "Das neue Passwort muss mindestens 8 Zeichen lang sein."
            : "The new password must be at least 8 characters long.",
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast({
        title:
          lang === "de"
            ? "Passwörter stimmen nicht überein"
            : "Passwords do not match",
      });
      return;
    }

    const token = getAdminToken();
    if (!token) {
      setAuthState("guest");
      return;
    }

    setSubmitting(true);
    try {
      const { response, data } = await changeAdminPassword(token, {
        currentPassword,
        newPassword,
      });
      if (!response.ok || !data.ok) {
        throw new Error(
          data.message ||
            (lang === "de"
              ? "Passwort konnte nicht geändert werden."
              : "Password could not be updated."),
        );
      }

      clearAdminToken();
      setAuthState("guest");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setExpiresAt("");

      toast({
        title:
          lang === "de"
            ? "Passwort wurde geändert"
            : "Password updated",
        description:
          lang === "de"
            ? "Bitte melde dich mit dem neuen Passwort erneut an."
            : "Please sign in again with the new password.",
      });
    } catch (error: any) {
      toast({
        title:
          lang === "de"
            ? "Passwortwechsel fehlgeschlagen"
            : "Password change failed",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const hasShareUrl = Boolean(umami.shareUrl);
  const hasDashboardUrl = Boolean(umami.dashboardUrl);

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

            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>
                  {lang === "de"
                    ? "Admin Passwort ändern"
                    : "Change admin password"}
                </CardTitle>
                <CardDescription>
                  {lang === "de"
                    ? "Das neue Passwort wird serverseitig gespeichert. Danach musst du dich erneut anmelden."
                    : "The new password is stored server-side. You will need to sign in again afterwards."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handlePasswordChange}>
                  <div className="space-y-2">
                    <Label htmlFor="admin-current-password">
                      {lang === "de"
                        ? "Aktuelles Passwort"
                        : "Current password"}
                    </Label>
                    <Input
                      id="admin-current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-new-password">
                      {lang === "de" ? "Neues Passwort" : "New password"}
                    </Label>
                    <Input
                      id="admin-new-password"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-confirm-password">
                      {lang === "de"
                        ? "Neues Passwort bestätigen"
                        : "Confirm new password"}
                    </Label>
                    <Input
                      id="admin-confirm-password"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(event) =>
                        setConfirmNewPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                  <Button disabled={submitting} type="submit">
                    {submitting
                      ? lang === "de"
                        ? "Speichere..."
                        : "Saving..."
                      : lang === "de"
                        ? "Passwort ändern"
                        : "Change password"}
                  </Button>
                </form>
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
                    {umami.configured
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
                    {umami.websiteId || "-"}
                  </span>
                </p>
                <p>
                  {lang === "de" ? "Script URL:" : "Script URL:"}{" "}
                  <span className="font-medium text-foreground">
                    {umami.scriptUrl || "-"}
                  </span>
                </p>

                {hasDashboardUrl ? (
                  <Button asChild variant="secondary">
                    <a
                      href={umami.dashboardUrl}
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
                      <a
                        href={umami.shareUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
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
                    src={umami.shareUrl}
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

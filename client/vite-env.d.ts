/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COOKIEBOT_ENABLED?: string;
  readonly VITE_COOKIEBOT_CBID?: string;
  readonly VITE_COOKIEBOT_CULTURE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface CookiebotConsentState {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  method: string | null;
}

interface CookiebotInstance {
  consent: CookiebotConsentState;
  renew: () => void;
  runScripts: () => void;
}

interface Window {
  Cookiebot?: CookiebotInstance;
}

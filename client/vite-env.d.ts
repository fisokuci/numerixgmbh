/// <reference types="vite/client" />

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

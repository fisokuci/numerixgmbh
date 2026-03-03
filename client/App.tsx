import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Forms from "./pages/Forms";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Admin from "./pages/Admin";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import Privacy from "./pages/Privacy";
import SiteFooter from "@/components/SiteFooter";
import CookiebotBanner from "@/components/CookiebotBanner";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookiebotBanner />
        <UmamiAnalytics />
        <Toaster />
        <Sonner />
        <HashRouter>
          <LanguageProvider>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dienstleistungen" element={<Products />} />
              <Route path="/uber-uns" element={<AboutUs />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/formulare" element={<Forms />} />
              <Route path="/datenschutz" element={<Privacy />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <SiteFooter />
          </LanguageProvider>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

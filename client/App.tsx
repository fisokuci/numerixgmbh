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
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <LanguageProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dienstleistungen" element={<Products />} />
              <Route path="/uber-uns" element={<AboutUs />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/formulare" element={<Forms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

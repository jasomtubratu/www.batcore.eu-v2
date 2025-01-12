"use client";

import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "@/locales/en";
import { cs } from "@/locales/cs";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cs: { translation: cs }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force a re-render when the language changes
    const handleLanguageChange = () => {
      document.documentElement.lang = i18n.language;
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
}
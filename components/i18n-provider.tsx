"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "@/locales/en";
import { cs } from "@/locales/cs";
import { sk } from "@/locales/sk";
import { LoadingScreen } from "@/components/loading";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cs: { translation: cs },
      sk: { translation: sk }
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }
  });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLanguageChange = () => {
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = i18n.dir(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    handleLanguageChange();

    // Ak toto dám preč tak sa loading screen zasekne
    setTimeout(() => setIsLoading(false), 1000);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
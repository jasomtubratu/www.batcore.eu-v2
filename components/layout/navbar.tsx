"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, X } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "cs", label: "Čeština" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            BatCore.eu
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <LanguageSelector />
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden p-4 border-t border-border">
          <div className="flex flex-col space-y-4">
            <NavLinks />
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  const { t } = useTranslation();
  
  return (
    <>
      <Link href="/minecraft" className="hover:text-primary">
        {t("nav.minecraft")}
      </Link>
      <Link href="/knowledge-base" className="hover:text-primary">
        {t("nav.knowledgeBase")}
      </Link>
      <Link href="/client" className="hover:text-primary">
        {t("nav.clientZone")}
      </Link>
      <Button variant="outline" asChild>
        <Link href="https://discord.gg/batcore">
          {t("nav.discord")}
        </Link>
      </Button>
    </>
  );
}

function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <Select value={i18n.language} onValueChange={(value) => i18n.changeLanguage(value)}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
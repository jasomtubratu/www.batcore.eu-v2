"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "cs", label: "Čeština" },
  { code: "sk", label: "Slovenčina" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/favicon.ico" alt="BatCore.eu" width={32} height={32}/>
              <span className="text-xl font-bold hidden lg:flex">BatCore.eu</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
            <NavLinksLeft  />
            </div>  
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinksRight />
            <div className="hidden lg:flex">
            <LanguageSelector />
            </div>
          </div>

          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden p-4 border-t border-border">
          <div className="flex flex-col space-y-4">
            <NavLinksLeft />
            <NavLinksRight />
            <LanguageSelector />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinksLeft() {
  const { t } = useTranslation();
  return (
    <>
      <Link href="/minecraft" className="hover:text-primary">
        {t("nav.minecraft")}
      </Link>
      <Link href="/vps" className="hover:text-primary">
        {t("nav.vps")}
      </Link>
      <Link href="/credits" className="hover:text-primary">
        {t("nav.credits")}
      </Link>
    </>
  );
}

function NavLinksRight() {
  const { t } = useTranslation();
  return (
    <>
      <Link href="https://wiki.batcore.eu" className="hover:text-primary">
        {t("nav.wiki")}
      </Link>
      <Link href="https://client.batcore.eu" className="hover:text-primary md:bg-blue-500/20 md:px-4 md:py-2 md:rounded-md">
        {t("nav.clientZone")}
      </Link>
    </>
  );
}

function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = LANGUAGES.some(lang => lang.code === i18n.language) ? i18n.language : "en";
  return (
    <Select value={currentLanguage} onValueChange={(value) => i18n.changeLanguage(value)}>
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

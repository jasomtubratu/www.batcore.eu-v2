"use client";

import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 mb-6 relative">
            {t("minecraft.title")}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("minecraft.subtitle")}
        </p>
        <p className="text-muted-foreground  mx-auto mt-4">
        Our Minecraft servers offer high performance and are suitable for a wide range of uses. With high performance and unlimited possibilities, they are the perfect solution for everyone who wants to play Minecraft with friends.

The servers are equipped with AMD Ryzen 7 5700G processors - 4.6 GHz. This ensures that our servers can handle even the most demanding tasks.
        </p>
      </div>
    </section>
  );
}
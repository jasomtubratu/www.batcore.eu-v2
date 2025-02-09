"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Server, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Spotlight } from "../ui/spotlight-new";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      <Spotlight  />
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            {t("hero.title")}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link href="https://client.batcore.eu">
                {t("hero.getStarted")}
                <Zap className="ml-2 " />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{t(`hero.stats.${stat.key}`)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  { key: "uptime", value: "99%" },
  { key: "latency", value: "<10ms" },
  { key: "support", value: "24/7" },
];
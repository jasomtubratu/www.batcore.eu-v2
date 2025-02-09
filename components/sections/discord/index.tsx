"use client";

import { motion } from "framer-motion";
import { DiscordStats } from "./discord-stats";
import { DiscordPreview } from "./discord-preview";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DiscordSection() {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-4 bg-blue-950/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("discord.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("discord.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <DiscordStats />
          <DiscordPreview />
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" className="group" onClick={() => window.open("https://discord.gg/4PeFg4a8KF", "_blank")}>
            {t("discord.button")}
            <Users className="w-6 h-6 ml-2 group-hover:animate-bounce" />
          </Button>

        </div>
      </div>
    </section>
  );
}
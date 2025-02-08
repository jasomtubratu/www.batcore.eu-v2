"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Box } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { GlowingEffect } from "../ui/glowing-effect";

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 h-full flex flex-col">
            <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
              <Box className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">{t("services.minecraft.title")}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{t("services.minecraft.description")}</p>
              <Button asChild>
                <Link href="/minecraft">{t("services.minecraft.cta")}</Link>
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20 h-full flex flex-col">
              <Server className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">{t("services.vps.title")}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{t("services.vps.description")}</p>
              <Button asChild>
                <Link href="/vps">{t("services.vps.cta")}</Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
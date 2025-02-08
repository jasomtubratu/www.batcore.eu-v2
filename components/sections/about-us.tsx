"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Shield, Users, Target, Heart } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";

const values = [
  {
    icon: Shield,
    title: "aboutUs.values.reliability.title",
    description: "aboutUs.values.reliability.description"
  },
  {
    icon: Users,
    title: "aboutUs.values.community.title",
    description: "aboutUs.values.community.description"
  },
  {
    icon: Target,
    title: "aboutUs.values.innovation.title",
    description: "aboutUs.values.innovation.description"
  },
  {
    icon: Heart,
    title: "aboutUs.values.passion.title",
    description: "aboutUs.values.passion.description"
  }
];

export function AboutUs() {
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
          <h2 className="text-3xl font-bold mb-4">{t("aboutUs.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("aboutUs.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20">
              <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
                <value.icon className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t(value.title)}</h3>
                <p className="text-muted-foreground">{t(value.description)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
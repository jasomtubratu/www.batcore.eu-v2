"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cpu, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../ui/glowing-effect";
import { useTranslation } from "react-i18next";

export function WhyChooseUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t("whychooseus.features.security.title"),
      description: t("whychooseus.features.security.description"),
    },
    {
      icon: Cpu,
      title: t("whychooseus.features.performance.title"),
      description: t("whychooseus.features.performance.description"),
    },
    {
      icon: Clock,
      title: t("whychooseus.features.uptime.title"),
      description: t("whychooseus.features.uptime.description"),
    },
    {
      icon: Users,
      title: t("whychooseus.features.support.title"),
      description: t("whychooseus.features.support.description"),
    },
  ];


  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("whychooseus.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("whychooseus.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
              <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
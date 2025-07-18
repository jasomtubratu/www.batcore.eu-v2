"use client";

import { Card } from "@/components/ui/card";
import { Users, MessageSquare, Headphones, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function DiscordStats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: "200+",
      label: t("discord.stats.members")
    },
    {
      icon: MessageSquare,
      value: "20+",
      label: t("discord.stats.channels")
    },
    {
      icon: HelpCircle,
      value: "24/7",
      label: t("discord.stats.support")
    }
  ];

  return (
    <div className="grid gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-blue-500/20">
            <div className="flex items-center gap-4">
              <stat.icon className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
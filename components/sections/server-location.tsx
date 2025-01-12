"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Signal } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ServerLocation() {
  const { t } = useTranslation();
  const [ping, setPing] = useState<number | null>(null);
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    try {
      const start = performance.now();
      await fetch("https://cz1.batcore.eu/ping");
      const end = performance.now();
      setPing(Math.round(end - start));
    } catch (error) {
      setPing(null);
    }
    setTesting(false);
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t("serverLocation.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("serverLocation.description")}
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Prague DC1</h3>
                <p className="text-muted-foreground">Prague, Czech Republic</p>
              </div>
              <Signal className="w-6 h-6 text-green-400" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span>
                  {ping ? `${ping}ms` : t("serverLocation.testPing")}
                </span>
              </div>
              <Button
                onClick={testConnection}
                disabled={testing}
                variant="outline"
              >
                {testing ? t("serverLocation.testing") : t("serverLocation.test")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
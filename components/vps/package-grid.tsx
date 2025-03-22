"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MemoryStick, Cpu, HardDrive, Percent } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { GlowingEffect } from "../ui/glowing-effect";

interface Package {
  id: string;
  name: string;
  cost: number;
  discount: number;
  ram: number;
  cpu: number;
  disk: number;
  image: string;
}

interface PackageGridProps {
  packages: Package[];
}

type Currency = "EUR" | "CZK" | "CREDITS";

const EXCHANGE_RATES = {
  EUR: 0.01,
  CZK: 0.245,
  CREDITS: 1
};

const CURRENCY_SYMBOLS = {
  EUR: "€",
  CZK: "Kč",
  CREDITS: "Kre"
};

export function PackageGrid({ packages }: PackageGridProps) {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<Currency>("EUR");

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100);
  };

  const formatPrice = (price: number, currency: Currency) => {
    return (price * 30 * EXCHANGE_RATES[currency]).toFixed(2);
  };

  return (
    <>
      <div className="flex justify-end mb-8">
        <div className="flex gap-2">
          {(Object.keys(EXCHANGE_RATES) as Currency[]).map((curr) => (
            <Button
              key={curr}
              variant={currency === curr ? "default" : "outline"}
              onClick={() => setCurrency(curr)}
              size="sm"
            >
              {curr}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages
        .sort((a, b) => a.cost - b.cost)
        .map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-blue-500/20 relative overflow-hidden">
            <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
              {pkg.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Percent className="w-4 h-4" />
                  {pkg.discount}% OFF
                </div>
              )}

              {pkg.image && (
                <div className="absolute top-0 left-0 right-0 h-32 flex items-center justify-center p-4">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    layout="fill"
                    objectFit="contain"
                    className="max-h-full"
                  />
                </div>
              )}
              
              <CardHeader className={pkg.image ? "pt-36" : ""}>
                <motion.h3 
                  className="text-2xl font-bold text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {pkg.name}
                </motion.h3>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {pkg.discount > 0 ? (
                    <>
                      <p className="text-3xl font-bold">
                        {CURRENCY_SYMBOLS[currency]}{formatPrice(calculateDiscountedPrice(pkg.cost, pkg.discount), currency)}
                        <span className="text-sm text-muted-foreground">{t("vps.packages.perMonth")}</span>
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        {CURRENCY_SYMBOLS[currency]}{formatPrice(pkg.cost, currency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-3xl font-bold">
                      {CURRENCY_SYMBOLS[currency]}{formatPrice(pkg.cost, currency)}
                      <span className="text-sm text-muted-foreground">{t("vps.packages.perMonth")}</span>
                    </p>
                  )}
                </motion.div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  <Spec 
                    icon={Cpu} 
                    value={`${pkg.cpu}%`} 
                    label={t("vps.packages.specs.cpu")} 
                  />
                  <Spec 
                    icon={MemoryStick} 
                    value={`${(pkg.ram / 1024).toFixed(0)} GB`} 
                    label={t("vps.packages.specs.ram")} 
                  />
                  <Spec 
                    icon={HardDrive} 
                    value={`${(pkg.disk / 1024).toFixed(0)} GB`} 
                    label={t("vps.packages.specs.storage")} 
                  />
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full"
                  asChild
                >
                  <a 
                    href="https://client.batcore.eu/panel/service" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {t("vps.packages.order")}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function Spec({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) {
  return (
    <motion.li 
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Icon className="w-5 h-5 text-blue-400" />
      <span>
        {value} {label}
      </span>
    </motion.li>
  );
}
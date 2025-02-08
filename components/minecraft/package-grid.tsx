"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Memory, Cpu, HardDrive, Database, Archive, Network, MemoryStick } from "lucide-react";
import { LoadingScreen } from "../loading";

interface Package {
  id: string;
  name: string;
  cost: number;
  ram: number;
  cpu: number;
  disk: number;
  databases: number;
  backups: number;
  allocations: number;
}

interface PackageGridProps {
  packages: Package[];
  isLoading: boolean;
  error: any;
}

function Spec({ icon: Icon, value, label }: { icon: any; value: string | number; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-400" />
      <span>
        {value} {label}
      </span>
    </li>
  );
}

export function PackageGrid({ packages, isLoading, error }: PackageGridProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="text-center text-red-500">{t("packages.error")}</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full bg-card/50 backdrop-blur-sm border-blue-500/20">
            <CardHeader>
              <h3 className="text-2xl font-bold">{pkg.name}</h3>
              <p className="text-3xl font-bold">
                €{pkg.cost}
                <span className="text-sm text-muted-foreground">/month</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <Spec icon={MemoryStick} value={`${pkg.ram} MB`} label="RAM" />
                <Spec icon={Cpu} value={`${pkg.cpu}%`} label="CPU" />
                <Spec icon={HardDrive} value={`${pkg.disk} MB`} label="Storage" />
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href={`https://client.batcore.eu/order/${pkg.id}`} target="_blank" rel="noopener noreferrer">
                  {t("packages.order")}
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
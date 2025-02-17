"use client";

import { Card } from "@/components/ui/card";
import { ServerLocation } from "./types";
import { motion } from "framer-motion";
import { Activity, SignalZero, SignalLow, SignalMedium, SignalHigh, Signal } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const PingStatus = ({ ping }: { ping: number | "Timed Out" | null | undefined }) => {
  if (ping === "Timed Out") {
    return <span className="text-sm text-red-500">Timed Out</span>;
  }

  let Icon = Signal;
  let color = "text-gray-500";

  if (typeof ping === "number") {
    if (ping < 50) {
      Icon = Signal;
      color = "text-green-500";
    } else if (ping < 100) {
      Icon = SignalHigh;
      color = "text-green-400";
    } else if (ping < 200) {
      Icon = SignalMedium;
      color = "text-orange-400";
    } else if (ping < 300) {
      Icon = SignalLow;
      color = "text-orange-500";
    } else {
      Icon = SignalZero;
      color = "text-red-500";
    }
  }

  return <Icon className={`w-5 h-5 ${color}`} />;
};

export function ServerCard({ name, status, location, ping, id, type, isPinging }: ServerLocation & { isPinging: boolean }) {
  const [pingLevel, setPingLevel] = useState<number | null>(null);

  useEffect(() => {
    if (typeof ping === "number") {
      setPingLevel(getPingLevel(ping));
    }
  }, [ping]);

  const getPingLevel = (ping: number): number => {
    if (ping < 50) return 5;
    if (ping < 100) return 4;
    if (ping < 200) return 3;
    if (ping < 300) return 2;
    return 1;
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="transition-all">
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-blue-500/20" key={id}>
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant="outline">{type.toLocaleUpperCase()}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{location}</p>
          </div>
          <div className="flex items-center gap-2">
            {isPinging ? (
              <span className="text-sm text-yellow-400">Pinging...</span>
            ) : (
              typeof ping === "number" && (
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{ping.toFixed(1)} ms</span>
                </div>
              )
            )}
            {/* @ts-ignore */}
            <PingStatus ping={ping} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

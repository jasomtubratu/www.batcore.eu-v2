"use client";

import { Card } from "@/components/ui/card";
import { ServerLocation } from "./types";
import { motion } from "framer-motion";
import { Activity, Signal } from "lucide-react";
import { useEffect, useState } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Badge } from "@/components/ui/badge";

export function ServerCard({ name, status, location, ip, id, type }: ServerLocation) {
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const res = await fetch(`/api/ping/${id}`);
        const data = await res.json();
        setPing(data.ping);
      } catch (error) {
        setPing(null);
      }
    }
    fetchPing();
  }, [id]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="transition-all"
    >
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-blue-500/20" key={id}>
      <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge variant="outline">{type.toLocaleUpperCase()}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">{location}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm">10ms</span>
            </div>
            <Signal className={`w-4 h-4 ${status === 'active' ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
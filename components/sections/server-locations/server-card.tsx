"use client";

import { Card } from "@/components/ui/card";
import { ServerLocation } from "./types";
import { motion } from "framer-motion";
import { Activity, Signal } from "lucide-react";

export function ServerCard({ name, status, ping, location }: ServerLocation) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="transition-all"
    >
      <Card className="p-4 bg-card/50 backdrop-blur-sm border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{location}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{ping}ms</span>
            </div>
            <Signal className={`w-4 h-4 ${status === 'active' ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
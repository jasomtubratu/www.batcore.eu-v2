"use client";

import { motion } from "framer-motion";
import { ServerLocation } from "./types";
import Image from "next/image";

interface ServerMapProps {
  locations: ServerLocation[];
}

export function ServerMap({ locations }: ServerMapProps) {
  return (
    <div className="relative aspect-[16/9] bg-blue-950/50 rounded-lg overflow-hidden">
      <Image
        src="/mapa2.png"
        layout="fill"
        objectFit="object-cover"
        alt="Server Map"
      />
      {locations.map((location, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3"
          style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.5 }}
        >
          <div className={`w-full h-full rounded-full ${location.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`} />
          <div className={`absolute w-full h-full rounded-full ${location.status === 'active' ? 'bg-green-400' : 'bg-red-400'} animate-ping opacity-75`} />
        </motion.div>
      ))}
    </div>
  );
}
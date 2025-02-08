"use client";

import { motion } from "framer-motion";

export function DiscordPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative aspect-video rounded-lg overflow-hidden bg-[#36393f] border border-[#202225]"
    >
      <iframe
        src="https://discord.com/widget?id=1263601764507189260&theme=dark"
        width="100%"
        height="100%"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        className="absolute inset-0"
      />
    </motion.div>
  );
}
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import favicon from "@/public/favicon.ico"; // Adjust the path accordingly

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <motion.div
        className="w-20 h-20 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src={favicon}
          alt="Loading..."
          width={128}
          height={128}
          className="rounded-full"
        />
      </motion.div>
    </div>
  );
}

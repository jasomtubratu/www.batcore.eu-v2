"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Server, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Try our server with fast exceptionnelle
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience lightning-fast performance with our premium hosting solutions.
            Built for gamers, by gamers.
          </p>

          <div className="flex gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started
              <Zap className="ml-2 group-hover:animate-bounce" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
              <Server className="ml-2" />
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "<10ms", label: "Latency" },
  { value: "24/7", label: "Support" },
];
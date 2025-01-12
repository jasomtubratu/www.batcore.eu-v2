"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cpu, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose BatCore?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide industry-leading hosting solutions with unmatched performance and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Enterprise-grade protection against all types of attacks",
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "Latest generation hardware for optimal performance",
  },
  {
    icon: Clock,
    title: "99.9% Uptime",
    description: "Guaranteed uptime with redundant infrastructure",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Expert support team available around the clock",
  },
];
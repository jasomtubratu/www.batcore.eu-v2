"use client";

import { motion } from "framer-motion";
import { PricingCard } from "./pricing-card";
import { pricingPlans } from "./data";

export function PurchaseSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect hosting package for your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
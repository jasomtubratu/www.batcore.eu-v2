"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { PricingPlan } from "./types";
import { motion } from "framer-motion";

export function PricingCard({ name, price, features, popular }: PricingPlan) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="h-full">
      <Card className={`h-full flex flex-col ${
        popular ? 'border-blue-500 bg-blue-950/20' : 'bg-card/50 backdrop-blur-sm border-blue-500/20'
      }`}>
        <CardHeader>
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={popular ? "default" : "outline"}>
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
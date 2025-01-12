import { PricingPlan } from "./types";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: 9.99,
    features: [
      "2GB RAM",
      "2 vCPU Cores",
      "50GB SSD Storage",
      "Basic DDoS Protection",
      "24/7 Support"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: 24.99,
    features: [
      "8GB RAM",
      "4 vCPU Cores",
      "100GB NVMe Storage",
      "Advanced DDoS Protection",
      "Priority Support",
      "Custom Domain"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: 49.99,
    features: [
      "16GB RAM",
      "8 vCPU Cores",
      "250GB NVMe Storage",
      "Enterprise DDoS Protection",
      "24/7 Premium Support",
      "Custom Domain",
      "Dedicated IP"
    ],
    popular: false
  }
];
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Faq } from "./types";

interface FaqAccordionProps {
  faqs: Faq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}
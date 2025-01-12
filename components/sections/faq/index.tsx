"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaqAccordion } from "./faq-accordion";
import { FaqSearch } from "./faq-search";
import { faqData } from "./data";

export function FaqSection() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFaqs = faqData.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our hosting services
          </p>
        </motion.div>

        <FaqSearch value={searchQuery} onChange={setSearchQuery} />
        <FaqAccordion faqs={filteredFaqs} />
      </div>
    </section>
  );
}
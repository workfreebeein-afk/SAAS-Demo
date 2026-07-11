"use client";
import { motion } from "framer-motion";

const partners = [
  "Microsoft", "Salesforce", "HubSpot", "Oracle", "SAP", "Google Cloud", "AWS", "Stripe", "Twilio", "OpenAI"
];

export function PartnersSection() {
  return (
    <section className="py-16 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/40 text-sm uppercase tracking-widest mb-10"
        >
          Trusted by teams using the world's leading platforms
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-white/25 hover:text-white/60 transition-colors duration-300 text-lg font-bold tracking-tight cursor-default"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

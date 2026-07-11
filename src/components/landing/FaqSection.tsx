"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How is JCS AI CRM different from Salesforce or HubSpot?", a: "JCS AI CRM is built AI-first — every feature from lead scoring to email generation uses advanced AI models. Unlike Salesforce or HubSpot where AI is a bolt-on, our AI is deeply integrated. We also offer faster deployment, more competitive pricing, and dedicated success support from day one." },
  { q: "Do I need technical expertise to set up the platform?", a: "No technical expertise required. Our onboarding team guides you through setup in under 48 hours. Data import is simple via CSV/Excel, and our visual workflow builder requires no coding. Most teams are fully operational within the first week." },
  { q: "Can I import my existing CRM data?", a: "Absolutely. JCS supports CSV and Excel imports for leads, companies, contacts, and deal data. We also provide migration assistance from Salesforce, HubSpot, Pipedrive, Zoho, and other major CRMs at no additional cost." },
  { q: "Is my data secure and GDPR compliant?", a: "Yes. We are SOC2 Type II certified and fully GDPR compliant. Your data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never share or sell your data. You can export or delete all data at any time." },
  { q: "What AI features are included?", a: "All plans include AI lead scoring, AI email generation, AI-powered insights and suggestions, and predictive analytics. Enterprise plans add custom AI models trained on your data, AI voice assistant (coming soon), and custom AI integrations." },
  { q: "Is there a free trial available?", a: "Yes — all plans include a 14-day free trial with full access to all features. No credit card required. After the trial, you can choose the plan that best fits your team." },
  { q: "Can we use JCS AI CRM for international sales?", a: "Yes. JCS supports multi-currency deals, timezone-aware scheduling, and outreach in 20+ countries. Our AI is trained on international business communication patterns for localized effectiveness." },
  { q: "What integrations are available?", a: "JCS integrates with 200+ tools including Gmail, Outlook, Slack, Microsoft Teams, Zoom, Calendly, Stripe, QuickBooks, and all major marketing platforms. Custom API integration is available on Enterprise plans." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 bg-navy-950 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Frequently Asked <span className="gradient-text-light">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/8 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-semibold text-sm">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/8 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

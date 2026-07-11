"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Alexandra Turner", title: "CTO, TechCorp Global", quote: "JCS AI CRM transformed our sales operation completely. We went from 200 leads/month to over 800, and our conversion rate jumped from 8% to 22% in just 90 days.", avatar: "AT", company: "TechCorp Global", rating: 5 },
  { name: "Khalid Al-Rashid", title: "VP Operations, Apex Logistics", quote: "The AI email generator alone saves my team 15 hours per week. The quality of the personalized outreach is incredible — prospects genuinely think it was written by a human.", avatar: "KA", company: "Apex Logistics", rating: 5 },
  { name: "Dr. Anna Schmidt", title: "Head of Business Dev, PharmaNova", quote: "We evaluated Salesforce, HubSpot, and JCS. JCS was the only platform that offered enterprise features at a price that made sense. The ROI was visible within 30 days.", avatar: "AS", company: "PharmaNova", rating: 5 },
  { name: "Wei Liang", title: "CEO, DataStream Analytics", quote: "As a tech startup, we needed a CRM that grows with us. JCS delivered on every promise — the automation workflows are miles ahead of anything else I've used.", avatar: "WL", company: "DataStream Analytics", rating: 5 },
  { name: "Sophie Williams", title: "Head of Operations, FinanceHub", quote: "The analytics dashboard gives me insights I never had before. I can see exactly where deals are stalling and why — which makes coaching my team so much easier.", avatar: "SW", company: "FinanceHub Ltd", rating: 5 },
  { name: "Marcus Lee", title: "Sales Director, SkyPort Airlines", quote: "JCS AI helped us close a $500K deal that had been stuck for 3 months. The AI suggested the exact right timing and messaging, and it worked perfectly.", avatar: "ML", company: "SkyPort Airlines", rating: 5 },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#0a0e1a] to-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Loved by <span className="gradient-text-light">Sales Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Join 500+ enterprise teams that have transformed their sales performance
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-200 flex flex-col gap-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/45 text-xs">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

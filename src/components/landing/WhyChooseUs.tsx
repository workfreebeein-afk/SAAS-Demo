"use client";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Clock, Brain, HeadphonesIcon, Code } from "lucide-react";

const reasons = [
  { icon: Brain, title: "AI-First Architecture", description: "Every feature is built with AI at its core — from lead scoring to email generation and revenue prediction.", highlight: "AI-powered" },
  { icon: TrendingUp, title: "Proven ROI", description: "Our clients average 12.8x ROI within 90 days. We guarantee measurable pipeline growth or your money back.", highlight: "12.8x ROI" },
  { icon: Clock, title: "Deploy in 48 Hours", description: "Onboarding takes less than 2 business days. Import your data, configure your workflows, and start selling.", highlight: "48-hour setup" },
  { icon: HeadphonesIcon, title: "Dedicated Success Team", description: "Every enterprise plan includes a dedicated Customer Success Manager, weekly check-ins, and 24/7 priority support.", highlight: "White-glove support" },
  { icon: Code, title: "API-Ready Architecture", description: "Integrate with Salesforce, HubSpot, Zapier, Slack, Microsoft Teams, and 200+ tools with native connectors.", highlight: "200+ integrations" },
  { icon: CheckCircle2, title: "Enterprise-Grade Security", description: "SOC2 Type II certified, GDPR compliant, with SSO, 2FA, role-based access, and complete audit logging.", highlight: "SOC2 certified" },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-gradient-to-b from-navy-950 to-[#0a0e1a] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,0.08)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6"
            >
              Why 500+ Teams Choose JCS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
            >
              Built for Sales Teams<br />
              <span className="gradient-text-light">That Mean Business.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg mb-8 leading-relaxed"
            >
              JCS AI CRM isn't just another CRM. It's a complete revenue acceleration engine that combines enterprise-grade CRM with cutting-edge AI automation to help your team sell smarter, not harder.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {["Lead AI Scoring", "Email Automation", "Pipeline Analytics", "24/7 Support", "GDPR Compliant", "Multi-Currency"].map(tag => (
                <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white/5 border border-white/10 text-white/70 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Reasons grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/12 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <reason.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-wide">{reason.highlight}</span>
                </div>
                <h3 className="text-white font-bold text-sm mb-1.5">{reason.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Bot, Mail, BarChart3, Users, Workflow, Shield, Globe, Zap, Calendar, FileText } from "lucide-react";

const features = [
  { icon: Bot, title: "AI Sales Assistant", description: "GPT-powered lead scoring, email generation, and revenue forecasting. Your AI co-pilot works 24/7.", color: "from-blue-500 to-blue-600", bg: "bg-blue-500/10" },
  { icon: Mail, title: "Email Automation", description: "Personalized drip sequences, A/B testing, and smart send-time optimization to maximize open rates.", color: "from-purple-500 to-purple-600", bg: "bg-purple-500/10" },
  { icon: BarChart3, title: "Revenue Analytics", description: "Real-time dashboards with pipeline health, conversion rates, and AI-driven revenue forecasting.", color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-500/10" },
  { icon: Users, title: "CRM & Lead Management", description: "Centralize all your leads, companies, contacts, and deals with intelligent tagging and filtering.", color: "from-orange-500 to-orange-600", bg: "bg-orange-500/10" },
  { icon: Workflow, title: "Visual Automation Builder", description: "Drag-and-drop workflow builder with triggers, conditions, actions, and time-based delays.", color: "from-pink-500 to-pink-600", bg: "bg-pink-500/10" },
  { icon: Calendar, title: "Meeting Intelligence", description: "Smart calendar integration with automated booking, reminders, and AI-generated meeting briefs.", color: "from-cyan-500 to-cyan-600", bg: "bg-cyan-500/10" },
  { icon: Globe, title: "Multi-Country Campaigns", description: "Localized outreach in 20+ countries with timezone-aware scheduling and language optimization.", color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-500/10" },
  { icon: Shield, title: "Enterprise Security", description: "SOC2 compliant with role-based access, audit logs, SSO, and enterprise-grade data encryption.", color: "from-red-500 to-red-600", bg: "bg-red-500/10" },
  { icon: FileText, title: "AI Report Generation", description: "One-click PDF/CSV/Excel reports with AI-written executive summaries and performance insights.", color: "from-yellow-500 to-yellow-600", bg: "bg-yellow-500/10" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            Everything You Need
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            One Platform. <span className="gradient-text-light">Infinite Possibilities.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Everything your sales team needs to generate leads, nurture relationships, and close deals faster than ever.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

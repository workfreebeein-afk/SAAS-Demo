"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Building2, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Rocket,
    price: "$49",
    period: "/month",
    description: "Perfect for small teams getting started with AI sales automation.",
    color: "from-blue-500 to-blue-600",
    features: [
      "Up to 500 leads",
      "5 user seats",
      "Email automation (1,000/mo)",
      "Basic AI lead scoring",
      "Standard analytics",
      "CSV import/export",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    icon: Zap,
    price: "$149",
    period: "/month",
    description: "The complete sales automation suite for growing teams.",
    color: "from-brand-600 to-purple-700",
    features: [
      "Up to 5,000 leads",
      "15 user seats",
      "Email automation (10,000/mo)",
      "Advanced AI scoring & insights",
      "Full analytics & reporting",
      "Automation workflow builder",
      "AI email generator",
      "Calendar integration",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "",
    description: "For large enterprises needing unlimited scale and white-glove service.",
    color: "from-purple-600 to-pink-600",
    features: [
      "Unlimited leads",
      "Unlimited users",
      "Unlimited email automation",
      "Custom AI models",
      "Custom integrations",
      "White-label option",
      "Multi-tenant support",
      "Dedicated success manager",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            Simple, <span className="gradient-text-light">Transparent</span> Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            Save 25% with annual billing. No hidden fees. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-brand-500/50 bg-gradient-to-b from-brand-900/40 to-purple-900/20 scale-105 shadow-glow"
                  : "border-white/10 bg-white/3 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-purple-700 rounded-full shadow-glow">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-white/45 text-sm mb-6">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-white/50 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-600 to-purple-700 text-white shadow-glow hover:shadow-glow-purple hover:scale-105"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

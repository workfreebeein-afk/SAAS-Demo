"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, Users, TrendingUp, Mail, BarChart3, Bot, Calendar } from "lucide-react";

const floatingCards = [
  { icon: Users, label: "CRM", value: "2,847 Leads", color: "from-blue-500 to-blue-600", delay: 0 },
  { icon: TrendingUp, label: "Revenue", value: "+$124K", color: "from-emerald-500 to-emerald-600", delay: 0.2 },
  { icon: Mail, label: "Emails Sent", value: "12,480", color: "from-purple-500 to-purple-600", delay: 0.4 },
  { icon: Bot, label: "AI Insights", value: "98 Active", color: "from-orange-500 to-orange-600", delay: 0.6 },
  { icon: Calendar, label: "Meetings", value: "23 Booked", color: "from-pink-500 to-pink-600", delay: 0.8 },
  { icon: BarChart3, label: "Conversion", value: "12.8%", color: "from-cyan-500 to-cyan-600", delay: 1.0 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.2)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.15)_0%,transparent_60%)]" />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/40 bg-brand-500/10 text-brand-300 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              AI-Powered Sales Automation Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              <span className="text-white">The Future of</span>
              <br />
              <span className="gradient-text-light">Enterprise Sales</span>
              <br />
              <span className="text-white">is Here.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed max-w-lg"
            >
              <p>Generate leads.</p>
              <p>Automate follow-ups.</p>
              <p>Close more deals — with AI.</p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/login"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-600 to-purple-700 text-white font-bold rounded-2xl shadow-glow hover:shadow-glow-purple hover:scale-105 transition-all duration-200 text-lg"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-200 text-lg backdrop-blur-sm"
              >
                <Play className="w-5 h-5 fill-white" />
                Explore Platform
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["bg-brand-500", "bg-purple-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"].map((color, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full ${color} border-2 border-navy-950 flex items-center justify-center text-white text-xs font-bold`}>
                    {["JC", "SM", "MC", "ER", "DP"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">500+ Sales Teams Trust JCS</div>
                <div className="text-white/50 text-xs">⭐⭐⭐⭐⭐ Rated 4.9/5 from 2,400+ reviews</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Cards Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:block hidden"
          >
            {/* Central dashboard preview */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central glowing orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-brand-600/30 to-purple-700/30 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-glass">
                  <div className="text-center">
                    <div className="text-5xl font-black text-white mb-1">$2.4M</div>
                    <div className="text-white/60 text-sm">Pipeline Value</div>
                    <div className="mt-2 text-emerald-400 text-sm font-semibold">↑ 38% this month</div>
                  </div>
                </div>
              </div>

              {/* Orbiting cards */}
              {floatingCards.map((card, i) => {
                const angle = (i / floatingCards.length) * 360;
                const radius = 200;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + card.delay, duration: 0.4, type: "spring" }}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-32 bg-navy-950/80 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-glass cursor-default hover:scale-110 transition-transform"
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-2`}>
                        <card.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-white text-xs font-semibold">{card.value}</div>
                      <div className="text-white/50 text-xs">{card.label}</div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

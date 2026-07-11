"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import { MOCK_ANALYTICS, MOCK_ACTIVITIES } from "@/lib/mock-db";
import { formatCurrency, formatNumber, timeAgo } from "@/lib/utils";
import {
  Users, TrendingUp, Mail, Calendar, Briefcase, DollarSign,
  Percent, Clock, ArrowUpRight, ArrowDownRight, Bot, Sparkles
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#2563eb", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

function StatCard({ icon: Icon, label, value, change, color, prefix = "", suffix = "" }: {
  icon: React.ElementType; label: string; value: number; change: number;
  color: string; prefix?: string; suffix?: string;
}) {
  const positive = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-white/8 shadow-card hover:shadow-card-hover card-hover transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${positive ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400"}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">
        {prefix}{typeof value === "number" && value > 1000 ? formatNumber(value) : value}{suffix}
      </div>
      <div className="text-sm text-gray-500 dark:text-white/40">{label}</div>
    </motion.div>
  );
}

const aiSuggestions = [
  { icon: "🔥", text: "TechCorp Global (Score: 92) hasn't been contacted in 3 days — best time to reach out is today 2-4 PM.", action: "Draft Email" },
  { icon: "📈", text: "SafeGuard Insurance deal ($110K) has been in Negotiation for 8 days. Consider offering a limited-time discount.", action: "View Deal" },
  { icon: "⚡", text: "Your best performing email template this week: 'Helping {Company} Boost Sales by 40%' — 38% open rate.", action: "View Stats" },
  { icon: "🎯", text: "3 follow-ups are overdue today: TechCorp, FinanceHub, and SkyPort Airlines.", action: "Follow Up" },
];

export function DashboardContent() {
  const [stats, setStats] = useState<any>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    setStats(StorageAPI.getStats() || {
      todayLeads: 8, totalLeads: 247, emailsSent: 1284, meetingsBooked: 23,
      openDeals: 15, revenue: 745000, conversionRate: 12.8, pendingFollowUps: 18,
      changes: { todayLeads: 14.3, totalLeads: 8.2, emailsSent: 22.5, meetingsBooked: 15.0, openDeals: -3.4, revenue: 18.7, conversionRate: 2.3, pendingFollowUps: -5.6 }
    });
    const leads = StorageAPI.getLeads().slice(0, 5);
    setRecentLeads(leads);
    setActivities(StorageAPI.getActivities().slice(0, 6));
  }, []);

  if (!stats) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const statCards = [
    { icon: Users,      label: "Today's Leads",       value: stats.todayLeads,      change: stats.changes.todayLeads,      color: "from-blue-500 to-blue-600" },
    { icon: TrendingUp, label: "Total Leads",          value: stats.totalLeads,      change: stats.changes.totalLeads,      color: "from-purple-500 to-purple-600" },
    { icon: Mail,       label: "Emails Sent",          value: stats.emailsSent,      change: stats.changes.emailsSent,      color: "from-cyan-500 to-cyan-600" },
    { icon: Calendar,   label: "Meetings Booked",      value: stats.meetingsBooked,  change: stats.changes.meetingsBooked,  color: "from-emerald-500 to-emerald-600" },
    { icon: Briefcase,  label: "Open Deals",           value: stats.openDeals,       change: stats.changes.openDeals,       color: "from-orange-500 to-orange-600" },
    { icon: DollarSign, label: "Revenue (YTD)",        value: stats.revenue,         change: stats.changes.revenue,         color: "from-brand-500 to-brand-600",  prefix: "$" },
    { icon: Percent,    label: "Conversion Rate",      value: stats.conversionRate,  change: stats.changes.conversionRate,  color: "from-pink-500 to-pink-600",    suffix: "%" },
    { icon: Clock,      label: "Pending Follow-ups",   value: stats.pendingFollowUps,change: stats.changes.pendingFollowUps,color: "from-red-500 to-red-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Monthly Revenue</h3>
              <p className="text-sm text-gray-500 dark:text-white/40">Revenue vs. Target — 2026</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">+18.7%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="target" stroke="#7c3aed" strokeWidth={2} strokeDasharray="4 2" fill="none" dot={false} name="Target" />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: "#2563eb", r: 4 }} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources Pie */}
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Lead Sources</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-4">Distribution by channel</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={MOCK_ANALYTICS.leadSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {MOCK_ANALYTICS.leadSources.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                formatter={(v: any) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {MOCK_ANALYTICS.leadSources.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-gray-600 dark:text-white/60">{s.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Funnel */}
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Sales Funnel</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-4">Active pipeline stages</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MOCK_ANALYTICS.salesFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {MOCK_ANALYTICS.salesFunnel.map((_, i) => (
                  <Cell key={i} fill={`hsl(${220 + i * 20}, 80%, ${60 - i * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Leads */}
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Recent Leads</h3>
            <a href="/dashboard/leads" className="text-xs text-brand-500 hover:text-brand-400 transition-colors font-medium">View all</a>
          </div>
          <div className="space-y-3">
            {recentLeads.map(lead => (
              <div key={lead.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {lead.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{lead.company}</p>
                  <p className="text-xs text-gray-500 dark:text-white/40 truncate">{lead.contactName}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  lead.score >= 80 ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  lead.score >= 60 ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" :
                  "bg-gray-50 dark:bg-white/8 text-gray-600 dark:text-white/50"
                }`}>
                  {lead.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">AI Suggestions</h3>
              <p className="text-xs text-gray-500 dark:text-white/40">Powered by JCS AI Engine</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="p-3 rounded-xl border border-gray-100 dark:border-white/8 hover:border-brand-200 dark:hover:border-brand-500/30 hover:bg-brand-50/50 dark:hover:bg-brand-500/5 transition-all cursor-pointer"
              >
                <div className="flex gap-2 items-start">
                  <span className="text-base">{s.icon}</span>
                  <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed flex-1">{s.text}</p>
                </div>
                <button className="mt-2 text-xs text-brand-500 dark:text-brand-400 font-semibold hover:text-brand-600 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {s.action}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Activity Timeline</h3>
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
              className="flex gap-4 items-start"
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-500/15 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-brand-500 rounded-full" />
                </div>
                {i < activities.length - 1 && <div className="w-0.5 h-full bg-gray-100 dark:bg-white/8 mt-1 min-h-4" />}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                  <span className="text-xs text-gray-400 dark:text-white/30">{timeAgo(activity.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-white/45 mt-0.5">{activity.description}</p>
                <p className="text-xs text-brand-500 dark:text-brand-400 mt-1">— {activity.userName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

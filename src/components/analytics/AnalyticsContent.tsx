"use client";
import { motion } from "framer-motion";
import { MOCK_ANALYTICS } from "@/lib/mock-db";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import { TrendingUp, Mail, Users, Percent, DollarSign, BarChart2 } from "lucide-react";

const COLORS = ["#2563eb", "#7c3aed", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
const CustomTooltipStyle = { backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" };

const kpis = [
  { label: "Total Revenue (YTD)", value: "$745K", change: "+18.7%", pos: true, icon: DollarSign, color: "from-brand-600 to-brand-700" },
  { label: "Total Leads", value: "247", change: "+8.2%", pos: true, icon: Users, color: "from-purple-600 to-purple-700" },
  { label: "Email Open Rate", value: "36.4%", change: "+4.1%", pos: true, icon: Mail, color: "from-cyan-600 to-cyan-700" },
  { label: "Conversion Rate", value: "12.8%", change: "+2.3%", pos: true, icon: Percent, color: "from-emerald-600 to-emerald-700" },
  { label: "Avg. Deal Value", value: "$62K", change: "-1.2%", pos: false, icon: TrendingUp, color: "from-orange-600 to-orange-700" },
  { label: "Meetings Booked", value: "23", change: "+15%", pos: true, icon: BarChart2, color: "from-pink-600 to-pink-700" },
];

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-white/8 shadow-card"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-xl font-black text-gray-900 dark:text-white">{kpi.value}</div>
            <div className="text-xs text-gray-500 dark:text-white/40 mb-1">{kpi.label}</div>
            <span className={`text-xs font-semibold ${kpi.pos ? "text-emerald-500" : "text-red-500"}`}>{kpi.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Revenue + Conversion */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Revenue vs. Target</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-5">Monthly performance — 2026</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={MOCK_ANALYTICS.monthlyRevenue}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient>
                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/><stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}K`} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: any) => [`$${Number(v).toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="target" name="Target" stroke="#7c3aed" strokeWidth={2} strokeDasharray="4 2" fill="url(#ag2)" dot={false} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#ag1)" dot={{ fill: "#2563eb", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Lead Sources</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-4">By channel</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={MOCK_ANALYTICS.leadSources} cx="50%" cy="50%" outerRadius={70} paddingAngle={2} dataKey="value">
                {MOCK_ANALYTICS.leadSources.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: any) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {MOCK_ANALYTICS.leadSources.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-gray-600 dark:text-white/60 truncate">{s.name}</span>
                <span className="ml-auto font-semibold text-gray-900 dark:text-white">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Metrics + Sales Funnel */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email Performance</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-5">Sent · Opened · Replied</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_ANALYTICS.emailMetrics} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CustomTooltipStyle} />
              <Legend />
              <Bar dataKey="sent" name="Sent" fill="#2563eb" radius={[4,4,0,0]} />
              <Bar dataKey="opened" name="Opened" fill="#7c3aed" radius={[4,4,0,0]} />
              <Bar dataKey="replied" name="Replied" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Conversion Rate Trend</h3>
          <p className="text-sm text-gray-500 dark:text-white/40 mb-5">Monthly conversion %</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MOCK_ANALYTICS.conversionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[8, 16]} />
              <Tooltip contentStyle={CustomTooltipStyle} formatter={(v: any) => [`${v}%`, "Conversion"]} />
              <Line type="monotone" dataKey="rate" name="Conversion %" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Country Leads + Industry Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Country-wise Leads</h3>
          <div className="space-y-3">
            {MOCK_ANALYTICS.countrywiseLeads.map((c, i) => {
              const max = MOCK_ANALYTICS.countrywiseLeads[0].leads;
              return (
                <div key={c.country} className="flex items-center gap-4">
                  <div className="w-28 text-xs text-gray-600 dark:text-white/60 font-medium truncate">{c.country}</div>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.leads / max) * 100}%` }}
                      transition={{ delay: i * 0.05 + 0.3, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-bold text-gray-900 dark:text-white">{c.leads}</span>
                  <span className="w-20 text-right text-xs text-gray-400 dark:text-white/30">{formatCurrency(c.revenue)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-6 border border-gray-100 dark:border-white/8 shadow-card">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Industry Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MOCK_ANALYTICS.industryBreakdown.slice(0, 7)} layout="vertical" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="industry" type="category" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={CustomTooltipStyle} />
              <Legend />
              <Bar dataKey="leads" name="Leads" fill="#2563eb" radius={[0,4,4,0]} />
              <Bar dataKey="deals" name="Deals" fill="#10b981" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

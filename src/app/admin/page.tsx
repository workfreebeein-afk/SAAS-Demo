"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import { User, Job, MediaFile, SEOSettings, AppSettings } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Users, Briefcase, Globe, Search, FolderOpen, FileDown, Settings, ShieldAlert,
  Plus, Edit, Trash2, Shield, Lock, Power, RefreshCw, Upload, FileText, CheckCircle,
  Activity, Server, Database, Key, Check, Zap, AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "jobs" | "cms" | "seo" | "media" | "reports" | "settings" | "premium">("overview");

  // State entities
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [seo, setSeo] = useState<SEOSettings | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);

  // Forms inputs
  const [userSearch, setUserSearch] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDept, setJobDept] = useState("");
  const [jobLoc, setJobLoc] = useState("");
  const [jobType, setJobType] = useState<any>("full-time");
  const [jobDesc, setJobDesc] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState(587);
  const [smtpUser, setSmtpUser] = useState("");
  const [aiProvider, setAiProvider] = useState("");
  const [aiModel, setAiModel] = useState("");
  const [waApiKey, setWaApiKey] = useState("");
  const [waPhoneId, setWaPhoneId] = useState("");

  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setUsers(StorageAPI.getUsers());
    setJobs(StorageAPI.getJobs());
    setMedia(StorageAPI.getMedia());

    const defaultSeo: SEOSettings = {
      title: "JCS AI Sales CRM",
      description: "World class enterprise sales CRM",
      keywords: "CRM, AI, Sales Automation",
      ogImage: "/og-image.png",
      robots: "index, follow",
      canonical: "https://jcscrm.com",
      analyticsId: "G-XXXXXXXXXX",
      googleVerification: "google-site-verification-12345",
      bingVerification: "bing-site-verification-12345"
    };
    setSeo(defaultSeo);
    setSeoTitle(defaultSeo.title);
    setSeoDesc(defaultSeo.description);
    setSeoKeywords(defaultSeo.keywords);

    const appSettings = StorageAPI.getSettings();
    if (appSettings) {
      setSettings(appSettings);
      setSmtpHost(appSettings.smtp?.host || "");
      setSmtpPort(appSettings.smtp?.port || 587);
      setSmtpUser(appSettings.smtp?.username || "");
      setAiProvider(appSettings.ai?.provider || "");
      setAiModel(appSettings.ai?.model || "");
      setWaApiKey(appSettings.whatsapp?.apiKey || "");
      setWaPhoneId(appSettings.whatsapp?.phoneId || "");
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // Add Job
  const handleAddJob = () => {
    if (!jobTitle || !jobDept) return;
    const newJob: Job = {
      id: "job_" + Date.now(),
      title: jobTitle,
      department: jobDept,
      location: jobLoc || "Remote",
      type: jobType,
      experience: "2-4 years",
      description: jobDesc || "Job details...",
      requirements: ["B2B SaaS Experience", "Detail Oriented", "Familiar with CRM Tools"],
      status: "open",
      applicants: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    const updated = [...jobs, newJob];
    StorageAPI.saveJobs(updated);
    setJobs(updated);
    setJobTitle("");
    setJobDept("");
    setJobLoc("");
    setJobDesc("");
    triggerToast("Job posted successfully!");
  };

  // Toggle User Status
  const handleToggleUser = (id: string) => {
    const updated = users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "active" ? "suspended" : "active";
        return { ...u, status: nextStatus as any };
      }
      return u;
    });
    StorageAPI.saveUsers(updated);
    setUsers(updated);
    triggerToast("User status updated");
  };

  // Save SEO
  const handleSaveSeo = () => {
    if (!seo) return;
    const updated = { ...seo, title: seoTitle, description: seoDesc, keywords: seoKeywords };
    setSeo(updated);
    triggerToast("SEO configuration saved");
  };

  // Save Settings
  const handleSaveSettings = () => {
    if (!settings) return;
    const updated: AppSettings = {
      ...settings,
      smtp: { ...settings.smtp, host: smtpHost, port: smtpPort, username: smtpUser },
      ai: { ...settings.ai, provider: aiProvider, model: aiModel },
      whatsapp: { ...settings.whatsapp, apiKey: waApiKey, phoneId: waPhoneId }
    };
    StorageAPI.saveSettings(updated);
    setSettings(updated);
    triggerToast("System settings updated successfully!");
  };

  // Mock Report generation
  const handleGenerateReport = (type: string) => {
    triggerToast(`Generating ${type} report...`);
    setTimeout(() => {
      triggerToast(`${type} Report downloaded successfully!`);
    }, 1500);
  };

  const tabs = [
    { id: "overview", icon: Activity, label: "System Overview" },
    { id: "users", icon: Users, label: "User Management" },
    { id: "jobs", icon: Briefcase, label: "Careers Portal" },
    { id: "cms", icon: Globe, label: "Website CMS" },
    { id: "seo", icon: Search, label: "SEO & Metadata" },
    { id: "media", icon: FolderOpen, label: "Media Library" },
    { id: "reports", icon: FileDown, label: "Data Exports" },
    { id: "settings", icon: Settings, label: "Integrations API" },
    { id: "premium", icon: Zap, label: "Premium Features" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-brand-500" />
            Admin Command Center
          </h2>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Manage infrastructure, security, and global platform settings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            All Systems Operational
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl shadow-lg flex items-center gap-2 text-sm backdrop-blur-sm"
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900/60 p-3 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-row lg:flex-col overflow-x-auto gap-1.5 sticky top-24">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all relative ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-brand-50 dark:bg-brand-500/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`w-4 h-4 shrink-0 relative z-10 ${isActive ? "text-brand-500" : ""}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* ──────────────────────────────────────────────────────────
                  OVERVIEW TAB
              ────────────────────────────────────────────────────────── */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-gray-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider">Total Users</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{users.length}</div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Server className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-gray-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider">Server Status</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">99.9% Uptime</div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-gray-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider">Storage Used</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">45.2 GB</div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900/60 p-5 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-gray-500 dark:text-white/40 text-xs font-bold uppercase tracking-wider">Active API Keys</h4>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">3</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">System Activity Log</h3>
                    <div className="space-y-4">
                      {[
                        { action: "Admin login successful", user: "Rajesh Kumar", time: "2 mins ago", type: "success" },
                        { action: "Database backup completed", user: "System", time: "1 hour ago", type: "info" },
                        { action: "New user registered", user: "Priya Sharma", time: "3 hours ago", type: "info" },
                        { action: "Failed login attempt detected", user: "Unknown IP", time: "5 hours ago", type: "warning" },
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${log.type === "success" ? "bg-emerald-500" : log.type === "warning" ? "bg-amber-500" : "bg-brand-500"}`} />
                          <div className="flex-1 text-gray-700 dark:text-white/80">{log.action}</div>
                          <div className="text-gray-500 text-xs w-32 truncate">{log.user}</div>
                          <div className="text-gray-400 text-xs w-24 text-right">{log.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  USERS TAB
              ────────────────────────────────────────────────────────── */}
              {activeTab === "users" && (
                <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl shadow-card overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">User Identity Management</h3>
                      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Manage access control and permissions</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl text-sm font-semibold shadow-glow hover:shadow-glow-purple transition-all hover:-translate-y-0.5">
                      <Plus className="w-4 h-4" />
                      Invite User
                    </button>
                  </div>
                  
                  <div className="p-4 border-b border-gray-100 dark:border-white/8">
                    <div className="relative max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        placeholder="Search users by name or email..." 
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:border-brand-500 transition-colors"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-white/5">
                        <tr className="text-left text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider">
                          <th className="py-3 px-6">User</th>
                          <th className="py-3 px-6">Role & Dept</th>
                          <th className="py-3 px-6">Last Login</th>
                          <th className="py-3 px-6">Status</th>
                          <th className="py-3 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/8 text-sm">
                        {users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                          <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors group">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/50 dark:to-purple-900/50 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold border border-white dark:border-gray-800 shadow-sm shrink-0">
                                  {u.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900 dark:text-white">{u.name}</div>
                                  <div className="text-xs text-gray-500">{u.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-700 dark:text-white/80 capitalize">{u.role.replace("_", " ")}</div>
                              <div className="text-xs text-gray-500">{u.department || "Sales"}</div>
                            </td>
                            <td className="py-4 px-6 text-gray-500">
                              {u.lastLogin ? formatDate(u.lastLogin) : "Never"}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                u.status === "active" 
                                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-500/20" 
                                  : "bg-red-50 dark:bg-red-500/10 text-red-600 border-red-200 dark:border-red-500/20"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-red-500"}`} />
                                <span className="capitalize">{u.status}</span>
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleToggleUser(u.id)}
                                className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                              >
                                {u.status === "active" ? "Suspend" : "Activate"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  PREMIUM TAB (Replaces Future)
              ────────────────────────────────────────────────────────── */}
              {activeTab === "premium" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-brand-900/40 dark:to-purple-900/40 border border-gray-800 dark:border-brand-500/20 rounded-2xl p-8 shadow-card text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-brand-200 mb-4">
                        <Zap className="w-3.5 h-3.5" />
                        Enterprise Edition
                      </span>
                      <h3 className="text-3xl font-bold mb-2 text-white">Unlock Full Potential</h3>
                      <p className="text-gray-300 max-w-xl text-sm leading-relaxed mb-8">
                        The current license is running the Core SaaS bundle. Upgrade to Enterprise to unlock AI voice agents, ERP sync, and multi-tenant capabilities.
                      </p>
                      <button className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                        Contact Sales to Upgrade
                        <Shield className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "WhatsApp Marketing Automations", desc: "Automate bulk message broadcasting & AI auto replies via WhatsApp Cloud API.", icon: Globe, color: "text-green-500", bg: "bg-green-500/10" },
                      { title: "AI Real-time Voice Calling", desc: "Initiate voice agent calling scripts directly from CRM.", icon: Power, color: "text-purple-500", bg: "bg-purple-500/10" },
                      { title: "ERP & Financial Integrations", desc: "Synchronize customer invoices, payments & accounting in real-time.", icon: RefreshCw, color: "text-blue-500", bg: "bg-blue-500/10" },
                      { title: "Multi-Tenant Whitelabeling", desc: "Customize domains, logos, colors & emails for agencies.", icon: Edit, color: "text-orange-500", bg: "bg-orange-500/10" }
                    ].map(item => (
                      <div key={item.title} className="bg-white dark:bg-gray-900/60 p-6 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex items-start gap-4 opacity-75 grayscale hover:grayscale-0 transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute top-2 right-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-white/60 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  SETTINGS TAB
              ────────────────────────────────────────────────────────── */}
              {activeTab === "settings" && (
                <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl shadow-card overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-white/8">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">API & Integrations</h3>
                    <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Configure third-party services and keys</p>
                  </div>
                  
                  <div className="p-6 space-y-8">
                    {/* SMTP */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </span>
                        SMTP Email Server
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">SMTP Host</label>
                          <input placeholder="smtp.provider.com" value={smtpHost} onChange={e => setSmtpHost(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">SMTP Port</label>
                          <input type="number" placeholder="587" value={smtpPort} onChange={e => setSmtpPort(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Username / API Key</label>
                          <input placeholder="API Username" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-white/10" />

                    {/* AI */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-600 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </span>
                        AI Provider Configuration
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Provider (OpenAI, Gemini, Anthropic)</label>
                          <input placeholder="e.g. openai" value={aiProvider} onChange={e => setAiProvider(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Default Model</label>
                          <input placeholder="e.g. gpt-4o" value={aiModel} onChange={e => setAiModel(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-white/10" />

                    {/* WhatsApp */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </span>
                        WhatsApp Cloud API
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">API Access Token</label>
                          <input type="password" placeholder="••••••••••••••••" value={waApiKey} onChange={e => setWaApiKey(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number ID</label>
                          <input placeholder="e.g. 1029384756" value={waPhoneId} onChange={e => setWaPhoneId(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-lg text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/8 flex justify-end">
                    <button onClick={handleSaveSettings} className="px-6 py-2.5 bg-gradient-to-r from-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 text-white rounded-xl text-sm font-semibold shadow-glow transition-all">
                      Save Integrations Configuration
                    </button>
                  </div>
                </div>
              )}

              {/* ──────────────────────────────────────────────────────────
                  JOBS TAB
              ────────────────────────────────────────────────────────── */}
              {activeTab === "jobs" && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl shadow-card overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-white/8">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Post a New Role</h3>
                      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">Add openings to the public careers portal</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Job Title</label>
                          <input placeholder="e.g. Senior Account Executive" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-xl text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Department</label>
                          <input placeholder="e.g. Sales" value={jobDept} onChange={e => setJobDept(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-xl text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
                          <input placeholder="e.g. Mumbai, Remote" value={jobLoc} onChange={e => setJobLoc(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-xl text-sm outline-none focus:border-brand-500 transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Employment Type</label>
                          <select value={jobType} onChange={e => setJobType(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 rounded-xl text-sm outline-none focus:border-brand-500 transition-colors">
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="remote">Remote</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/10 mt-6">
                        <button onClick={handleAddJob} className="px-6 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow flex items-center gap-2 hover:shadow-glow-purple transition-all">
                          <Plus className="w-4 h-4" />
                          Publish Opening
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white px-1">Active Roles</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {jobs.map(job => (
                        <div key={job.id} className="p-5 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{job.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">{job.department} · {job.location}</p>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded">
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
                            <div className="text-xs text-gray-500">
                              <span className="font-semibold text-gray-900 dark:text-white">{job.applicants}</span> Applicants
                            </div>
                            <button className="text-xs text-brand-600 font-semibold hover:underline">Manage</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Keep other tabs simple for the demo */}
              {(activeTab === "cms" || activeTab === "seo" || activeTab === "media" || activeTab === "reports") && (
                <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl shadow-card p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                    {activeTab === "cms" && <Globe className="w-8 h-8" />}
                    {activeTab === "seo" && <Search className="w-8 h-8" />}
                    {activeTab === "media" && <FolderOpen className="w-8 h-8" />}
                    {activeTab === "reports" && <FileDown className="w-8 h-8" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 capitalize">{activeTab} Manager</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 max-w-sm">This module is currently running in automated mode. Advanced configurations are locked for this demo environment.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

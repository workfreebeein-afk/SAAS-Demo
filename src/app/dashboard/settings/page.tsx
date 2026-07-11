"use client";
import { useState, useEffect } from "react";
import { StorageAPI } from "@/lib/storage";
import { AppSettings } from "@/types";
import { Settings, Shield, Bell, Key, Sparkles, Building, CreditCard } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "company" | "smtp" | "notifications" | "security">("profile");
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setSettings(StorageAPI.getSettings());
  }, []);

  const handleSave = () => {
    if (settings) {
      StorageAPI.saveSettings(settings);
      setToastMsg("Settings saved successfully!");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">Manage your profile, system integrations, and system defaults</p>
        </div>
        <button onClick={handleSave} className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow">
          Save Settings
        </button>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs max-w-sm">
          {toastMsg}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings categories navigation links */}
        <div className="w-full lg:w-56 shrink-0 flex flex-row lg:flex-col overflow-x-auto gap-1 bg-white dark:bg-gray-900/60 p-2 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card shrink-0">
          {[
            { id: "profile", icon: Settings, label: "User Profile" },
            { id: "company", icon: Building, label: "Company Profile" },
            { id: "smtp", icon: Key, label: "Integrations & API" },
            { id: "notifications", icon: Bell, label: "Notifications" },
            { id: "security", icon: Shield, label: "Security & MFA" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-brand-600/15 text-brand-600 dark:text-brand-400 border-l-2 border-brand-500"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Panels */}
        <div className="flex-1 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-6 shadow-card min-w-0 space-y-6">
          {activeTab === "profile" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">User Profile Settings</h3>
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5">Full Name</label>
                <input placeholder="Name" defaultValue="James Carter" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5">Email Address</label>
                <input placeholder="Email" defaultValue="demo@jcscrm.com" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5">Phone number</label>
                <input placeholder="Phone" defaultValue="+1 (555) 0100" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm" />
              </div>
            </div>
          )}

          {activeTab === "company" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Company Organization Settings</h3>
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5">Company Name</label>
                <input placeholder="Company" defaultValue="JCS AI CRM Solutions" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold tracking-wider mb-1.5">Address</label>
                <input placeholder="Address" defaultValue="100 AI Way, San Francisco, CA" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm" />
              </div>
            </div>
          )}

          {activeTab === "smtp" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Integrations & API Settings</h3>
              <div className="p-4 border border-yellow-500/10 bg-yellow-500/[0.02] text-yellow-600 dark:text-yellow-400 rounded-xl text-xs">
                To link live production SMTP, Twilio, or WhatsApp business accounts, please configure from the Admin panel settings tab.
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">System Notification Preferences</h3>
              {settings && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">Email Notifications</span>
                      <span className="text-xs text-gray-400">Receive lead summaries and deal status via email.</span>
                    </div>
                    <input type="checkbox" checked={settings.notifications.emailNotifications} onChange={e => setSettings({ ...settings, notifications: { ...settings.notifications, emailNotifications: e.target.checked } })} className="w-4 h-4 rounded accent-brand-500" />
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">Push Notifications</span>
                      <span className="text-xs text-gray-400">Receive instant updates within this browser window.</span>
                    </div>
                    <input type="checkbox" checked={settings.notifications.pushNotifications} onChange={e => setSettings({ ...settings, notifications: { ...settings.notifications, pushNotifications: e.target.checked } })} className="w-4 h-4 rounded accent-brand-500" />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">MFA & Authentication Security</h3>
              <button className="px-4 py-2 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl text-xs font-semibold">Enable Two-Factor Authentication</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { StorageAPI } from "@/lib/storage";
import { Notification } from "@/types";
import { getInitials, timeAgo } from "@/lib/utils";
import { Bell, Sun, Moon, Search, X, CheckCheck, Zap, TrendingUp, Mail, Calendar, ShieldAlert } from "lucide-react";

const BREADCRUMBS: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/leads": "Leads",
  "/dashboard/companies": "Companies",
  "/dashboard/contacts": "Contacts",
  "/dashboard/deals": "Deals",
  "/dashboard/calendar": "Calendar",
  "/dashboard/email": "Email",
  "/dashboard/ai-chat": "AI Chat",
  "/dashboard/automation": "Automation",
  "/dashboard/follow-up": "Follow-up Manager",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

const notifIcons: Record<string, React.ElementType> = {
  lead: TrendingUp, deal: Zap, email: Mail, meeting: Calendar, system: Bell, ai: ShieldAlert
};

export function TopHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNotifications(StorageAPI.getNotifications());
  }, []);

  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    StorageAPI.saveNotifications(updated);
    setNotifications(updated);
  };

  const pageTitle = BREADCRUMBS[pathname] || "JCS AI CRM";

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center gap-4 px-4 md:px-6 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/8">
      {/* Page title */}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
        <p className="text-xs text-gray-500 dark:text-white/40 hidden sm:block">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-xl text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white transition-all"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-card-hover z-20 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/8">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">Notifications</span>
                    <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-brand-500 hover:text-brand-400 transition-colors">
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notif => {
                      const Icon = notifIcons[notif.type] || Bell;
                      return (
                        <div
                          key={notif.id}
                          className={`flex gap-3 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-gray-50 dark:border-white/5 last:border-0 ${!notif.read ? "bg-brand-50/50 dark:bg-brand-500/5" : ""}`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${!notif.read ? "bg-brand-100 dark:bg-brand-500/20" : "bg-gray-100 dark:bg-white/8"}`}>
                            <Icon className={`w-4 h-4 ${!notif.read ? "text-brand-600 dark:text-brand-400" : "text-gray-500 dark:text-white/40"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{notif.title}</p>
                            <p className="text-xs text-gray-500 dark:text-white/45 mt-0.5 line-clamp-2">{notif.message}</p>
                            <p className="text-xs text-gray-400 dark:text-white/30 mt-1">{timeAgo(notif.createdAt)}</p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-brand-500 rounded-full mt-1.5 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            {user ? getInitials(user.name) : "JC"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{user?.name?.split(" ")[0] || "James"}</p>
            <p className="text-xs text-gray-500 dark:text-white/40 leading-none mt-0.5 capitalize">{user?.role?.replace("_", " ") || "Admin"}</p>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-card-hover overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-white/8">
                <Search className="w-5 h-5 text-gray-400 dark:text-white/30 shrink-0" />
                <input autoFocus placeholder="Search leads, companies, contacts..." className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none text-sm" />
                <button onClick={() => setSearchOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 dark:text-white/30 dark:hover:text-white/70 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 text-sm text-gray-400 dark:text-white/30 text-center">
                Type to search across your CRM data...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

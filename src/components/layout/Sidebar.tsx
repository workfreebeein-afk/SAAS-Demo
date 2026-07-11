"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import {
  LayoutDashboard, Users, Building2, Contact, Handshake, Calendar,
  Mail, Zap, BarChart3, Settings, ShieldCheck, ChevronLeft,
  ChevronRight, Bot, GitBranch, Clock, LogOut, Briefcase
} from "lucide-react";

const navItems = [
  { href: "/dashboard",            icon: LayoutDashboard, label: "Dashboard",    group: "main" },
  { href: "/dashboard/leads",      icon: Users,            label: "Leads",       group: "crm" },
  { href: "/dashboard/companies",  icon: Building2,        label: "Companies",   group: "crm" },
  { href: "/dashboard/contacts",   icon: Contact,          label: "Contacts",    group: "crm" },
  { href: "/dashboard/deals",      icon: Handshake,        label: "Deals",       group: "crm" },
  { href: "/dashboard/calendar",   icon: Calendar,         label: "Calendar",    group: "crm" },
  { href: "/dashboard/email",      icon: Mail,             label: "Email",       group: "tools" },
  { href: "/dashboard/ai-chat",    icon: Bot,              label: "AI Chat",     group: "tools" },
  { href: "/dashboard/automation", icon: GitBranch,        label: "Automation",  group: "tools" },
  { href: "/dashboard/follow-up",  icon: Clock,            label: "Follow Up",   group: "tools" },
  { href: "/dashboard/analytics",  icon: BarChart3,        label: "Analytics",   group: "tools" },
  { href: "/dashboard/settings",   icon: Settings,         label: "Settings",    group: "system" },
  { href: "/admin",                icon: ShieldCheck,      label: "Admin Panel", group: "system" },
];

const groups: { key: string; label: string }[] = [
  { key: "main",   label: "Main" },
  { key: "crm",    label: "CRM" },
  { key: "tools",  label: "Tools" },
  { key: "system", label: "System" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative hidden md:flex flex-col h-screen bg-navy-950 border-r border-white/8 shrink-0 overflow-hidden z-30"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center shadow-glow shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="font-black text-lg text-white whitespace-nowrap"
            >
              JCS <span className="gradient-text-light">AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {groups.map(group => {
          const items = navItems.filter(i => i.group === group.key);
          return (
            <div key={group.key} className="mb-2">
              {!collapsed && (
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-widest text-white/25">
                  {group.label}
                </p>
              )}
              {items.map(item => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                      active
                        ? "bg-brand-600/15 text-white border-r-2 border-brand-500"
                        : "text-white/50 hover:text-white hover:bg-white/6"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", active && "text-brand-400")} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {/* Tooltip when collapsed */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User info */}
      <div className="border-t border-white/8 p-3">
        <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user ? getInitials(user.name) : "JC"}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user?.name || "James Carter"}</p>
                <p className="text-white/40 text-xs truncate capitalize">{user?.role?.replace("_", " ") || "Admin"}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={logout}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-navy-950 border border-white/15 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all shadow-md z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}

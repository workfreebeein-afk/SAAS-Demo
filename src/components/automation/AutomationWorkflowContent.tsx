"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import {
  GitBranch, Play, Pause, Plus, Eye, Sparkles, Mail, Send, Clock, BadgeCheck, Star, Trash2
} from "lucide-react";

interface NodeProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  type: string;
  color: string;
}

function WorkflowNodeItem({ icon: Icon, title, desc, type, color }: NodeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-card hover:border-brand-500/30 transition-all flex items-center gap-3.5"
      >
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 text-white`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest block">{type}</span>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-white/40 truncate">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedConnector() {
  return (
    <div className="flex flex-col items-center py-4">
      {/* Connector Line */}
      <div className="w-0.5 h-10 bg-gradient-to-b from-brand-500 to-purple-600 relative overflow-hidden">
        {/* Animated pulse dot */}
        <motion.div
          animate={{ y: [0, 40] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-glow"
        />
      </div>
    </div>
  );
}

export function AutomationWorkflowContent() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [activeWorkflowId, setActiveWorkflowId] = useState("");

  useEffect(() => {
    const list = StorageAPI.getWorkflows();
    setWorkflows(list);
    if (list.length > 0) {
      setActiveWorkflowId(list[0].id);
    }
  }, []);

  const toggleWorkflowStatus = (id: string) => {
    const updated = workflows.map(w => {
      if (w.id === id) {
        return { ...w, status: w.status === "active" ? "inactive" : "active" };
      }
      return w;
    });
    StorageAPI.saveWorkflows(updated);
    setWorkflows(updated);
  };

  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId);

  const nodeIcons: Record<string, any> = {
    trigger: GitBranch,
    email: Mail,
    send: Send,
    wait: Clock,
    condition: Sparkles,
    check: BadgeCheck,
    won: Star
  };

  const nodeColors: Record<string, string> = {
    trigger: "from-blue-500 to-blue-600",
    email: "from-purple-500 to-purple-600",
    send: "from-cyan-500 to-cyan-600",
    wait: "from-orange-500 to-orange-600",
    condition: "from-brand-500 to-brand-600",
    check: "from-emerald-500 to-emerald-600",
    won: "from-pink-500 to-pink-600"
  };

  // Predefined sequential nodes to visualize beautifully
  const demoFlowNodes = [
    { type: "Trigger", title: "Lead Created", desc: "Source: All Web Forms", icon: GitBranch, color: "from-blue-500 to-blue-600" },
    { type: "AI Action", title: "Email Generated", desc: "Template: Cold Introduction", icon: Sparkles, color: "from-purple-500 to-purple-600" },
    { type: "Action", title: "Email Sent", desc: "SMTP Delivery Engine", icon: Send, color: "from-cyan-500 to-cyan-600" },
    { type: "Delay", title: "3 Days Wait", desc: "Pause nurturing path", icon: Clock, color: "from-orange-500 to-orange-600" },
    { type: "Condition", title: "Replied?", desc: "Check incoming email logs", icon: Sparkles, color: "from-brand-500 to-brand-600" },
    { type: "Stage Update", title: "Set Won", desc: "Move deal to Closed Won", icon: Star, color: "from-pink-500 to-pink-600" }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Left panel: List */}
      <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-brand-500" />
            Automations
          </h3>
          <button className="p-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl shadow-glow hover:scale-105 transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {workflows.map(w => (
            <div
              key={w.id}
              onClick={() => setActiveWorkflowId(w.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                activeWorkflowId === w.id
                  ? "border-brand-500/50 bg-brand-500/5 dark:bg-brand-500/10"
                  : "border-gray-100 dark:border-white/8 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-gray-900 dark:text-white text-sm truncate block max-w-44">{w.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWorkflowStatus(w.id); }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    w.status === "active"
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
                      : "bg-gray-100 dark:bg-white/8 text-gray-400"
                  }`}
                >
                  {w.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/40 line-clamp-2 leading-relaxed mb-3">{w.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Runs: {w.runsCount}</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold ${w.status === "active" ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600" : "bg-gray-100 dark:bg-white/10 text-gray-400"}`}>
                  {w.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel: Visual Canvas */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col overflow-hidden relative">
        {/* Visual grid background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, #2563eb 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px"
        }} />

        {/* Canvas Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/8 bg-gray-50/50 dark:bg-white/3 relative z-10">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{activeWorkflow?.name}</h4>
            <p className="text-xs text-gray-500 dark:text-white/40">Visual workflow builder & path visualizer</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-white/15 transition-all">
              <Eye className="w-3.5 h-3.5" />
              Test Flow
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas Flow Area */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center relative z-10">
          <div className="flex flex-col items-center">
            {demoFlowNodes.map((node, i) => (
              <div key={i} className="flex flex-col items-center">
                <WorkflowNodeItem
                  icon={node.icon}
                  title={node.title}
                  desc={node.desc}
                  type={node.type}
                  color={node.color}
                />
                {i < demoFlowNodes.length - 1 && <AnimatedConnector />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

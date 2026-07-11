"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import { Lead, Activity, User } from "@/types";
import { formatDate, formatCurrency, getStatusColor, getStageColor, timeAgo } from "@/lib/utils";
import {
  ArrowLeft, Building2, Calendar, Mail, Phone, Globe, DollarSign,
  Plus, Send, FileText, ChevronRight, ShieldAlert, CheckCircle2, History, AlertCircle, Bot
} from "lucide-react";

export function LeadDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [noteInput, setNoteInput] = useState("");
  const [activeTab, setActiveTab] = useState<"timeline" | "profile" | "files" | "emails">("timeline");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const leads = StorageAPI.getLeads();
    const foundLead = leads.find((l) => l.id === id);
    if (foundLead) {
      setLead(foundLead);
    } else {
      router.push("/dashboard/leads");
    }

    const allActivities = StorageAPI.getActivities();
    const leadActivities = allActivities.filter((a) => a.leadId === id);
    setActivities(leadActivities);

    const curr = StorageAPI.getCurrentUser();
    setCurrentUser(curr);
  }, [id, router]);

  if (!lead) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const addNote = () => {
    if (!noteInput.trim()) return;

    const newActivity: Activity = {
      id: "act_" + Date.now(),
      type: "note",
      title: "Note Added",
      description: noteInput.trim(),
      leadId: lead.id,
      userId: currentUser?.id || "u1",
      userName: currentUser?.name || "James Carter",
      createdAt: new Date().toISOString()
    };

    StorageAPI.addActivity(newActivity);
    setActivities([newActivity, ...activities]);
    setNoteInput("");
  };

  const getStageDisplay = (stage: string) => {
    const labels: Record<string, string> = {
      new: "New Lead", contacted: "Contacted", qualified: "Qualified",
      proposal: "Proposal Sent", negotiation: "Negotiation", won: "Closed Won", lost: "Closed Lost"
    };
    return labels[stage] || stage;
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/dashboard/leads")}
          className="p-2 rounded-xl text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-semibold text-brand-500 uppercase tracking-wider">Leads &gt; Detail</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {lead.company}
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400">
              Score: {lead.score}
            </span>
          </h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Side: Company Overview */}
        <div className="space-y-6">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 space-y-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xl font-bold">
                {lead.company[0]}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{lead.company}</h3>
                <p className="text-sm text-gray-500 dark:text-white/40">{lead.industry}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-gray-100 dark:border-white/8 py-4">
              <div>
                <span className="text-xs text-gray-400 dark:text-white/30 block">Stage</span>
                <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-semibold" style={{ background: getStageColor(lead.stage) + "20", color: getStageColor(lead.stage) }}>
                  {getStageDisplay(lead.stage)}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400 dark:text-white/30 block">Deal Value</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white block mt-1">
                  {lead.dealValue ? formatCurrency(lead.dealValue) : "—"}
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-gray-400 dark:text-white/30" />
                <span className="text-gray-700 dark:text-white/70">{lead.website || "No website"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400 dark:text-white/30" />
                <span className="text-gray-700 dark:text-white/70">{lead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400 dark:text-white/30" />
                <span className="text-gray-700 dark:text-white/70">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="w-4 h-4 text-gray-400 dark:text-white/30" />
                <span className="text-gray-700 dark:text-white/70">{lead.country}</span>
              </div>
            </div>
          </div>

          {/* AI Suggestions Card */}
          <div className="bg-gradient-to-br from-brand-600/10 to-purple-600/10 border border-brand-500/20 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-brand-500" />
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">AI Copilot Analysis</h4>
            </div>
            <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed mb-4">
              This lead scores <strong className="text-brand-500">{lead.score}/100</strong>. High response probability predicted due to industry synergy. Target decision makers using the 'Outreach Introduction' template.
            </p>
            <button
              onClick={() => router.push(`/dashboard/email?leadId=${lead.id}`)}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-xs font-semibold shadow-glow hover:scale-102 transition-all"
            >
              Generate AI Email
            </button>
          </div>
        </div>

        {/* Right Side: Navigation Tabs & Activity Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-1 flex gap-1 shadow-card">
            {(["timeline", "profile", "emails", "files"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/70"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "timeline" && (
            <div className="space-y-6">
              {/* Note input box */}
              <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-4 shadow-card space-y-3">
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Log a call, add a note, or plan a task..."
                  rows={3}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/20 rounded-xl p-3 focus:outline-none focus:border-brand-500 text-sm resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={addNote}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-xs font-semibold shadow-glow hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Save Note
                  </button>
                </div>
              </div>

              {/* Timeline list */}
              <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-white/8 pb-3 flex items-center gap-2">
                  <History className="w-4 h-4 text-gray-400" />
                  Activity History
                </h4>

                <div className="relative border-l border-gray-100 dark:border-white/8 pl-6 ml-3 space-y-6">
                  {activities.length > 0 ? (
                    activities.map((act) => (
                      <div key={act.id} className="relative group">
                        {/* Dot indicator */}
                        <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-brand-500 border-2 border-white dark:border-gray-950 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{act.title}</span>
                            <span className="text-xs text-gray-400 dark:text-white/30">{timeAgo(act.createdAt)}</span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-white/45 mt-0.5">{act.description}</p>
                          <span className="text-[10px] font-semibold text-brand-500 uppercase tracking-wider block mt-1">
                            Logged by {act.userName}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center text-gray-400 dark:text-white/20">
                      <AlertCircle className="w-8 h-8 mb-2" />
                      <p className="text-sm">No activity logged yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/8 pb-3">Company Details</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Contact Person</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{lead.contactName}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Country</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{lead.country}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Industry Sector</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{lead.industry}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Original Source</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 capitalize">{lead.source}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Pipeline Track</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{lead.pipeline}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 dark:text-white/30">Creation Date</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">{formatDate(lead.createdAt)}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emails" && (
            <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/8 pb-3">Communication Logs</h3>
              <div className="space-y-4">
                {activities.filter(a => a.type === "email").map(email => (
                  <div key={email.id} className="p-4 rounded-xl border border-gray-100 dark:border-white/8 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{email.title}</span>
                      <span className="text-xs text-gray-400">{timeAgo(email.createdAt)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-white/50">{email.description}</p>
                  </div>
                ))}
                {activities.filter(a => a.type === "email").length === 0 && (
                  <div className="text-center py-6 text-gray-400 dark:text-white/20">
                    <Mail className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">No emails sent yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "files" && (
            <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/8 pb-3">Attached Files</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 dark:border-white/8 hover:border-brand-500/30 transition-all cursor-pointer flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">NDA_Agreement.pdf</p>
                    <p className="text-[10px] text-gray-400">1.2 MB · Added 3d ago</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 dark:border-white/8 hover:border-brand-500/30 transition-all cursor-pointer flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">Initial_Proposal.pdf</p>
                    <p className="text-[10px] text-gray-400">2.4 MB · Added 2d ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

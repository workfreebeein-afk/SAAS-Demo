"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import { Lead, EmailTemplate, User, Activity } from "@/types";
import { MOCK_EMAIL_TEMPLATES } from "@/lib/mock-db";
import {
  Mail, Sparkles, Send, Copy, Edit3, Eye, Loader2, Check, ArrowRight,
  Bot, AlertCircle, RefreshCw
} from "lucide-react";

export function AiEmailGeneratorContent() {
  const searchParams = useSearchParams();
  const leadIdParam = searchParams.get("leadId");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setLeads(StorageAPI.getLeads());
    setTemplates(StorageAPI.getEmailTemplates());
    setCurrentUser(StorageAPI.getCurrentUser());

    if (leadIdParam) {
      setSelectedLeadId(leadIdParam);
    }
  }, [leadIdParam]);

  // Set default template
  useEffect(() => {
    if (templates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(templates[0].id);
    }
  }, [templates, selectedTemplateId]);

  const handleGenerate = async () => {
    if (!selectedLeadId || !selectedTemplateId) return;

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500)); // AI Simulation Delay

    const lead = leads.find((l) => l.id === selectedLeadId);
    const template = templates.find((t) => t.id === selectedTemplateId);

    if (lead && template) {
      const ownerName = currentUser?.name || "James Carter";
      const placeholders: Record<string, string> = {
        company: lead.company,
        contactName: lead.contactName,
        country: lead.country,
        industry: lead.industry,
        ownerName: ownerName,
        date: new Date(Date.now() + 86400000).toLocaleDateString(),
        time: "10:00 AM"
      };

      let subResult = template.subject;
      let bodyResult = template.body;

      Object.entries(placeholders).forEach(([key, val]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        subResult = subResult.replace(regex, val);
        bodyResult = bodyResult.replace(regex, val);
      });

      setSubject(subResult);
      setBody(bodyResult);
    }
    setIsGenerating(false);
  };

  const handleSend = async () => {
    if (!subject || !body || !selectedLeadId) return;

    setIsSending(true);
    setStatusMsg("Sending email...");
    await new Promise((r) => setTimeout(r, 2000)); // SMTP Send simulation

    // Log the activity to Lead Timeline
    const newActivity: Activity = {
      id: "act_" + Date.now(),
      type: "email",
      title: `Sent Email: ${subject}`,
      description: body,
      leadId: selectedLeadId,
      userId: currentUser?.id || "u1",
      userName: currentUser?.name || "James Carter",
      createdAt: new Date().toISOString()
    };

    StorageAPI.addActivity(newActivity);

    setIsSending(false);
    setStatusMsg("Email Delivered Successfully! Activity logged.");
    setSubject("");
    setBody("");

    setTimeout(() => {
      setStatusMsg("");
    }, 4000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
      {/* Left panel: Config */}
      <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 p-6 shadow-card space-y-6">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand-500" />
          <h3 className="font-bold text-gray-900 dark:text-white">AI Generation Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Select Lead</label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl focus:outline-none text-sm"
            >
              <option value="">-- Choose a lead --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>{l.company} ({l.contactName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Template Theme</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl focus:outline-none text-sm"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {selectedLead && (
            <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-500/5 border border-brand-500/10 text-xs space-y-2">
              <span className="font-bold text-brand-700 dark:text-brand-400 block mb-1">Lead Context</span>
              <div className="flex justify-between"><span>Company:</span><span className="font-semibold text-gray-900 dark:text-white">{selectedLead.company}</span></div>
              <div className="flex justify-between"><span>Country:</span><span className="font-semibold text-gray-900 dark:text-white">{selectedLead.country}</span></div>
              <div className="flex justify-between"><span>Industry:</span><span className="font-semibold text-gray-900 dark:text-white">{selectedLead.industry}</span></div>
              <div className="flex justify-between"><span>Contact:</span><span className="font-semibold text-gray-900 dark:text-white">{selectedLead.contactName}</span></div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!selectedLeadId || !selectedTemplateId || isGenerating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl font-bold shadow-glow hover:scale-102 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate AI Email
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right panel: Editor / Preview */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card flex flex-col overflow-hidden">
        {/* Editor controls header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/8">
          <div className="flex gap-2">
            <button
              onClick={() => setMode("edit")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === "edit"
                  ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                mode === "preview"
                  ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!subject}
              className="p-2 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/8 rounded-xl transition-all disabled:opacity-40"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence mode="wait">
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2"
              >
                <Check className="w-4 h-4 shrink-0" />
                {statusMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {subject || body ? (
            mode === "edit" ? (
              <div className="space-y-4 h-full flex flex-col">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-1.5">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm font-semibold"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="block text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-wider mb-1.5">Message Body</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    className="w-full flex-1 p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm resize-none font-mono leading-relaxed"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Subject:</span>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{subject}</p>
                </div>
                <div className="border-t border-gray-100 dark:border-white/10 pt-4">
                  <p className="text-sm text-gray-700 dark:text-white/80 whitespace-pre-wrap leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-white/20 py-20">
              <Mail className="w-12 h-12 mb-3" />
              <p className="text-sm font-semibold">Generate an email to start writing</p>
              <p className="text-xs max-w-sm mt-1">Configure lead and theme on the left panel, and click Generate.</p>
            </div>
          )}
        </div>

        {/* Footer controls: Send email */}
        <div className="p-4 border-t border-gray-100 dark:border-white/8 bg-gray-50/50 dark:bg-white/3 flex justify-end">
          <button
            onClick={handleSend}
            disabled={!subject || !body || isSending}
            className="flex items-center justify-center gap-2 py-2.5 px-6 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { StorageAPI } from "@/lib/storage";
import { Lead } from "@/types";
import { formatDate, formatCurrency, getInitials, getStageColor } from "@/lib/utils";
import {
  Plus, Search, Filter, Download, Upload, ChevronDown, ChevronUp,
  MoreHorizontal, Eye, Edit, Trash2, Mail, Phone, Globe, Star
} from "lucide-react";

const STAGE_LABELS: Record<string, string> = {
  new: "New", contacted: "Contacted", qualified: "Qualified",
  proposal: "Proposal", negotiation: "Negotiation", won: "Won", lost: "Lost"
};

const STATUS_COLORS: Record<string, string> = {
  active: "badge-success", follow_up: "badge-warning", meeting_scheduled: "badge-info",
  converted: "badge-success", lost: "badge-danger", inactive: "badge-danger"
};

export function LeadsPageContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof Lead>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterStage, setFilterStage] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => { setLeads(StorageAPI.getLeads()); }, []);

  const filtered = useMemo(() => {
    let data = [...leads];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(l =>
        l.company.toLowerCase().includes(q) ||
        l.contactName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q)
      );
    }
    if (filterStage) data = data.filter(l => l.stage === filterStage);
    if (filterCountry) data = data.filter(l => l.country === filterCountry);
    if (filterIndustry) data = data.filter(l => l.industry === filterIndustry);
    data.sort((a, b) => {
      const av = a[sortKey] as string, bv = b[sortKey] as string;
      return sortDir === "asc" ? av > bv ? 1 : -1 : av < bv ? 1 : -1;
    });
    return data;
  }, [leads, search, filterStage, filterCountry, filterIndustry, sortKey, sortDir]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const sortBy = (key: keyof Lead) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const deleteLead = (id: string) => {
    StorageAPI.deleteLead(id);
    setLeads(StorageAPI.getLeads());
  };

  const SortIcon = ({ col }: { col: keyof Lead }) => (
    sortKey === col
      ? sortDir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
      : <ChevronDown className="w-3.5 h-3.5 opacity-30" />
  );

  const countries = [...new Set(leads.map(l => l.country))].sort();
  const industries = [...new Set(leads.map(l => l.industry))].sort();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Leads</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">{filtered.length} total leads</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowImportModal(true)} className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl hover:scale-105 transition-all shadow-glow">
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/30" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-400 text-sm"
          />
        </div>
        <select value={filterStage} onChange={e => { setFilterStage(e.target.value); setPage(1); }}
          className="px-3 py-2.5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl focus:outline-none text-sm">
          <option value="">All Stages</option>
          {Object.entries(STAGE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filterCountry} onChange={e => { setFilterCountry(e.target.value); setPage(1); }}
          className="px-3 py-2.5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl focus:outline-none text-sm">
          <option value="">All Countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterIndustry} onChange={e => { setFilterIndustry(e.target.value); setPage(1); }}
          className="px-3 py-2.5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl focus:outline-none text-sm">
          <option value="">All Industries</option>
          {industries.map(i => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/8">
                {[
                  { key: "company", label: "Company" },
                  { key: "contactName", label: "Contact" },
                  { key: "country", label: "Country" },
                  { key: "industry", label: "Industry" },
                  { key: "stage", label: "Stage" },
                  { key: "score", label: "Score" },
                  { key: "dealValue", label: "Deal Value" },
                  { key: "createdAt", label: "Created" },
                ].map(col => (
                  <th key={col.key} onClick={() => sortBy(col.key as keyof Lead)}
                    className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wide cursor-pointer hover:text-gray-700 dark:hover:text-white/70 transition-colors">
                    <div className="flex items-center gap-1">
                      {col.label} <SortIcon col={col.key as keyof Lead} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-white/40 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {paginated.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="table-row-hover group"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {lead.company[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.company}</p>
                        <p className="text-xs text-gray-400 dark:text-white/30 flex items-center gap-1">
                          <Globe className="w-3 h-3" />{lead.website || "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm text-gray-900 dark:text-white">{lead.contactName}</p>
                    <p className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1">
                      <Mail className="w-3 h-3" />{lead.email}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-white/70">{lead.country}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 dark:text-white/70">{lead.industry}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: getStageColor(lead.stage) + "20", color: getStageColor(lead.stage) }}>
                      {STAGE_LABELS[lead.stage]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full max-w-16">
                        <div className="h-full rounded-full" style={{ width: `${lead.score}%`, background: lead.score >= 80 ? "#10b981" : lead.score >= 60 ? "#f59e0b" : "#ef4444" }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{lead.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900 dark:text-white">
                    {lead.dealValue ? formatCurrency(lead.dealValue) : "—"}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-white/40">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/leads/${lead.id}`} className="p-1.5 text-gray-400 dark:text-white/40 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-gray-400 dark:text-white/40 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteLead(lead.id)} className="p-1.5 text-gray-400 dark:text-white/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-gray-100 dark:border-white/8">
          <p className="text-sm text-gray-500 dark:text-white/40">
            Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-lg font-medium transition-all ${p === page ? "bg-brand-600 text-white" : "text-gray-500 dark:text-white/50 hover:bg-gray-100 dark:hover:bg-white/8"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowImportModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-card-hover"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Import Leads</h3>
            <p className="text-sm text-gray-500 dark:text-white/50 mb-6">Upload a CSV or Excel file to import leads in bulk.</p>
            <div className="border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl p-8 text-center mb-4">
              <Upload className="w-10 h-10 text-gray-300 dark:text-white/20 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-white/40">Drag & drop your file here or</p>
              <button className="mt-2 text-sm text-brand-500 font-medium hover:text-brand-400">Browse files</button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowImportModal(false)} className="flex-1 py-2.5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
              <button className="flex-1 py-2.5 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold">Import (Demo)</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

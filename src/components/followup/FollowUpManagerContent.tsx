"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StorageAPI } from "@/lib/storage";
import { FollowUp } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Clock, CheckCircle, Calendar, Plus, Mail, RefreshCw, Sparkles, Check, Edit, Trash2, ChevronRight, CheckSquare, Square
} from "lucide-react";

export function FollowUpManagerContent() {
  const [followUps, setFollowUps] = useState<any[]>([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    setFollowUps(StorageAPI.getFollowUps());
  }, []);

  const handleMarkComplete = (id: string) => {
    const updated = followUps.map(f => {
      if (f.id === id) {
        return { ...f, status: "completed", completedDate: new Date().toISOString().split("T")[0] };
      }
      return f;
    });
    StorageAPI.saveFollowUps(updated);
    setFollowUps(updated);
  };

  const handleReschedule = (id: string) => {
    if (!newDate) return;
    const updated = followUps.map(f => {
      if (f.id === id) {
        return { ...f, status: "rescheduled", scheduledDate: newDate, notes: noteInput.trim() || f.notes };
      }
      return f;
    });
    StorageAPI.saveFollowUps(updated);
    setFollowUps(updated);
    setShowRescheduleModal(null);
    setNewDate("");
    setNoteInput("");
  };

  const getDayIcon = (type: string) => {
    switch (type) {
      case "introduction": return Mail;
      case "reminder": return Clock;
      case "case_study": return Sparkles;
      case "meeting": return Calendar;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Follow Up Manager</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">Keep track of your leads nurturing timeline</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left pane: Active Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-6 shadow-card space-y-6">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm border-b border-gray-100 dark:border-white/8 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-500" />
            Nurturing Schedule (Day 1 - Day 10)
          </h3>

          <div className="relative border-l border-gray-100 dark:border-white/8 pl-6 ml-3 space-y-6">
            {followUps.map((item, i) => {
              const Icon = getDayIcon(item.type);
              const isCompleted = item.status === "completed";
              const isRescheduled = item.status === "rescheduled";

              return (
                <div key={item.id} className="relative group">
                  {/* Timeline indicator node */}
                  <div className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center shrink-0 ${
                    isCompleted ? "bg-emerald-500" : isRescheduled ? "bg-amber-500" : "bg-brand-500 animate-pulse"
                  }`} />

                  <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-black text-brand-500 dark:text-brand-400 uppercase tracking-widest">
                          Day {item.day} · {item.type}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isCompleted ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                          isRescheduled ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                          "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                        {item.leadName} ({item.company})
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-white/40">
                        Scheduled: {formatDate(item.scheduledDate)} {item.completedDate && `· Completed: ${formatDate(item.completedDate)}`}
                      </p>
                      {item.notes && (
                        <p className="text-xs text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-500/5 p-2 rounded-lg border border-brand-500/10 italic">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>

                    {!isCompleted && (
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleMarkComplete(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-lg text-xs font-semibold hover:scale-105 transition-all shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Complete
                        </button>
                        <button
                          onClick={() => setShowRescheduleModal(item.id)}
                          className="px-3 py-1.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/8 rounded-lg text-xs font-semibold"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right pane: Stats & Helper */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-5 shadow-card">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4">Timeline Summary</h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-white/40">Total tasks</span>
                <span className="font-semibold text-gray-900 dark:text-white">{followUps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-white/40">Completed</span>
                <span className="font-semibold text-emerald-500">{followUps.filter(f => f.status === "completed").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-white/40">Pending</span>
                <span className="font-semibold text-brand-500">{followUps.filter(f => f.status === "pending" || f.status === "rescheduled").length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {showRescheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowRescheduleModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-card-hover space-y-4"
            >
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Reschedule Task</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase font-bold tracking-wider">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 uppercase font-bold tracking-wider">Reschedule Notes</label>
                <textarea
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  placeholder="Reason for reschedule..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl focus:outline-none focus:border-brand-500 text-sm resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowRescheduleModal(null)} className="flex-1 py-2 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white/70 rounded-xl text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={() => handleReschedule(showRescheduleModal)} className="flex-1 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-xs font-semibold shadow-glow">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

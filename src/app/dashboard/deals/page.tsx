"use client";
import { useState, useEffect } from "react";
import { StorageAPI } from "@/lib/storage";
import { Deal } from "@/types";
import { formatCurrency, getStageColor } from "@/lib/utils";
import { Plus, DollarSign, Calendar, ChevronRight } from "lucide-react";

const PIPELINE_STAGES = [
  { key: "prospecting", label: "Prospecting" },
  { key: "qualification", label: "Qualification" },
  { key: "proposal", label: "Proposal" },
  { key: "negotiation", label: "Negotiation" },
  { key: "closed_won", label: "Closed Won" },
  { key: "closed_lost", label: "Closed Lost" }
];

export default function DealsPipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    setDeals(StorageAPI.getDeals());
  }, []);

  return (
    <div className="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Deals Pipeline</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">Visual sales Kanban board</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow">
          <Plus className="w-4 h-4" />
          Add Deal
        </button>
      </div>

      {/* Kanban lanes container */}
      <div className="flex-1 overflow-x-auto flex gap-4 pb-4">
        {PIPELINE_STAGES.map(stage => {
          const stageDeals = deals.filter(d => d.stage === stage.key);
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div key={stage.key} className="w-72 shrink-0 bg-gray-100/50 dark:bg-gray-900/40 border border-gray-200/50 dark:border-white/5 rounded-2xl p-4 flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{stage.label}</h4>
                  <span className="text-xs text-gray-400">{stageDeals.length} Deals</span>
                </div>
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-0.5 rounded-full">
                  {formatCurrency(totalValue)}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {stageDeals.map(deal => (
                  <div key={deal.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/8 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-brand-500/20 transition-all cursor-pointer">
                    <h5 className="font-bold text-gray-900 dark:text-white text-xs line-clamp-2 leading-tight mb-2">{deal.title}</h5>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-2">
                      <span>{deal.company}</span>
                      <span className="font-semibold" style={{ color: getStageColor(deal.stage) }}>{deal.probability}%</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-50 dark:border-white/5 pt-2 mt-2">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{formatCurrency(deal.value)}</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {deal.expectedCloseDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

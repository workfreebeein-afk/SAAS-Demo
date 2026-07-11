"use client";
import { useState, useEffect } from "react";
import { StorageAPI } from "@/lib/storage";
import { Company } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Search, Plus, Globe, Users, TrendingUp } from "lucide-react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCompanies(StorageAPI.getCompanies());
  }, []);

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Companies</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">{filtered.length} total companies</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search companies..."
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl text-sm outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(company => (
          <div key={company.id} className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {company.name[0]}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{company.name}</h4>
                <p className="text-xs text-gray-400">{company.industry} · {company.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-white/5 pt-3 text-xs text-gray-600 dark:text-white/50">
              <div>
                <span className="text-[10px] uppercase text-gray-400 block mb-0.5">Revenue</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(company.revenue)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-gray-400 block mb-0.5">Employees</span>
                <span className="font-semibold text-gray-900 dark:text-white">{company.employees.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

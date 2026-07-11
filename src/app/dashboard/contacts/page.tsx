"use client";
import { useState, useEffect } from "react";
import { StorageAPI } from "@/lib/storage";
import { Contact } from "@/types";
import { formatDate } from "@/lib/utils";
import { Search, Plus, Mail, Phone, Globe, UserCheck } from "lucide-react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setContacts(StorageAPI.getContacts());
  }, []);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contacts</h2>
          <p className="text-sm text-gray-500 dark:text-white/40">{filtered.length} total contacts</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl text-sm font-semibold shadow-glow">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search contacts..."
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl text-sm outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(contact => (
          <div key={contact.id} className="bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-white/8 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {contact.name[0]}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{contact.name}</h4>
                <p className="text-xs text-gray-400 truncate">{contact.title} · {contact.company}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-gray-600 dark:text-white/60">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{contact.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{contact.phone || "—"}</div>
              <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" />{contact.country}</div>
              <div className="flex items-center gap-2"><UserCheck className="w-3.5 h-3.5" />Added {formatDate(contact.createdAt)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

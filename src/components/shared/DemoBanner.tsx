"use client";
import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DemoBanner() {
  const [visible, setVisible] = useState(true);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="demo-banner relative z-50 overflow-hidden"
        >
          <div className="flex items-center justify-center gap-3 px-4 py-2 text-white text-sm font-medium">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>
              <strong>DEMO VERSION</strong> — This application uses sample data for presentation purposes only.
              &nbsp;Login: <code className="bg-white/20 px-1 rounded text-xs">demo@jcscrm.com</code> /&nbsp;
              <code className="bg-white/20 px-1 rounded text-xs">demo123</code>
            </span>
            <button onClick={() => setVisible(false)} className="ml-2 p-0.5 hover:bg-white/20 rounded transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

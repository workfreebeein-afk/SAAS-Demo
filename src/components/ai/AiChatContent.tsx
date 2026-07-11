"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_CHAT_RESPONSES } from "@/lib/mock-db";
import { ChatMessage } from "@/types";
import { generateId } from "@/lib/utils";
import { Bot, Send, User, Sparkles, RefreshCw, Copy, ThumbsUp, Zap } from "lucide-react";

const QUICK_PROMPTS = [
  { label: "Price & Plans", key: "pricing", icon: "💰" },
  { label: "MOQ / Minimum", key: "moq", icon: "📦" },
  { label: "Product Catalogue", key: "catalogue", icon: "📋" },
  { label: "Schedule Meeting", key: "meeting", icon: "📅" },
  { label: "Generate Quotation", key: "quotation", icon: "📄" },
  { label: "Follow-up Help", key: "follow_up", icon: "🔔" },
];

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 bg-brand-500 rounded-full"
        />
      ))}
    </div>
  );
}

export function AiChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "👋 Hello! I'm your **JCS AI Sales Assistant**. I'm here to help you with lead intelligence, email generation, pricing queries, meeting scheduling, and more.\n\nWhat can I help you with today?",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getAiResponse = (userMsg: string): string => {
    const msg = userMsg.toLowerCase();
    if (msg.includes("price") || msg.includes("cost") || msg.includes("plan")) return AI_CHAT_RESPONSES.pricing[Math.floor(Math.random() * AI_CHAT_RESPONSES.pricing.length)];
    if (msg.includes("moq") || msg.includes("minimum") || msg.includes("order")) return AI_CHAT_RESPONSES.moq[Math.floor(Math.random() * AI_CHAT_RESPONSES.moq.length)];
    if (msg.includes("catalogue") || msg.includes("catalog") || msg.includes("product")) return AI_CHAT_RESPONSES.catalogue[0];
    if (msg.includes("meeting") || msg.includes("demo") || msg.includes("schedule") || msg.includes("call")) return AI_CHAT_RESPONSES.meeting[Math.floor(Math.random() * AI_CHAT_RESPONSES.meeting.length)];
    if (msg.includes("quote") || msg.includes("quotation") || msg.includes("proposal")) return AI_CHAT_RESPONSES.quotation[0];
    if (msg.includes("follow") || msg.includes("contact") || msg.includes("reach")) return AI_CHAT_RESPONSES.follow_up[0];
    return AI_CHAT_RESPONSES.default[Math.floor(Math.random() * AI_CHAT_RESPONSES.default.length)];
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = { id: generateId(), role: "user", content: msg, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const response = getAiResponse(msg);
    setIsTyping(false);
    const aiMsg: ChatMessage = { id: generateId(), role: "assistant", content: response, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, aiMsg]);
  };

  const copyMessage = (content: string) => navigator.clipboard.writeText(content);

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: boldFormatted }} />;
    });
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-12rem)]">
      {/* Main chat */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-white/8 shadow-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-white/8 bg-gradient-to-r from-brand-600/5 to-purple-600/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">JCS AI Sales Assistant</h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Online · Powered by JCS AI Engine
            </div>
          </div>
          <button onClick={() => setMessages([{
            id: "init", role: "assistant",
            content: "Chat cleared! How can I assist you?",
            timestamp: new Date().toISOString()
          }])} className="ml-auto p-2 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/8 rounded-xl transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-brand-600 to-purple-700"
                    : "bg-gray-200 dark:bg-white/15"
                }`}>
                  {msg.role === "assistant"
                    ? <Bot className="w-4 h-4 text-white" />
                    : <User className="w-4 h-4 text-gray-600 dark:text-white" />
                  }
                </div>

                {/* Bubble */}
                <div className={`group max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-brand-600 to-purple-700 text-white rounded-tr-none"
                      : "bg-gray-50 dark:bg-white/8 text-gray-700 dark:text-white/80 rounded-tl-none border border-gray-100 dark:border-white/8"
                  }`}>
                    {formatContent(msg.content)}
                  </div>
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => copyMessage(msg.content)} className="p-1 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 rounded transition-colors">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 text-gray-400 dark:text-white/30 hover:text-emerald-500 rounded transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-50 dark:bg-white/8 rounded-2xl rounded-tl-none border border-gray-100 dark:border-white/8">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-white/8">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask me anything about your leads, deals, pricing..."
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 rounded-xl focus:outline-none focus:border-brand-400 text-sm"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-brand-600 to-purple-700 text-white rounded-xl hover:scale-105 transition-all shadow-glow disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar: Quick prompts */}
      <div className="w-64 shrink-0 space-y-4 hidden lg:block">
        <div className="bg-white dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-100 dark:border-white/8 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Quick Prompts</h3>
          </div>
          <div className="space-y-2">
            {QUICK_PROMPTS.map(p => (
              <button
                key={p.key}
                onClick={() => sendMessage(p.label)}
                className="w-full flex items-center gap-2.5 p-3 rounded-xl text-left text-sm text-gray-600 dark:text-white/60 hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-700 dark:hover:text-brand-400 border border-gray-100 dark:border-white/8 hover:border-brand-200 dark:hover:border-brand-500/30 transition-all"
              >
                <span className="text-base">{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-600/10 to-purple-700/10 rounded-2xl p-5 border border-brand-500/20">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-purple-700 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">AI Model</h4>
          <p className="text-xs text-gray-500 dark:text-white/50 mb-3">JCS GPT-4o Ultra</p>
          <div className="space-y-1.5 text-xs text-gray-600 dark:text-white/50">
            <div className="flex justify-between"><span>Requests today</span><span className="font-semibold text-gray-900 dark:text-white">47</span></div>
            <div className="flex justify-between"><span>Avg. response</span><span className="font-semibold text-gray-900 dark:text-white">1.4s</span></div>
            <div className="flex justify-between"><span>Satisfaction</span><span className="font-semibold text-emerald-500">98%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

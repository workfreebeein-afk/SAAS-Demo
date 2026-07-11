import type { Metadata } from "next";
import { AiChatContent } from "@/components/ai/AiChatContent";
export const metadata: Metadata = { title: "AI Chat" };
export default function AiChatPage() { return <AiChatContent />; }

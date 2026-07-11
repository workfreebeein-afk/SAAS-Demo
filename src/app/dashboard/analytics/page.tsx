import type { Metadata } from "next";
import { AnalyticsContent } from "@/components/analytics/AnalyticsContent";
export const metadata: Metadata = { title: "Analytics" };
export default function AnalyticsPage() { return <AnalyticsContent />; }

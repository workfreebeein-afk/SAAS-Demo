import type { Metadata } from "next";
import { LeadsPageContent } from "@/components/crm/LeadsPageContent";
export const metadata: Metadata = { title: "Leads" };
export default function LeadsPage() { return <LeadsPageContent />; }

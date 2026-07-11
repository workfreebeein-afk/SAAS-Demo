import type { Metadata } from "next";
import { LeadDetailContent } from "@/components/crm/LeadDetailContent";

export const metadata: Metadata = {
  title: "Lead Detail",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <LeadDetailContent id={id} />;
}

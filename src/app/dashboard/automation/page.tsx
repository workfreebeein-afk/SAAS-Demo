import type { Metadata } from "next";
import { AutomationWorkflowContent } from "@/components/automation/AutomationWorkflowContent";

export const metadata: Metadata = {
  title: "Automation Builder",
};

export default function AutomationPage() {
  return <AutomationWorkflowContent />;
}

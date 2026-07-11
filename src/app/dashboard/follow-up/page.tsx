import type { Metadata } from "next";
import { FollowUpManagerContent } from "@/components/followup/FollowUpManagerContent";

export const metadata: Metadata = {
  title: "Follow Up Manager",
};

export default function FollowUpPage() {
  return <FollowUpManagerContent />;
}

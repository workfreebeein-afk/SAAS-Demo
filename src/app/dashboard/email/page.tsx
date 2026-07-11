import type { Metadata } from "next";
import { AiEmailGeneratorContent } from "@/components/ai/AiEmailGeneratorContent";

export const metadata: Metadata = {
  title: "AI Email Generator",
};

export default function EmailPage() {
  return <AiEmailGeneratorContent />;
}

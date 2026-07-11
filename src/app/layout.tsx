import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryProvider } from "@/components/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "JCS AI Sales CRM — Enterprise Sales Automation Platform", template: "%s | JCS AI CRM" },
  description: "JCS AI Sales CRM is a world-class enterprise SaaS platform for AI-powered sales automation, lead management, and revenue acceleration.",
  keywords: ["CRM", "Sales Automation", "AI Sales", "Lead Management", "Enterprise SaaS", "JCS CRM"],
  authors: [{ name: "JCS AI Solutions" }],
  creator: "JCS AI Solutions",
  metadataBase: new URL("https://jcscrm.com"),
  openGraph: {
    title: "JCS AI Sales CRM",
    description: "Generate leads. Automate follow-ups. Close more deals.",
    type: "website",
    locale: "en_US",
    url: "https://jcscrm.com",
    siteName: "JCS AI CRM",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JCS AI Sales CRM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JCS AI Sales CRM",
    description: "Generate leads. Automate follow-ups. Close more deals.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0F1629" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "badge-success",
    inactive: "badge-danger",
    follow_up: "badge-warning",
    meeting_scheduled: "badge-info",
    converted: "badge-success",
    lost: "badge-danger",
    new: "badge-info",
    contacted: "badge-purple",
    qualified: "badge-info",
    proposal: "badge-warning",
    negotiation: "badge-purple",
    won: "badge-success",
    pending: "badge-warning",
    completed: "badge-success",
    open: "badge-success",
    closed: "badge-danger",
    paused: "badge-warning",
  };
  return colors[status] || "badge-info";
}

export function getStageColor(stage: string): string {
  const colors: Record<string, string> = {
    new: "#3b82f6",
    contacted: "#8b5cf6",
    qualified: "#06b6d4",
    proposal: "#f59e0b",
    negotiation: "#f97316",
    won: "#10b981",
    lost: "#ef4444",
    prospecting: "#3b82f6",
    qualification: "#8b5cf6",
    closed_won: "#10b981",
    closed_lost: "#ef4444",
  };
  return colors[stage] || "#6b7280";
}

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 100;
  return Math.round(((current - previous) / previous) * 100);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Canada",
  "Australia", "India", "UAE", "Singapore", "Japan", "Brazil", "Mexico",
  "Netherlands", "Sweden", "Switzerland", "Italy", "Spain", "South Korea",
  "Saudi Arabia", "South Africa"
];

export const INDUSTRIES = [
  "Technology", "Finance", "Healthcare", "Manufacturing", "Retail",
  "Real Estate", "Education", "Logistics", "Energy", "Consulting",
  "Media", "Automotive", "Food & Beverage", "Pharmaceuticals", "Telecommunications"
];

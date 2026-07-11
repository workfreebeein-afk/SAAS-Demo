// Core type definitions for JCS AI Sales CRM

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales_rep';
  avatar?: string;
  phone?: string;
  department?: string;
  status: 'active' | 'suspended' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  permissions: string[];
}

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  pipeline: string;
  stage: LeadStage;
  status: LeadStatus;
  tags: string[];
  revenue?: number;
  employees?: number;
  website?: string;
  source: LeadSource;
  assignedTo: string;
  createdAt: string;
  lastContact?: string;
  nextFollowUp?: string;
  notes?: string;
  score: number;
  dealValue?: number;
}

export type LeadStage = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiation'
  | 'won'
  | 'lost';

export type LeadStatus = 
  | 'active'
  | 'inactive'
  | 'follow_up'
  | 'meeting_scheduled'
  | 'converted'
  | 'lost';

export type LeadSource =
  | 'website'
  | 'referral'
  | 'linkedin'
  | 'cold_email'
  | 'trade_show'
  | 'inbound'
  | 'partner'
  | 'other';

export interface Company {
  id: string;
  name: string;
  industry: string;
  country: string;
  website?: string;
  phone?: string;
  email?: string;
  employees: number;
  revenue: number;
  status: 'active' | 'inactive' | 'prospect';
  tags: string[];
  assignedTo: string;
  createdAt: string;
  contacts: string[];
  deals: string[];
  notes?: string;
  logo?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  department?: string;
  companyId: string;
  company: string;
  country: string;
  status: 'active' | 'inactive';
  tags: string[];
  assignedTo: string;
  createdAt: string;
  lastContact?: string;
  notes?: string;
  linkedin?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  currency: string;
  stage: DealStage;
  probability: number;
  companyId: string;
  company: string;
  contactId?: string;
  contactName?: string;
  assignedTo: string;
  expectedCloseDate: string;
  createdAt: string;
  lastActivity?: string;
  notes?: string;
  tags: string[];
}

export type DealStage =
  | 'prospecting'
  | 'qualification'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task' | 'deal_updated' | 'stage_changed';
  title: string;
  description: string;
  leadId?: string;
  companyId?: string;
  contactId?: string;
  userId: string;
  userName: string;
  createdAt: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  trigger: string;
  nodes: WorkflowNode[];
  createdAt: string;
  updatedAt: string;
  runsCount: number;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'wait' | 'end';
  label: string;
  description?: string;
  config?: Record<string, string | number | boolean>;
  position: { x: number; y: number };
}

export interface FollowUp {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  day: number;
  type: 'introduction' | 'reminder' | 'case_study' | 'meeting' | 'final';
  subject: string;
  body: string;
  status: 'pending' | 'completed' | 'skipped' | 'rescheduled';
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
}

export interface AnalyticsData {
  monthlyRevenue: { month: string; revenue: number; target: number }[];
  leadSources: { name: string; value: number; color: string }[];
  countrywiseLeads: { country: string; leads: number; revenue: number }[];
  salesFunnel: { stage: string; count: number; value: number }[];
  emailMetrics: { month: string; sent: number; opened: number; replied: number }[];
  conversionRate: { month: string; rate: number }[];
  industryBreakdown: { industry: string; leads: number; deals: number }[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed' | 'paused';
  applicants: number;
  createdAt: string;
  closingDate?: string;
}

export interface Notification {
  id: string;
  type: 'lead' | 'deal' | 'email' | 'meeting' | 'system' | 'ai';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface DashboardStats {
  todayLeads: number;
  totalLeads: number;
  emailsSent: number;
  meetingsBooked: number;
  openDeals: number;
  revenue: number;
  conversionRate: number;
  pendingFollowUps: number;
  changes: {
    todayLeads: number;
    totalLeads: number;
    emailsSent: number;
    meetingsBooked: number;
    openDeals: number;
    revenue: number;
    conversionRate: number;
    pendingFollowUps: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isTyping?: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  url: string;
  folder: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  robots: string;
  canonical: string;
  analyticsId: string;
  googleVerification: string;
  bingVerification: string;
}

export interface AppSettings {
  company: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
    logo?: string;
    currency: string;
    timezone: string;
  };
  smtp: {
    host: string;
    port: number;
    username: string;
    password: string;
    fromEmail: string;
    fromName: string;
  };
  whatsapp: {
    apiKey: string;
    phoneId: string;
    webhookUrl: string;
  };
  ai: {
    provider: string;
    apiKey: string;
    model: string;
    maxTokens: number;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    leadAlerts: boolean;
    dealAlerts: boolean;
  };
}

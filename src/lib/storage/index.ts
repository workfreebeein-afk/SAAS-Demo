import { MOCK_USERS, MOCK_COMPANIES, MOCK_CONTACTS, MOCK_LEADS, MOCK_DEALS, MOCK_ACTIVITIES, MOCK_EMAIL_TEMPLATES, MOCK_NOTIFICATIONS, MOCK_JOBS, MOCK_DASHBOARD_STATS } from "../mock-db";
import { Lead, Company, Contact, Deal, User, Activity, EmailTemplate, Job, Notification, AppSettings } from "@/types";

const STORAGE_KEYS = {
  USERS: "jcs_users",
  COMPANIES: "jcs_companies",
  CONTACTS: "jcs_contacts",
  LEADS: "jcs_leads",
  DEALS: "jcs_deals",
  ACTIVITIES: "jcs_activities",
  EMAIL_TEMPLATES: "jcs_email_templates",
  NOTIFICATIONS: "jcs_notifications",
  JOBS: "jcs_jobs",
  STATS: "jcs_stats",
  SETTINGS: "jcs_settings",
  CURRENT_USER: "jcs_current_user",
  WORKFLOWS: "jcs_workflows",
  FOLLOW_UPS: "jcs_follow_ups",
  MEDIA: "jcs_media"
};

// Initialize localStorage with mock data if not present
export function initializeStorage() {
  if (typeof window === "undefined") return;

  const initKey = (key: string, defaultData: any) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(defaultData));
    }
  };

  initKey(STORAGE_KEYS.USERS, MOCK_USERS);
  initKey(STORAGE_KEYS.COMPANIES, MOCK_COMPANIES);
  initKey(STORAGE_KEYS.CONTACTS, MOCK_CONTACTS);
  initKey(STORAGE_KEYS.LEADS, MOCK_LEADS);
  initKey(STORAGE_KEYS.DEALS, MOCK_DEALS);
  initKey(STORAGE_KEYS.ACTIVITIES, MOCK_ACTIVITIES);
  initKey(STORAGE_KEYS.EMAIL_TEMPLATES, MOCK_EMAIL_TEMPLATES);
  initKey(STORAGE_KEYS.NOTIFICATIONS, MOCK_NOTIFICATIONS);
  initKey(STORAGE_KEYS.JOBS, MOCK_JOBS);
  initKey(STORAGE_KEYS.STATS, MOCK_DASHBOARD_STATS);

  // Default app settings
  const defaultSettings: AppSettings = {
    company: {
      name: "JCS AI CRM",
      tagline: "World-Class Enterprise Sales Automation",
      email: "info@jcscrm.com",
      phone: "+1 555-0100",
      address: "100 AI Way, San Francisco, CA 94107",
      currency: "USD",
      timezone: "PST"
    },
    smtp: {
      host: "smtp.jcscrm.com",
      port: 587,
      username: "smtp_demo",
      password: "••••••••",
      fromEmail: "noreply@jcscrm.com",
      fromName: "JCS Sales Automation"
    },
    whatsapp: {
      apiKey: "wa_live_demo_key_12345",
      phoneId: "1098234723",
      webhookUrl: "https://jcscrm.com/api/webhooks/whatsapp"
    },
    ai: {
      provider: "JCS AI Engine",
      apiKey: "jcs_ai_demo_key_abcdef",
      model: "jcs-gpt-4o-ultra",
      maxTokens: 2048
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      leadAlerts: true,
      dealAlerts: true
    }
  };
  initKey(STORAGE_KEYS.SETTINGS, defaultSettings);

  // Default Workflows
  const defaultWorkflows = [
    {
      id: "w1",
      name: "Inbound Lead Nurturing",
      description: "Triggered when a lead is created via website form.",
      status: "active",
      runsCount: 142,
      nodes: [
        { id: "n-trig", type: "trigger", label: "Lead Created", description: "Source: Website Form", position: { x: 250, y: 50 } },
        { id: "n-email1", type: "action", label: "Generate AI Email", description: "Template: Introduction Outreach", position: { x: 250, y: 150 } },
        { id: "n-send1", type: "action", label: "Send Email", description: "JCS SMTP", position: { x: 250, y: 250 } },
        { id: "n-wait1", type: "wait", label: "3 Days Wait", description: "Pause execution", position: { x: 250, y: 350 } },
        { id: "n-cond1", type: "condition", label: "Has Replied?", description: "Check reply status", position: { x: 250, y: 450 } }
      ],
      createdAt: "2026-05-01",
      updatedAt: "2026-07-01"
    },
    {
      id: "w2",
      name: "Re-engagement Sequence",
      description: "Re-engage dormant leads that went cold.",
      status: "inactive",
      runsCount: 23,
      nodes: [
        { id: "n-trig", type: "trigger", label: "Lead Inactive (30 days)", position: { x: 250, y: 50 } },
        { id: "n-email1", type: "action", label: "Generate Case Study Email", position: { x: 250, y: 170 } },
        { id: "n-send1", type: "action", label: "Send Email", position: { x: 250, y: 290 } }
      ],
      createdAt: "2026-06-10",
      updatedAt: "2026-06-15"
    }
  ];
  initKey(STORAGE_KEYS.WORKFLOWS, defaultWorkflows);

  // Default Follow Ups
  const defaultFollowUps = [
    { id: "f1", leadId: "l1", leadName: "Alexandra Turner", company: "TechCorp Global", day: 1, type: "introduction", subject: "Introducing JCS AI Sales CRM", body: "...", status: "completed", scheduledDate: "2026-07-08", completedDate: "2026-07-08", notes: "Intro email sent successfully." },
    { id: "f2", leadId: "l1", leadName: "Alexandra Turner", company: "TechCorp Global", day: 3, type: "reminder", subject: "Quick follow up on JCS AI Sales CRM", body: "...", status: "pending", scheduledDate: "2026-07-11", notes: "Due today" },
    { id: "f3", leadId: "l1", leadName: "Alexandra Turner", company: "TechCorp Global", day: 5, type: "case_study", subject: "How JCS AI helped TechCorp's peer scale sales", body: "...", status: "pending", scheduledDate: "2026-07-13" },
    { id: "f4", leadId: "l2", leadName: "Sophie Williams", company: "FinanceHub Ltd", day: 1, type: "introduction", subject: "Automation solutions for FinanceHub", body: "...", status: "completed", scheduledDate: "2026-07-03", completedDate: "2026-07-03" },
    { id: "f5", leadId: "l2", leadName: "Sophie Williams", company: "FinanceHub Ltd", day: 3, type: "reminder", subject: "Follow up: Automation solutions for FinanceHub", body: "...", status: "pending", scheduledDate: "2026-07-12" },
    { id: "f6", leadId: "l3", leadName: "Klaus Müller", company: "MedPlus Healthcare", day: 1, type: "introduction", subject: "Digital Transformation at MedPlus", body: "...", status: "completed", scheduledDate: "2026-07-01", completedDate: "2026-07-01" },
    { id: "f7", leadId: "l3", leadName: "Klaus Müller", company: "MedPlus Healthcare", day: 3, type: "reminder", subject: "Let's connect: Digital transformation demo", body: "...", status: "completed", scheduledDate: "2026-07-05", completedDate: "2026-07-05" },
    { id: "f8", leadId: "l3", leadName: "Klaus Müller", company: "MedPlus Healthcare", day: 5, type: "meeting", subject: "Demo scheduled", body: "...", status: "pending", scheduledDate: "2026-07-13" }
  ];
  initKey(STORAGE_KEYS.FOLLOW_UPS, defaultFollowUps);

  // Default Media Library Files
  const defaultMedia = [
    { id: "m1", name: "jcs_logo_dark.png", type: "image", size: 45000, url: "/logo.png", folder: "Logos", uploadedAt: "2026-07-01", uploadedBy: "James Carter" },
    { id: "m2", name: "enterprise_pitch_deck.pdf", type: "document", size: 2400000, url: "/documents/pitch.pdf", folder: "Sales Decks", uploadedAt: "2026-07-05", uploadedBy: "Sarah Mitchell" },
    { id: "m3", name: "product_demo_v2.mp4", type: "video", size: 18500000, url: "/videos/demo.mp4", folder: "Videos", uploadedAt: "2026-07-08", uploadedBy: "Michael Chen" }
  ];
  initKey(STORAGE_KEYS.MEDIA, defaultMedia);
}

// Storage helpers
export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Entity CRUD wrappers
export const StorageAPI = {
  // Leads
  getLeads: () => getFromStorage<Lead[]>(STORAGE_KEYS.LEADS) || [],
  saveLeads: (leads: Lead[]) => saveToStorage(STORAGE_KEYS.LEADS, leads),
  addLead: (lead: Lead) => {
    const leads = StorageAPI.getLeads();
    leads.unshift(lead);
    StorageAPI.saveLeads(leads);
    return lead;
  },
  updateLead: (id: string, updatedLead: Partial<Lead>) => {
    const leads = StorageAPI.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updatedLead } as Lead;
      StorageAPI.saveLeads(leads);
      return leads[index];
    }
    return null;
  },
  deleteLead: (id: string) => {
    const leads = StorageAPI.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    StorageAPI.saveLeads(filtered);
  },

  // Companies
  getCompanies: () => getFromStorage<Company[]>(STORAGE_KEYS.COMPANIES) || [],
  saveCompanies: (companies: Company[]) => saveToStorage(STORAGE_KEYS.COMPANIES, companies),
  addCompany: (company: Company) => {
    const companies = StorageAPI.getCompanies();
    companies.unshift(company);
    StorageAPI.saveCompanies(companies);
    return company;
  },
  updateCompany: (id: string, updated: Partial<Company>) => {
    const companies = StorageAPI.getCompanies();
    const index = companies.findIndex(c => c.id === id);
    if (index !== -1) {
      companies[index] = { ...companies[index], ...updated } as Company;
      StorageAPI.saveCompanies(companies);
      return companies[index];
    }
    return null;
  },
  deleteCompany: (id: string) => {
    const companies = StorageAPI.getCompanies();
    const filtered = companies.filter(c => c.id !== id);
    StorageAPI.saveCompanies(filtered);
  },

  // Contacts
  getContacts: () => getFromStorage<Contact[]>(STORAGE_KEYS.CONTACTS) || [],
  saveContacts: (contacts: Contact[]) => saveToStorage(STORAGE_KEYS.CONTACTS, contacts),
  addContact: (contact: Contact) => {
    const contacts = StorageAPI.getContacts();
    contacts.unshift(contact);
    StorageAPI.saveContacts(contacts);
    return contact;
  },
  updateContact: (id: string, updated: Partial<Contact>) => {
    const contacts = StorageAPI.getContacts();
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updated } as Contact;
      StorageAPI.saveContacts(contacts);
      return contacts[index];
    }
    return null;
  },
  deleteContact: (id: string) => {
    const contacts = StorageAPI.getContacts();
    const filtered = contacts.filter(c => c.id !== id);
    StorageAPI.saveContacts(filtered);
  },

  // Deals
  getDeals: () => getFromStorage<Deal[]>(STORAGE_KEYS.DEALS) || [],
  saveDeals: (deals: Deal[]) => saveToStorage(STORAGE_KEYS.DEALS, deals),
  addDeal: (deal: Deal) => {
    const deals = StorageAPI.getDeals();
    deals.unshift(deal);
    StorageAPI.saveDeals(deals);
    return deal;
  },
  updateDeal: (id: string, updated: Partial<Deal>) => {
    const deals = StorageAPI.getDeals();
    const index = deals.findIndex(d => d.id === id);
    if (index !== -1) {
      deals[index] = { ...deals[index], ...updated } as Deal;
      StorageAPI.saveDeals(deals);
      return deals[index];
    }
    return null;
  },
  deleteDeal: (id: string) => {
    const deals = StorageAPI.getDeals();
    const filtered = deals.filter(d => d.id !== id);
    StorageAPI.saveDeals(filtered);
  },

  // Users
  getUsers: () => getFromStorage<User[]>(STORAGE_KEYS.USERS) || [],
  saveUsers: (users: User[]) => saveToStorage(STORAGE_KEYS.USERS, users),
  addUser: (user: User) => {
    const users = StorageAPI.getUsers();
    users.push(user);
    StorageAPI.saveUsers(users);
    return user;
  },
  updateUser: (id: string, updated: Partial<User>) => {
    const users = StorageAPI.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updated } as User;
      StorageAPI.saveUsers(users);
      return users[index];
    }
    return null;
  },
  deleteUser: (id: string) => {
    const users = StorageAPI.getUsers();
    const filtered = users.filter(u => u.id !== id);
    StorageAPI.saveUsers(filtered);
  },

  // Activities
  getActivities: () => getFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES) || [],
  addActivity: (activity: Activity) => {
    const activities = StorageAPI.getActivities();
    activities.unshift(activity);
    saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
    return activity;
  },

  // Email Templates
  getEmailTemplates: () => getFromStorage<EmailTemplate[]>(STORAGE_KEYS.EMAIL_TEMPLATES) || [],
  saveEmailTemplates: (templates: EmailTemplate[]) => saveToStorage(STORAGE_KEYS.EMAIL_TEMPLATES, templates),

  // Workflows
  getWorkflows: () => getFromStorage<any[]>(STORAGE_KEYS.WORKFLOWS) || [],
  saveWorkflows: (workflows: any[]) => saveToStorage(STORAGE_KEYS.WORKFLOWS, workflows),

  // Follow-ups
  getFollowUps: () => getFromStorage<any[]>(STORAGE_KEYS.FOLLOW_UPS) || [],
  saveFollowUps: (followUps: any[]) => saveToStorage(STORAGE_KEYS.FOLLOW_UPS, followUps),

  // Notifications
  getNotifications: () => getFromStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [],
  saveNotifications: (notifs: Notification[]) => saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifs),

  // Jobs
  getJobs: () => getFromStorage<Job[]>(STORAGE_KEYS.JOBS) || [],
  saveJobs: (jobs: Job[]) => saveToStorage(STORAGE_KEYS.JOBS, jobs),

  // Settings
  getSettings: () => getFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS),
  saveSettings: (settings: AppSettings) => saveToStorage(STORAGE_KEYS.SETTINGS, settings),

  // Current Auth User
  getCurrentUser: () => getFromStorage<User>(STORAGE_KEYS.CURRENT_USER),
  setCurrentUser: (user: User | null) => saveToStorage(STORAGE_KEYS.CURRENT_USER, user),

  // Media
  getMedia: () => getFromStorage<any[]>(STORAGE_KEYS.MEDIA) || [],
  saveMedia: (media: any[]) => saveToStorage(STORAGE_KEYS.MEDIA, media),

  // Stats
  getStats: () => getFromStorage<any>(STORAGE_KEYS.STATS),
  saveStats: (stats: any) => saveToStorage(STORAGE_KEYS.STATS, stats)
};

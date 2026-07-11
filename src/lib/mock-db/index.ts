import { Lead, Company, Contact, Deal, User, Activity, EmailTemplate, Job, Notification, AnalyticsData } from "@/types";

// ─── USERS ────────────────────────────────────────────────────────────────────
export const MOCK_USERS: User[] = [
  { id: "u1", name: "Rajesh Kumar", email: "demo@jcscrm.com", role: "admin", avatar: "", phone: "+91 98100 00001", department: "Executive", status: "active", createdAt: "2024-01-01", lastLogin: "2026-07-11", permissions: ["all"] },
  { id: "u2", name: "Priya Sharma", email: "priya@jcscrm.com", role: "manager", avatar: "", phone: "+91 98100 00002", department: "Sales", status: "active", createdAt: "2024-02-15", lastLogin: "2026-07-10", permissions: ["crm", "analytics", "email"] },
  { id: "u3", name: "Arjun Mehta", email: "arjun@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00003", department: "Sales", status: "active", createdAt: "2024-03-01", lastLogin: "2026-07-11", permissions: ["crm", "email"] },
  { id: "u4", name: "Divya Nair", email: "divya@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00004", department: "Sales", status: "active", createdAt: "2024-03-15", lastLogin: "2026-07-09", permissions: ["crm", "email"] },
  { id: "u5", name: "Vikram Singh", email: "vikram@jcscrm.com", role: "manager", avatar: "", phone: "+91 98100 00005", department: "Marketing", status: "active", createdAt: "2024-04-01", lastLogin: "2026-07-10", permissions: ["crm", "analytics", "email", "automation"] },
  { id: "u6", name: "Anita Reddy", email: "anita@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00006", department: "Sales", status: "inactive", createdAt: "2024-04-15", lastLogin: "2026-06-30", permissions: ["crm"] },
  { id: "u7", name: "Suresh Iyer", email: "suresh@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00007", department: "Sales", status: "active", createdAt: "2024-05-01", lastLogin: "2026-07-11", permissions: ["crm", "email"] },
  { id: "u8", name: "Kavitha Pillai", email: "kavitha@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00008", department: "Enterprise", status: "active", createdAt: "2024-05-15", lastLogin: "2026-07-08", permissions: ["crm", "email", "analytics"] },
  { id: "u9", name: "Rohit Gupta", email: "rohit@jcscrm.com", role: "sales_rep", avatar: "", phone: "+91 98100 00009", department: "SMB", status: "suspended", createdAt: "2024-06-01", lastLogin: "2026-06-15", permissions: ["crm"] },
  { id: "u10", name: "Meera Bhat", email: "meera@jcscrm.com", role: "manager", avatar: "", phone: "+91 98100 00010", department: "Operations", status: "active", createdAt: "2024-06-15", lastLogin: "2026-07-10", permissions: ["crm", "analytics", "admin"] },
];

// ─── COMPANIES ─────────────────────────────────────────────────────────────────
export const MOCK_COMPANIES: Company[] = [
  { id: "c1", name: "Tata Consultancy Services", industry: "Technology", country: "India", website: "tcs.com", phone: "+91 22 6778 9000", email: "info@tcs.com", employees: 614000, revenue: 2250000000, status: "active", tags: ["enterprise", "it-services"], assignedTo: "u2", createdAt: "2024-01-15", contacts: ["ct1","ct2"], deals: ["d1"], notes: "Top priority enterprise account." },
  { id: "c2", name: "Infosys Limited", industry: "Technology", country: "India", website: "infosys.com", phone: "+91 80 2852 0261", email: "contact@infosys.com", employees: 343234, revenue: 1470000000, status: "active", tags: ["it", "consulting"], assignedTo: "u3", createdAt: "2024-02-01", contacts: ["ct3"], deals: ["d2"], notes: "" },
  { id: "c3", name: "Apollo Hospitals", industry: "Healthcare", country: "India", website: "apollohospitals.com", phone: "+91 44 2829 0200", email: "info@apollohospitals.com", employees: 73000, revenue: 162000000, status: "active", tags: ["healthcare", "b2b"], assignedTo: "u4", createdAt: "2024-02-15", contacts: ["ct4"], deals: ["d3"], notes: "Interest in automation module." },
  { id: "c4", name: "Reliance Retail", industry: "Retail", country: "India", website: "relianceretail.com", phone: "+91 22 4477 0000", email: "sales@relianceretail.com", employees: 400000, revenue: 2600000000, status: "active", tags: ["retail", "omnichannel"], assignedTo: "u3", createdAt: "2024-03-01", contacts: ["ct5"], deals: ["d4"], notes: "" },
  { id: "c5", name: "Larsen & Toubro", industry: "Manufacturing", country: "India", website: "larsentoubro.com", phone: "+91 22 6752 5656", email: "info@larsentoubro.com", employees: 50000, revenue: 800000000, status: "prospect", tags: ["construction", "b2b"], assignedTo: "u7", createdAt: "2024-03-15", contacts: ["ct6"], deals: ["d5"], notes: "" },
  { id: "c6", name: "Zepto India", industry: "Technology", country: "India", website: "zeptonow.com", phone: "+91 22 4890 1234", email: "hello@zeptonow.com", employees: 3000, revenue: 75000000, status: "active", tags: ["startup", "qcommerce"], assignedTo: "u2", createdAt: "2024-04-01", contacts: ["ct7"], deals: ["d6"], notes: "Very interested in AI features." },
  { id: "c7", name: "Mahindra Logistics", industry: "Logistics", country: "India", website: "mahindralogistics.com", phone: "+91 22 2490 1441", email: "info@mahindralogistics.com", employees: 12000, revenue: 420000000, status: "active", tags: ["logistics", "supply-chain"], assignedTo: "u8", createdAt: "2024-04-15", contacts: ["ct8"], deals: ["d7"], notes: "" },
  { id: "c8", name: "BYJU'S Learning", industry: "Education", country: "India", website: "byjus.com", phone: "+91 80 4726 1111", email: "sales@byjus.com", employees: 50000, revenue: 96000000, status: "active", tags: ["edtech", "saas"], assignedTo: "u4", createdAt: "2024-05-01", contacts: ["ct9"], deals: ["d8"], notes: "" },
  { id: "c9", name: "Adani Green Energy", industry: "Energy", country: "India", website: "adanigreenenergy.com", phone: "+91 79 2555 7185", email: "info@adanigreenenergy.com", employees: 2800, revenue: 300000000, status: "active", tags: ["energy", "renewable"], assignedTo: "u7", createdAt: "2024-05-15", contacts: ["ct10"], deals: ["d9"], notes: "" },
  { id: "c10", name: "Zee Entertainment", industry: "Media", country: "India", website: "zee5.com", phone: "+91 22 6697 1234", email: "contact@zee5.com", employees: 4000, revenue: 240000000, status: "prospect", tags: ["media", "digital"], assignedTo: "u3", createdAt: "2024-06-01", contacts: [], deals: ["d10"], notes: "" },
  { id: "c11", name: "Maruti Suzuki India", industry: "Automotive", country: "India", website: "marutisuzuki.com", phone: "+91 11 4678 1000", email: "info@marutisuzuki.com", employees: 40000, revenue: 1190000000, status: "active", tags: ["automotive", "enterprise"], assignedTo: "u2", createdAt: "2024-06-15", contacts: [], deals: [], notes: "Long sales cycle expected." },
  { id: "c12", name: "Sun Pharma", industry: "Pharmaceuticals", country: "India", website: "sunpharma.com", phone: "+91 22 4324 4324", email: "info@sunpharma.com", employees: 36000, revenue: 430000000, status: "active", tags: ["pharma", "regulated"], assignedTo: "u8", createdAt: "2024-07-01", contacts: [], deals: [], notes: "" },
];

// ─── CONTACTS ──────────────────────────────────────────────────────────────────
export const MOCK_CONTACTS: Contact[] = [
  { id: "ct1", name: "Anil Kapoor", email: "anil.kapoor@tcs.com", phone: "+91 98200 11001", title: "CTO", department: "Technology", companyId: "c1", company: "Tata Consultancy Services", country: "India", status: "active", tags: ["decision-maker"], assignedTo: "u2", createdAt: "2024-01-16", lastContact: "2026-07-08", notes: "Primary contact for enterprise deal.", linkedin: "linkedin.com/in/anilkapoor-tcs" },
  { id: "ct2", name: "Sunita Menon", email: "s.menon@tcs.com", phone: "+91 98200 11002", title: "VP Sales", department: "Sales", companyId: "c1", company: "Tata Consultancy Services", country: "India", status: "active", tags: ["champion"], assignedTo: "u2", createdAt: "2024-01-20", lastContact: "2026-07-05", notes: "", linkedin: "" },
  { id: "ct3", name: "Ramesh Venkataraman", email: "r.venkat@infosys.com", phone: "+91 80 2852 0300", title: "Head of Operations", department: "Operations", companyId: "c2", company: "Infosys Limited", country: "India", status: "active", tags: ["decision-maker"], assignedTo: "u3", createdAt: "2024-02-02", lastContact: "2026-07-03", notes: "", linkedin: "" },
  { id: "ct4", name: "Dr. Sneha Patel", email: "s.patel@apollohospitals.com", phone: "+91 44 2829 0300", title: "CEO", department: "Executive", companyId: "c3", company: "Apollo Hospitals", country: "India", status: "active", tags: ["executive", "decision-maker"], assignedTo: "u4", createdAt: "2024-02-16", lastContact: "2026-07-01", notes: "Speaks multiple languages.", linkedin: "" },
  { id: "ct5", name: "Amit Jain", email: "a.jain@relianceretail.com", phone: "+91 22 4477 0100", title: "Director of Technology", department: "IT", companyId: "c4", company: "Reliance Retail", country: "India", status: "active", tags: ["technical"], assignedTo: "u3", createdAt: "2024-03-02", lastContact: "2026-06-28", notes: "", linkedin: "" },
  { id: "ct6", name: "Girish Kulkarni", email: "g.kulkarni@larsentoubro.com", phone: "+91 22 6752 5700", title: "Procurement Manager", department: "Procurement", companyId: "c5", company: "Larsen & Toubro", country: "India", status: "active", tags: ["buyer"], assignedTo: "u7", createdAt: "2024-03-16", lastContact: "2026-06-25", notes: "", linkedin: "" },
  { id: "ct7", name: "Aarav Shah", email: "aarav@zeptonow.com", phone: "+91 22 4890 1235", title: "Co-Founder & CEO", department: "Executive", companyId: "c6", company: "Zepto India", country: "India", status: "active", tags: ["founder", "executive"], assignedTo: "u2", createdAt: "2024-04-02", lastContact: "2026-07-07", notes: "Very technical background.", linkedin: "" },
  { id: "ct8", name: "Harish Chandra", email: "harish@mahindralogistics.com", phone: "+91 22 2490 1500", title: "VP Operations", department: "Operations", companyId: "c7", company: "Mahindra Logistics", country: "India", status: "active", tags: ["decision-maker"], assignedTo: "u8", createdAt: "2024-04-16", lastContact: "2026-07-02", notes: "", linkedin: "" },
  { id: "ct9", name: "Nisha Agarwal", email: "nisha@byjus.com", phone: "+91 80 4726 1200", title: "Head of Product", department: "Product", companyId: "c8", company: "BYJU'S Learning", country: "India", status: "active", tags: ["product"], assignedTo: "u4", createdAt: "2024-05-02", lastContact: "2026-06-20", notes: "", linkedin: "" },
  { id: "ct10", name: "Deepak Malhotra", email: "deepak@adanigreenenergy.com", phone: "+91 79 2555 7200", title: "CFO", department: "Finance", companyId: "c9", company: "Adani Green Energy", country: "India", status: "active", tags: ["finance", "decision-maker"], assignedTo: "u7", createdAt: "2024-05-16", lastContact: "2026-06-22", notes: "", linkedin: "" },
];

// ─── LEADS ─────────────────────────────────────────────────────────────────────
export const MOCK_LEADS: Lead[] = [
  { id: "l1",  company: "Tata Consultancy Services", contactName: "Anil Kapoor",          email: "anil.kapoor@tcs.com",             phone: "+91 98200 11001", country: "India", industry: "Technology",       pipeline: "Enterprise", stage: "negotiation", status: "active",           tags: ["hot","enterprise"], revenue: 50000000, employees: 614000, source: "referral",   assignedTo: "u2", createdAt: "2026-01-10", lastContact: "2026-07-08", nextFollowUp: "2026-07-15", score: 92, dealValue: 12000000 },
  { id: "l2",  company: "Infosys Limited",            contactName: "Ramesh Venkataraman", email: "r.venkat@infosys.com",             phone: "+91 80 2852 0300", country: "India", industry: "Technology",       pipeline: "Mid-Market",  stage: "proposal",    status: "follow_up",       tags: ["warm","it"],        revenue: 14700000, employees: 343234,source: "cold_email", assignedTo: "u3", createdAt: "2026-01-20", lastContact: "2026-07-03", nextFollowUp: "2026-07-12", score: 78, dealValue: 4500000 },
  { id: "l3",  company: "Apollo Hospitals",           contactName: "Dr. Sneha Patel",     email: "s.patel@apollohospitals.com",     phone: "+91 44 2829 0300", country: "India", industry: "Healthcare",        pipeline: "Enterprise",  stage: "qualified",   status: "meeting_scheduled",tags: ["hot","healthcare"],  revenue: 16200000, employees: 73000, source: "linkedin",   assignedTo: "u4", createdAt: "2026-02-05", lastContact: "2026-07-01", nextFollowUp: "2026-07-13", score: 85, dealValue: 7500000 },
  { id: "l4",  company: "Reliance Retail",            contactName: "Amit Jain",           email: "a.jain@relianceretail.com",       phone: "+91 22 4477 0100", country: "India", industry: "Retail",           pipeline: "Mid-Market",  stage: "contacted",   status: "active",           tags: ["warm"],             revenue: 26000000, employees: 400000,source: "website",    assignedTo: "u3", createdAt: "2026-02-15", lastContact: "2026-06-28", nextFollowUp: "2026-07-14", score: 65, dealValue: 3000000 },
  { id: "l5",  company: "Larsen & Toubro",            contactName: "Girish Kulkarni",     email: "g.kulkarni@larsentoubro.com",     phone: "+91 22 6752 5700", country: "India", industry: "Manufacturing",     pipeline: "SMB",         stage: "new",         status: "active",           tags: ["new"],              revenue: 8000000, employees: 50000,  source: "trade_show", assignedTo: "u7", createdAt: "2026-02-28", lastContact: "2026-06-25", nextFollowUp: "2026-07-16", score: 55, dealValue: 1500000 },
  { id: "l6",  company: "Zepto India",                contactName: "Aarav Shah",          email: "aarav@zeptonow.com",              phone: "+91 22 4890 1235", country: "India", industry: "Technology",       pipeline: "SMB",         stage: "proposal",    status: "active",           tags: ["hot","startup"],    revenue: 7500000, employees: 3000,   source: "inbound",    assignedTo: "u2", createdAt: "2026-03-10", lastContact: "2026-07-07", nextFollowUp: "2026-07-11", score: 88, dealValue: 2500000 },
  { id: "l7",  company: "Mahindra Logistics",         contactName: "Harish Chandra",      email: "harish@mahindralogistics.com",   phone: "+91 22 2490 1500", country: "India", industry: "Logistics",         pipeline: "Enterprise",  stage: "negotiation", status: "follow_up",        tags: ["hot","logistics"],  revenue: 42000000, employees: 12000,  source: "referral",   assignedTo: "u8", createdAt: "2026-03-20", lastContact: "2026-07-02", nextFollowUp: "2026-07-12", score: 90, dealValue: 9500000 },
  { id: "l8",  company: "BYJU'S Learning",            contactName: "Nisha Agarwal",       email: "nisha@byjus.com",                phone: "+91 80 4726 1200", country: "India", industry: "Education",         pipeline: "SMB",         stage: "contacted",   status: "active",           tags: ["warm"],             revenue: 9600000, employees: 50000,  source: "linkedin",   assignedTo: "u4", createdAt: "2026-04-01", lastContact: "2026-06-20", nextFollowUp: "2026-07-18", score: 60, dealValue: 800000 },
  { id: "l9",  company: "Adani Green Energy",         contactName: "Deepak Malhotra",     email: "deepak@adanigreenenergy.com",    phone: "+91 79 2555 7200", country: "India", industry: "Energy",            pipeline: "Enterprise",  stage: "qualified",   status: "active",           tags: ["warm","energy"],    revenue: 30000000, employees: 2800,   source: "partner",    assignedTo: "u7", createdAt: "2026-04-10", lastContact: "2026-06-22", nextFollowUp: "2026-07-20", score: 72, dealValue: 5500000 },
  { id: "l10", company: "Zee Entertainment",          contactName: "Rahul Deshpande",     email: "r.deshpande@zee5.com",           phone: "+91 22 6697 1300", country: "India", industry: "Media",             pipeline: "Mid-Market",  stage: "new",         status: "active",           tags: ["new","media"],      revenue: 24000000, employees: 4000,   source: "cold_email", assignedTo: "u3", createdAt: "2026-04-20", lastContact: "2026-06-15", nextFollowUp: "2026-07-22", score: 45, dealValue: 2000000 },
  { id: "l11", company: "Maruti Suzuki India",        contactName: "Yashvardhan Rao",     email: "y.rao@marutisuzuki.com",         phone: "+91 11 4678 1100", country: "India", industry: "Automotive",        pipeline: "Enterprise",  stage: "contacted",   status: "active",           tags: ["new","automotive"], revenue: 119000000,employees: 40000,  source: "trade_show", assignedTo: "u2", createdAt: "2026-05-01", lastContact: "2026-06-10", nextFollowUp: "2026-07-25", score: 50, dealValue: 20000000 },
  { id: "l12", company: "Sun Pharma",                 contactName: "Dr. Priyanka Desai",  email: "p.desai@sunpharma.com",          phone: "+91 22 4324 4400", country: "India", industry: "Pharmaceuticals",  pipeline: "Enterprise",  stage: "qualified",   status: "follow_up",        tags: ["hot","pharma"],     revenue: 43000000, employees: 36000,  source: "referral",   assignedTo: "u8", createdAt: "2026-05-10", lastContact: "2026-07-01", nextFollowUp: "2026-07-13", score: 82, dealValue: 18000000 },
  { id: "l13", company: "Freshworks Inc.",            contactName: "Sanjay Krishnan",     email: "sanjay@freshworks.com",          phone: "+91 44 6765 6700", country: "India", industry: "Technology",       pipeline: "SMB",         stage: "won",         status: "converted",        tags: ["won","saas"],       revenue: 3500000, employees: 5000,   source: "inbound",    assignedTo: "u3", createdAt: "2026-05-15", lastContact: "2026-07-05", nextFollowUp: undefined,     score: 98, dealValue: 1800000 },
  { id: "l14", company: "OYO Rooms",                  contactName: "Vikash Kumar",        email: "vikash@oyorooms.com",            phone: "+91 11 4321 0100", country: "India", industry: "Retail",           pipeline: "SMB",         stage: "proposal",    status: "active",           tags: ["warm","hospitality"],revenue: 2500000, employees: 25000,  source: "linkedin",   assignedTo: "u7", createdAt: "2026-05-20", lastContact: "2026-06-30", nextFollowUp: "2026-07-17", score: 68, dealValue: 1200000 },
  { id: "l15", company: "Wipro Limited",              contactName: "Ganesh Rajan",        email: "g.rajan@wipro.com",              phone: "+91 80 2844 0011", country: "India", industry: "Technology",       pipeline: "Mid-Market",  stage: "lost",        status: "lost",             tags: ["cold","lost"],      revenue: 9600000, employees: 240000, source: "cold_email", assignedTo: "u3", createdAt: "2026-06-01", lastContact: "2026-06-20", nextFollowUp: undefined,     score: 20, dealValue: 0 },
  { id: "l16", company: "Swiggy Technologies",        contactName: "Neha Sharma",         email: "neha@swiggy.in",                 phone: "+91 80 6711 0000", country: "India", industry: "Technology",       pipeline: "SMB",         stage: "new",         status: "active",           tags: ["new","foodtech"],   revenue: 8500000, employees: 6000,   source: "website",    assignedTo: "u4", createdAt: "2026-06-05", lastContact: undefined,      nextFollowUp: "2026-07-11", score: 40, dealValue: 600000 },
  { id: "l17", company: "IndiGo Airlines",            contactName: "Capt. Rajeev Batra",  email: "r.batra@goindigo.in",            phone: "+91 11 4357 3500", country: "India", industry: "Logistics",         pipeline: "Enterprise",  stage: "qualified",   status: "active",           tags: ["warm","aviation"],  revenue: 128000000,employees: 33000,  source: "partner",    assignedTo: "u8", createdAt: "2026-06-10", lastContact: "2026-07-06", nextFollowUp: "2026-07-16", score: 75, dealValue: 8000000 },
  { id: "l18", company: "Amul Dairy",                 contactName: "Ravi Sharma",         email: "ravi.sharma@amul.coop",          phone: "+91 2692 258506",  country: "India", industry: "Food & Beverage",   pipeline: "Mid-Market",  stage: "contacted",   status: "active",           tags: ["new","fmcg"],       revenue: 52000000, employees: 10000,  source: "trade_show", assignedTo: "u3", createdAt: "2026-06-15", lastContact: "2026-06-25", nextFollowUp: "2026-07-19", score: 55, dealValue: 2200000 },
  { id: "l19", company: "HDFC Bank",                  contactName: "Shalini Agarwal",     email: "s.agarwal@hdfcbank.com",         phone: "+91 22 6652 6652", country: "India", industry: "Finance",           pipeline: "Enterprise",  stage: "new",         status: "active",           tags: ["new","banking"],    revenue: 215000000,employees: 177000, source: "cold_email", assignedTo: "u7", createdAt: "2026-06-20", lastContact: undefined,      nextFollowUp: "2026-07-23", score: 35, dealValue: 6000000 },
  { id: "l20", company: "Cipla Ltd",                  contactName: "Dr. Suresh Menon",    email: "s.menon@cipla.com",              phone: "+91 22 2482 6000", country: "India", industry: "Pharmaceuticals",  pipeline: "Enterprise",  stage: "proposal",    status: "active",           tags: ["hot","pharma"],     revenue: 23000000, employees: 26000,  source: "referral",   assignedTo: "u2", createdAt: "2026-06-25", lastContact: "2026-07-07", nextFollowUp: "2026-07-14", score: 86, dealValue: 9500000 },
  { id: "l21", company: "Jio Platforms",              contactName: "Kapil Shinde",        email: "k.shinde@jio.com",               phone: "+91 22 3555 5000", country: "India", industry: "Telecommunications",pipeline: "Mid-Market",  stage: "contacted",   status: "active",           tags: ["warm","telecom"],   revenue: 98000000, employees: 120000, source: "inbound",    assignedTo: "u4", createdAt: "2026-06-28", lastContact: "2026-07-02", nextFollowUp: "2026-07-15", score: 58, dealValue: 2800000 },
  { id: "l22", company: "ICICI Bank",                 contactName: "Meena Pillai",        email: "m.pillai@icicibank.com",         phone: "+91 22 2653 1414", country: "India", industry: "Finance",           pipeline: "Enterprise",  stage: "negotiation", status: "active",           tags: ["hot","banking"],    revenue: 168000000,employees: 130000, source: "partner",    assignedTo: "u8", createdAt: "2026-07-01", lastContact: "2026-07-09", nextFollowUp: "2026-07-12", score: 89, dealValue: 11000000 },
  { id: "l23", company: "Nykaa Fashion",              contactName: "Pooja Verma",         email: "pooja@nykaa.com",                phone: "+91 22 4847 0000", country: "India", industry: "Retail",            pipeline: "SMB",         stage: "new",         status: "active",           tags: ["new","ecommerce"],  revenue: 6200000, employees: 4000,   source: "linkedin",   assignedTo: "u7", createdAt: "2026-07-03", lastContact: undefined,      nextFollowUp: "2026-07-18", score: 42, dealValue: 900000 },
  { id: "l24", company: "Godrej Properties",          contactName: "Nikhil Godrej",       email: "n.godrej@godrejproperties.com",  phone: "+91 22 6169 1000", country: "India", industry: "Real Estate",       pipeline: "Mid-Market",  stage: "qualified",   status: "active",           tags: ["warm","realty"],    revenue: 42000000, employees: 2800,   source: "website",    assignedTo: "u3", createdAt: "2026-07-05", lastContact: "2026-07-08", nextFollowUp: "2026-07-16", score: 70, dealValue: 3500000 },
  { id: "l25", company: "Paytm Payments Bank",        contactName: "Vijay Sharma",        email: "v.sharma@paytm.com",             phone: "+91 120 4770 770", country: "India", industry: "Finance",           pipeline: "Enterprise",  stage: "qualified",   status: "active",           tags: ["hot","fintech"],    revenue: 31000000, employees: 11000,  source: "inbound",    assignedTo: "u2", createdAt: "2026-07-07", lastContact: "2026-07-10", nextFollowUp: "2026-07-13", score: 77, dealValue: 15000000 },
];

// ─── DEALS ─────────────────────────────────────────────────────────────────────
export const MOCK_DEALS: Deal[] = [
  { id: "d1",  title: "TCS Enterprise AI License",        value: 12000000, currency: "INR", stage: "negotiation",  probability: 80, companyId: "c1",  company: "Tata Consultancy Services",  contactId: "ct1", contactName: "Anil Kapoor",          assignedTo: "u2", expectedCloseDate: "2026-08-31", createdAt: "2026-01-10", lastActivity: "2026-07-08", tags: ["enterprise","priority"], notes: "Final pricing discussion pending." },
  { id: "d2",  title: "Infosys Operations Suite",         value: 4500000,  currency: "INR", stage: "proposal",     probability: 60, companyId: "c2",  company: "Infosys Limited",             contactId: "ct3", contactName: "Ramesh Venkataraman",  assignedTo: "u3", expectedCloseDate: "2026-09-15", createdAt: "2026-01-20", lastActivity: "2026-07-03", tags: ["it"], notes: "" },
  { id: "d3",  title: "Apollo Health Automation",         value: 7500000,  currency: "INR", stage: "qualification",probability: 55, companyId: "c3",  company: "Apollo Hospitals",            contactId: "ct4", contactName: "Dr. Sneha Patel",      assignedTo: "u4", expectedCloseDate: "2026-09-30", createdAt: "2026-02-05", lastActivity: "2026-07-01", tags: ["healthcare"], notes: "" },
  { id: "d4",  title: "Reliance Retail CRM",              value: 3000000,  currency: "INR", stage: "prospecting",  probability: 30, companyId: "c4",  company: "Reliance Retail",             contactId: "ct5", contactName: "Amit Jain",            assignedTo: "u3", expectedCloseDate: "2026-10-31", createdAt: "2026-02-15", lastActivity: "2026-06-28", tags: ["retail"], notes: "" },
  { id: "d5",  title: "L&T Field Software",               value: 1500000,  currency: "INR", stage: "qualification",probability: 40, companyId: "c5",  company: "Larsen & Toubro",             contactId: "ct6", contactName: "Girish Kulkarni",      assignedTo: "u7", expectedCloseDate: "2026-10-15", createdAt: "2026-02-28", lastActivity: "2026-06-25", tags: ["construction"], notes: "" },
  { id: "d6",  title: "Zepto Analytics Pro",              value: 2500000,  currency: "INR", stage: "proposal",     probability: 70, companyId: "c6",  company: "Zepto India",                 contactId: "ct7", contactName: "Aarav Shah",           assignedTo: "u2", expectedCloseDate: "2026-08-15", createdAt: "2026-03-10", lastActivity: "2026-07-07", tags: ["startup","ai"], notes: "Demo went very well." },
  { id: "d7",  title: "Mahindra Logistics Platform",      value: 9500000,  currency: "INR", stage: "negotiation",  probability: 85, companyId: "c7",  company: "Mahindra Logistics",          contactId: "ct8", contactName: "Harish Chandra",       assignedTo: "u8", expectedCloseDate: "2026-08-01", createdAt: "2026-03-20", lastActivity: "2026-07-02", tags: ["logistics","priority"], notes: "Contract review in progress." },
  { id: "d8",  title: "BYJU'S Learning Suite",            value: 800000,   currency: "INR", stage: "prospecting",  probability: 25, companyId: "c8",  company: "BYJU'S Learning",             contactId: "ct9", contactName: "Nisha Agarwal",        assignedTo: "u4", expectedCloseDate: "2026-11-30", createdAt: "2026-04-01", lastActivity: "2026-06-20", tags: ["education"], notes: "" },
  { id: "d9",  title: "Adani Energy Management",          value: 5500000,  currency: "INR", stage: "qualification",probability: 50, companyId: "c9",  company: "Adani Green Energy",          contactId: "ct10",contactName: "Deepak Malhotra",      assignedTo: "u7", expectedCloseDate: "2026-10-31", createdAt: "2026-04-10", lastActivity: "2026-06-22", tags: ["energy"], notes: "" },
  { id: "d10", title: "Zee Digital CRM",                  value: 2000000,  currency: "INR", stage: "prospecting",  probability: 20, companyId: "c10", company: "Zee Entertainment",           contactId: undefined, contactName: undefined,              assignedTo: "u3", expectedCloseDate: "2026-12-31", createdAt: "2026-04-20", lastActivity: "2026-06-15", tags: ["media"], notes: "" },
  { id: "d11", title: "ICICI Bank Enterprise Deal",       value: 11000000, currency: "INR", stage: "negotiation",  probability: 88, companyId: "c2",  company: "ICICI Bank",                  contactId: undefined, contactName: "Meena Pillai",          assignedTo: "u8", expectedCloseDate: "2026-07-31", createdAt: "2026-07-01", lastActivity: "2026-07-09", tags: ["banking","hot"], notes: "Highest priority deal this month." },
  { id: "d12", title: "Cipla Research Platform",          value: 9500000,  currency: "INR", stage: "proposal",     probability: 75, companyId: "c12", company: "Cipla Ltd",                   contactId: undefined, contactName: "Dr. Suresh Menon",      assignedTo: "u2", expectedCloseDate: "2026-09-30", createdAt: "2026-06-25", lastActivity: "2026-07-07", tags: ["pharma"], notes: "" },
  { id: "d13", title: "Freshworks Starter Plan",          value: 1800000,  currency: "INR", stage: "closed_won",   probability: 100,companyId: "c1",  company: "Freshworks Inc.",             contactId: undefined, contactName: "Sanjay Krishnan",       assignedTo: "u3", expectedCloseDate: "2026-07-05", createdAt: "2026-05-15", lastActivity: "2026-07-05", tags: ["won","saas"], notes: "Deal signed and onboarding started." },
  { id: "d14", title: "Paytm Platform Deal",              value: 15000000, currency: "INR", stage: "qualification",probability: 65, companyId: "c4",  company: "Paytm Payments Bank",         contactId: undefined, contactName: "Vijay Sharma",          assignedTo: "u2", expectedCloseDate: "2026-10-15", createdAt: "2026-07-07", lastActivity: "2026-07-10", tags: ["fintech","enterprise"], notes: "" },
  { id: "d15", title: "Wipro Lost Deal",                  value: 0,        currency: "INR", stage: "closed_lost",  probability: 0,  companyId: "c10", company: "Wipro Limited",               contactId: undefined, contactName: "Ganesh Rajan",          assignedTo: "u3", expectedCloseDate: "2026-06-30", createdAt: "2026-06-01", lastActivity: "2026-06-20", tags: ["lost"], notes: "Went with competitor." },
];

// ─── ACTIVITIES ────────────────────────────────────────────────────────────────
export const MOCK_ACTIVITIES: Activity[] = [
  { id: "a1",  type: "email",         title: "Sent Introduction Email",          description: "Sent product overview email to Anil Kapoor at TCS",               leadId: "l1",  userId: "u2", userName: "Priya Sharma",   createdAt: "2026-07-08T09:00:00Z" },
  { id: "a2",  type: "call",          title: "Discovery Call Completed",          description: "45-minute discovery call with Dr. Sneha Patel at Apollo",          leadId: "l3",  userId: "u4", userName: "Divya Nair",     createdAt: "2026-07-07T14:30:00Z" },
  { id: "a3",  type: "meeting",       title: "Product Demo Scheduled",            description: "Demo meeting booked with Aarav Shah for July 15",                  leadId: "l6",  userId: "u2", userName: "Priya Sharma",   createdAt: "2026-07-07T10:00:00Z" },
  { id: "a4",  type: "deal_updated",  title: "Deal Value Updated",               description: "Mahindra Logistics deal updated to ₹95,00,000",                    leadId: "l7",  userId: "u8", userName: "Kavitha Pillai", createdAt: "2026-07-06T16:00:00Z" },
  { id: "a5",  type: "email",         title: "Follow-up Email Sent",             description: "Sent pricing proposal to Ramesh at Infosys",                        leadId: "l2",  userId: "u3", userName: "Arjun Mehta",    createdAt: "2026-07-05T11:00:00Z" },
  { id: "a6",  type: "note",          title: "Meeting Notes Added",              description: "ICICI Bank interested in enterprise contract for Q3",               leadId: "l22", userId: "u8", userName: "Kavitha Pillai", createdAt: "2026-07-04T15:00:00Z" },
  { id: "a7",  type: "call",          title: "Objection Handling Call",          description: "Addressed pricing concerns with Deepak at Adani Green",             leadId: "l9",  userId: "u7", userName: "Suresh Iyer",    createdAt: "2026-07-03T13:00:00Z" },
  { id: "a8",  type: "stage_changed", title: "Stage Advanced",                   description: "Lead moved from Qualified to Proposal stage",                       leadId: "l20", userId: "u2", userName: "Priya Sharma",   createdAt: "2026-07-02T10:00:00Z" },
];

// ─── EMAIL TEMPLATES ──────────────────────────────────────────────────────────
export const MOCK_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "et1",
    name: "Cold Introduction",
    subject: "Transform {{company}}'s Sales with AI Automation",
    body: `Dear {{contactName}},

I hope this message finds you well. I'm {{ownerName}} from JCS AI CRM Solutions.

I wanted to reach out because we've been helping companies in the {{industry}} sector — specifically in India — dramatically improve their sales velocity using our AI-powered CRM platform.

Companies like yours in {{country}} are achieving:
• 40% increase in lead conversion rates
• 3x faster sales pipeline velocity  
• 60% reduction in manual follow-up time

I'd love to schedule a 20-minute call to show you how {{company}} could benefit. Are you free on {{date}} at {{time}} IST?

Looking forward to connecting,
{{ownerName}}
JCS AI CRM Solutions`,
    category: "cold_outreach",
    tags: ["introduction", "cold"],
    isActive: true,
    createdAt: "2024-01-01",
    usageCount: 145
  },
  {
    id: "et2",
    name: "Follow-up After Demo",
    subject: "Following up on your {{company}} demo — Next steps",
    body: `Dear {{contactName}},

Thank you for taking the time to join our product demonstration yesterday. It was great learning more about {{company}}'s growth plans.

As we discussed, JCS AI CRM can help {{company}}:
• Automate your entire lead nurturing pipeline
• Generate AI-powered personalized emails in seconds
• Track every customer interaction in real time

I've attached a customised proposal based on your requirements. The implementation timeline would be approximately 2 weeks, and we can start with a 30-day pilot at no cost.

Would {{date}} at {{time}} IST work for a follow-up call?

Best regards,
{{ownerName}}`,
    category: "follow_up",
    tags: ["follow-up", "post-demo"],
    isActive: true,
    createdAt: "2024-01-01",
    usageCount: 98
  },
  {
    id: "et3",
    name: "Proposal Submission",
    subject: "{{company}} — Customised CRM Proposal from JCS AI",
    body: `Dear {{contactName}},

As promised, please find below the customised CRM proposal for {{company}} in the {{industry}} space.

PROPOSED SOLUTION:
• JCS AI Sales CRM — Enterprise Plan
• AI Email Generator + WhatsApp Automation
• Real-time Analytics Dashboard
• Dedicated onboarding support team

INVESTMENT:
Starting from ₹99,000/month (Annual billing available)
Special Q3 offer: 20% off for commitment this month

NEXT STEPS:
1. Review the attached proposal  
2. Schedule a technical walkthrough with your IT team
3. Sign the agreement and go live in 14 days

Ready to move forward? Just reply to this email or call me on +91 98100 00001.

Warm regards,
{{ownerName}}
JCS AI CRM Solutions`,
    category: "proposal",
    tags: ["proposal", "pricing"],
    isActive: true,
    createdAt: "2024-01-01",
    usageCount: 67
  },
  {
    id: "et4",
    name: "Re-engagement",
    subject: "{{contactName}}, are you still exploring CRM options?",
    body: `Dear {{contactName}},

I noticed we haven't connected recently and wanted to check in on {{company}}'s CRM evaluation.

A lot has changed since we last spoke — we've launched:
✨ New AI Forecasting Engine
📱 WhatsApp Business Integration
📊 Advanced Pipeline Analytics
🤖 Automated Follow-up Sequences

Many of our Indian clients in the {{industry}} sector have seen incredible results this quarter.

Would you be open to a fresh 15-minute conversation to see what's new?

Best,
{{ownerName}}`,
    category: "re_engagement",
    tags: ["win-back", "re-engage"],
    isActive: true,
    createdAt: "2024-01-01",
    usageCount: 34
  },
];

// ─── NOTIFICATIONS ─────────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "lead", title: "New Lead Assigned", message: "TCS Enterprise lead has been assigned to you", isRead: false, createdAt: "2026-07-11T08:00:00Z", link: "/dashboard/leads/l1" },
  { id: "n2", type: "deal", title: "Deal Stage Updated", message: "ICICI Bank deal moved to Negotiation stage", isRead: false, createdAt: "2026-07-11T07:30:00Z", link: "/dashboard/deals" },
  { id: "n3", type: "email", title: "Email Opened", message: "Anil Kapoor opened your email: Transform TCS's Sales", isRead: true, createdAt: "2026-07-10T16:00:00Z", link: "/dashboard/email" },
  { id: "n4", type: "task", title: "Follow-up Due Today", message: "Follow-up with Mahindra Logistics is due today", isRead: false, createdAt: "2026-07-11T09:00:00Z", link: "/dashboard/follow-up" },
  { id: "n5", type: "lead", title: "High Score Lead", message: "Paytm Payments Bank scored 77 — ready for outreach", isRead: true, createdAt: "2026-07-10T14:00:00Z", link: "/dashboard/leads/l25" },
];

// ─── JOBS ──────────────────────────────────────────────────────────────────────
export const MOCK_JOBS: Job[] = [
  { id: "j1", title: "Senior Sales Executive", department: "Sales", location: "Mumbai, Maharashtra", type: "full-time", experience: "3-5 years", description: "Drive enterprise sales growth across BFSI and IT sectors in India.", requirements: ["B2B SaaS Sales Experience", "Strong Communication in English & Hindi", "Familiarity with CRM Tools"], status: "open", applicants: 23, createdAt: "2026-06-01" },
  { id: "j2", title: "AI Product Manager", department: "Product", location: "Bengaluru, Karnataka", type: "full-time", experience: "4-6 years", description: "Lead the AI features roadmap for JCS CRM Platform.", requirements: ["Product Management Experience", "Understanding of ML/AI Concepts", "Strong Data Analytical Skills"], status: "open", applicants: 41, createdAt: "2026-06-10" },
  { id: "j3", title: "Business Development Manager", department: "Business Development", location: "Delhi NCR", type: "full-time", experience: "2-4 years", description: "Build partnerships and channel relationships across North India.", requirements: ["Partnership Development", "Strong Network in Delhi NCR", "Target-driven Mindset"], status: "open", applicants: 18, createdAt: "2026-06-15" },
  { id: "j4", title: "Customer Success Manager", department: "Customer Success", location: "Hyderabad, Telangana", type: "full-time", experience: "2-4 years", description: "Own post-sales onboarding and retention for enterprise accounts.", requirements: ["SaaS Customer Success", "CRM Experience", "Excellent Communication"], status: "open", applicants: 12, createdAt: "2026-06-20" },
];

// ─── DASHBOARD STATS ──────────────────────────────────────────────────────────
export const MOCK_DASHBOARD_STATS = {
  todayLeads: 8,
  totalLeads: 247,
  emailsSent: 1284,
  meetingsBooked: 23,
  openDeals: 15,
  revenue: 74500000,
  conversionRate: 12.8,
  pendingFollowUps: 18,
  changes: {
    todayLeads: 14.3,
    totalLeads: 8.2,
    emailsSent: 22.5,
    meetingsBooked: 15.0,
    openDeals: -3.4,
    revenue: 18.7,
    conversionRate: 2.3,
    pendingFollowUps: -5.6
  }
};

// ─── ANALYTICS DATA ────────────────────────────────────────────────────────────
export const MOCK_ANALYTICS: AnalyticsData = {
  monthlyRevenue: [
    { month: "Jan", revenue: 4200000, target: 5000000 },
    { month: "Feb", revenue: 5800000, target: 5500000 },
    { month: "Mar", revenue: 7100000, target: 6000000 },
    { month: "Apr", revenue: 6400000, target: 6500000 },
    { month: "May", revenue: 8900000, target: 7000000 },
    { month: "Jun", revenue: 9200000, target: 7500000 },
    { month: "Jul", revenue: 10800000, target: 8000000 },
    { month: "Aug", revenue: 0, target: 8500000 },
    { month: "Sep", revenue: 0, target: 9000000 },
    { month: "Oct", revenue: 0, target: 9500000 },
    { month: "Nov", revenue: 0, target: 10000000 },
    { month: "Dec", revenue: 0, target: 10500000 },
  ],
  leadSources: [
    { name: "LinkedIn", value: 28, color: "#2563eb" },
    { name: "Inbound", value: 22, color: "#7c3aed" },
    { name: "Referral", value: 19, color: "#10b981" },
    { name: "Cold Email", value: 16, color: "#f59e0b" },
    { name: "Trade Show", value: 10, color: "#06b6d4" },
    { name: "Partner", value: 5, color: "#ef4444" },
  ],
  emailMetrics: [
    { month: "Jan", sent: 210, opened: 78, replied: 22 },
    { month: "Feb", sent: 245, opened: 91, replied: 28 },
    { month: "Mar", sent: 298, opened: 112, replied: 34 },
    { month: "Apr", sent: 267, opened: 98, replied: 29 },
    { month: "May", sent: 312, opened: 124, replied: 41 },
    { month: "Jun", sent: 389, opened: 156, replied: 52 },
    { month: "Jul", sent: 421, opened: 168, replied: 58 },
  ],
  conversionRate: [
    { month: "Jan", rate: 9.2 },
    { month: "Feb", rate: 10.1 },
    { month: "Mar", rate: 11.4 },
    { month: "Apr", rate: 10.8 },
    { month: "May", rate: 12.3 },
    { month: "Jun", rate: 12.9 },
    { month: "Jul", rate: 13.5 },
  ],
  salesFunnel: [
    { stage: "Leads", count: 247, value: 247000000 },
    { stage: "Contacted", count: 182, value: 182000000 },
    { stage: "Qualified", count: 124, value: 124000000 },
    { stage: "Proposal", count: 67, value: 67000000 },
    { stage: "Negotiation", count: 31, value: 31000000 },
    { stage: "Won", count: 15, value: 15000000 },
  ],
  countrywiseLeads: [
    { country: "Mumbai", leads: 72, revenue: 28000000 },
    { country: "Bengaluru", leads: 58, revenue: 19000000 },
    { country: "Delhi NCR", leads: 47, revenue: 15000000 },
    { country: "Hyderabad", leads: 31, revenue: 8000000 },
    { country: "Pune", leads: 22, revenue: 5500000 },
    { country: "Chennai", leads: 17, revenue: 4200000 },
  ],
  industryBreakdown: [
    { industry: "Technology", leads: 68, deals: 28 },
    { industry: "Finance", leads: 45, deals: 19 },
    { industry: "Healthcare", leads: 32, deals: 12 },
    { industry: "Retail", leads: 28, deals: 9 },
    { industry: "Manufacturing", leads: 24, deals: 8 },
    { industry: "Logistics", leads: 21, deals: 7 },
    { industry: "Energy", leads: 18, deals: 6 },
    { industry: "Pharma", leads: 11, deals: 4 },
  ],
};

// ─── WORKFLOWS ────────────────────────────────────────────────────────────────
export const MOCK_WORKFLOWS = [
  { id: "w1", name: "Enterprise Lead Nurture", description: "Automated 7-touch nurturing sequence for enterprise leads above ₹50L deal value.", status: "active", trigger: "lead_created", steps: 7, runsCount: 142, createdAt: "2024-01-01" },
  { id: "w2", name: "Follow-up Reminder Chain", description: "Sends escalating follow-up emails if no reply within 2 days, then 5 days.", status: "active", trigger: "no_reply", steps: 4, runsCount: 89, createdAt: "2024-02-01" },
  { id: "w3", name: "Proposal Sent Sequence", description: "Tracks proposal opens and triggers a demo scheduling email if not booked.", status: "inactive", trigger: "proposal_sent", steps: 3, runsCount: 34, createdAt: "2024-03-01" },
  { id: "w4", name: "Deal Won Onboarding", description: "Triggers CS team assignment and sends welcome email upon deal closure.", status: "active", trigger: "deal_won", steps: 5, runsCount: 18, createdAt: "2024-04-01" },
];

// ─── FOLLOW-UPS ───────────────────────────────────────────────────────────────
export const MOCK_FOLLOW_UPS = [
  { id: "f1", leadId: "l1", leadName: "Anil Kapoor",      company: "TCS",              day: 1,  type: "introduction", status: "completed", scheduledDate: "2026-07-08", completedDate: "2026-07-08", notes: "Sent intro email. Very positive response." },
  { id: "f2", leadId: "l7", leadName: "Harish Chandra",   company: "Mahindra Logistics",day: 3,  type: "reminder",     status: "completed", scheduledDate: "2026-07-10", completedDate: "2026-07-10", notes: "Confirmed meeting for July 15." },
  { id: "f3", leadId: "l22",leadName: "Meena Pillai",     company: "ICICI Bank",       day: 5,  type: "case_study",   status: "pending",   scheduledDate: "2026-07-12", completedDate: undefined,    notes: "Send BFSI CRM case study PDF." },
  { id: "f4", leadId: "l3", leadName: "Dr. Sneha Patel",  company: "Apollo Hospitals", day: 7,  type: "meeting",      status: "pending",   scheduledDate: "2026-07-13", completedDate: undefined,    notes: "Product demo scheduled for 2 PM IST." },
  { id: "f5", leadId: "l20",leadName: "Dr. Suresh Menon", company: "Cipla Ltd",        day: 10, type: "reminder",     status: "rescheduled",scheduledDate: "2026-07-19",completedDate: undefined,    notes: "Rescheduled due to team offsite." },
];

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export const MOCK_SETTINGS = {
  smtp: { host: "smtp.gmail.com", port: 587, username: "", password: "", fromName: "JCS AI CRM", fromEmail: "noreply@jcscrm.com", ssl: true },
  ai: { provider: "openai", model: "gpt-4o", apiKey: "", temperature: 0.7, maxTokens: 1500 },
  whatsapp: { apiKey: "", phoneId: "", businessId: "", webhookUrl: "" },
  notifications: { emailNotifications: true, pushNotifications: true, smsNotifications: false, weeklyDigest: true },
  security: { twoFactorEnabled: false, sessionTimeout: 480, ipWhitelist: [] },
  company: { name: "JCS AI Solutions Pvt. Ltd.", address: "101 Bandra Kurla Complex, Mumbai 400051", gstin: "27AABCJ1234A1Z5", cin: "U72900MH2020PTC345678" },
};

// ─── MEDIA ────────────────────────────────────────────────────────────────────
export const MOCK_MEDIA = [
  { id: "m1", name: "JCS_Company_Brochure.pdf", type: "pdf", size: 2048000, uploadedAt: "2026-06-01", uploadedBy: "u1", url: "/uploads/JCS_Company_Brochure.pdf" },
  { id: "m2", name: "Product_Demo_Video.mp4", type: "video", size: 52428800, uploadedAt: "2026-06-10", uploadedBy: "u2", url: "/uploads/Product_Demo_Video.mp4" },
  { id: "m3", name: "Logo_JCS_AI.png", type: "image", size: 102400, uploadedAt: "2026-05-15", uploadedBy: "u1", url: "/uploads/Logo_JCS_AI.png" },
  { id: "m4", name: "Sales_Presentation_Q3.pptx", type: "pptx", size: 4096000, uploadedAt: "2026-07-01", uploadedBy: "u5", url: "/uploads/Sales_Presentation_Q3.pptx" },
  { id: "m5", name: "BFSI_Case_Study.pdf", type: "pdf", size: 1536000, uploadedAt: "2026-07-05", uploadedBy: "u2", url: "/uploads/BFSI_Case_Study.pdf" },
  { id: "m6", name: "Healthcare_ROI_Report.pdf", type: "pdf", size: 1024000, uploadedAt: "2026-07-08", uploadedBy: "u4", url: "/uploads/Healthcare_ROI_Report.pdf" },
];

export const AI_CHAT_RESPONSES = {
  pricing: [
    "Our Enterprise plan starts at ₹99,000/month (billed annually). It includes unlimited users, AI email generation, and full WhatsApp integration. Would you like a detailed breakdown?",
    "Pricing depends on the number of active pipelines and AI requests. For a standard team of 10, it's roughly ₹1,50,000/month. Shall I generate a custom quotation for you?",
  ],
  moq: [
    "We have no minimum order quantity, but the minimum contract term for Enterprise features is 12 months.",
    "You can start with just 1 user license for ₹9,999/month on the Core plan."
  ],
  catalogue: [
    "You can view all our feature modules under the 'Products' tab. Our flagship offerings are the Sales CRM, Marketing Automation, and Customer Success platform."
  ],
  meeting: [
    "I'd be happy to arrange a meeting. Does next Tuesday at 11:00 AM IST work for you? Or would you prefer a different time?",
    "Let's get that scheduled! Here is a link to my calendar: jcscrm.com/book-demo. Pick a slot that works for you!"
  ],
  quotation: [
    "I can certainly help with that. Could you confirm how many user licenses you need and whether you want the WhatsApp integration enabled?"
  ],
  follow_up: [
    "Noted. I'll make sure an account executive follows up with you within 24 hours to discuss this further."
  ],
  default: [
    "That's an interesting question. Could you provide a bit more context so I can give you the most accurate answer?",
    "I'm checking my knowledge base for that... While I do that, is there anything else regarding lead generation or pipelines I can help with?",
    "I'm an AI assistant, and I'm continuously learning. Let me route this query to our human support team for a more detailed answer."
  ]
};

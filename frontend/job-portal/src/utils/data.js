import {
  Search,
  Users,
  Building2,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description: "Find jobs that match your skills and experience.",
  },
  {
    icon: Users,
    title: "Network with Like-minded Individuals",
    description: "Connect with other job seekers and employers.",
  },
  {
    icon: FileText,
    title: "Job Alerts and Notifications",
    description: "Stay up-to-date with job opportunities.",
  },
  {
    icon: BarChart3,
    title: "Job Statistics and Analytics",
    description: "Track your job search performance.",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "Hire Top Talent",
    description: "Find and hire talented job seekers.",
  },
  {
    icon: MessageSquare,
    title: "Connect with Job Seekers",
    description: "Connect with job seekers and find the perfect candidate.",
  },
  {
    icon: Shield,
    title: "Secure Job Posting",
    description: "Ensure your job postings are safe and secure.",
  },
  {
    icon: Clock,
    title: "Efficient Hiring Process",
    description: "Streamline the hiring process and save time.",
  },
];

// Navigation items configuration
export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
  },
];

// Categories and job types
export const CATEGORIES = [
    {value: "Engineering", label: "Engineering"},
    {value: "Design", label: "Design"},
    {value: "Marketing", label: "Marketing"},
    {value: "Sales", label: "Sales"},
    {value: "HR", label: "HR"},
    {value: "Finance", label: "Finance"},
    {value: "IT", label: "IT"},
    {value: "Customer Service", label: "Customer Service"},
    {value: "Legal", label: "Legal"},
    {value: "Other", label: "Other"},
]

// Job Types
export const JOB_TYPES = [
    {value: "Remote", label: "Remote"},
    {value: "Full-time", label: "Full-time"},
    {value: "Part-time", label: "Part-time"},
    {value: "Contract", label: "Contract"},
    {value: "Internship", label: "Internship"},
    {value: "Other", label: "Other"},
]

export const SALARY_RANGES = [
    "Less than Rp5.000.000",
    "Rp5.000.000 - Rp10.000.000",
    "More than Rp10.000.000",
]
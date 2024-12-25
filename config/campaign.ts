import { Campaign } from '@/types/campaign';
import type { 
  CampaignDocument, 
  CampaignTeamMember, 
  CampaignUpdate,
  CampaignMilestone 
} from '@/types/campaign';
import { CAMPAIGN_CATEGORIES, CAMPAIGN_STAGES } from './constants';

export const mockDocuments: CampaignDocument[] = [
  {
    id: "doc1",
    name: "Business Plan",
    type: "PDF",
    size: "2.4 MB",
    url: "/docs/business-plan.pdf",
    date: "2024-03-15",
  },
  {
    id: "doc2",
    name: "Financial Projections",
    type: "XLSX",
    size: "1.8 MB",
    url: "/docs/financials.xlsx",
    date: "2024-03-10",
  },
];

export const mockTeamMembers: CampaignTeamMember[] = [
  {
    id: "team1",
    name: "Sarah Chen",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    bio: "Serial entrepreneur with 10+ years experience in clean tech.",
  },
  {
    id: "team2",
    name: "Michael Rodriguez",
    role: "CTO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    bio: "Former engineering lead at Tesla with expertise in solar technology.",
  },
];

export const mockUpdates: CampaignUpdate[] = [
  {
    id: "update1",
    title: "Q1 Milestone Achieved",
    content: "Successfully completed initial prototype testing with 45% efficiency gains.",
    date: "2024-03-15",
    type: "milestone",
    metrics: [
      { label: "Efficiency", value: "+45%", trend: "up" },
      { label: "Cost Reduction", value: "32%", trend: "up" },
    ],
  },
  {
    id: "update2",
    title: "New Partnership Announcement",
    content: "Strategic partnership formed with leading solar panel manufacturer.",
    date: "2024-03-01",
    type: "important",
    metrics: [
      { label: "Production Capacity", value: "+10,000 units", trend: "up" },
      { label: "Time to Market", value: "-3 months", trend: "down" },
    ],
  },
];

export const mockMilestones: CampaignMilestone[] = [
  {
    id: "mile1",
    campaign_id: "eco-tech-solar",
    title: "Prototype Development",
    description: "Complete working prototype with target efficiency metrics",
    amount: 150000,
    timeline: "Q2 2024",
    status: "completed",
  },
  {
    id: "mile2",
    campaign_id: "eco-tech-solar",
    title: "Manufacturing Setup",
    description: "Establish production facility and supply chain",
    amount: 300000,
    timeline: "Q3 2024",
    status: "in_progress",
  },
];
export const CAMPAIGNS: Campaign[] = [
  {
    id: "eco-tech-solar",
    title: "EcoTech Solar Solutions",
    description: "Revolutionary solar panels with 50% more efficiency and integrated smart home features.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
    goal: 500000,
    raised: 375000,
    backers: 1234,
    category: CAMPAIGN_CATEGORIES.CLEAN_ENERGY,
    status: "Established Business",
    stage: CAMPAIGN_STAGES.GROWTH,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "health-ai-diagnostics",
    title: "HealthAI Diagnostics",
    description: "AI-powered medical diagnostic tool for early disease detection.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
    goal: 1000000,
    raised: 850000,
    backers: 2156,
    category: CAMPAIGN_CATEGORIES.HEALTHCARE,
    status: "New Venture",
    stage: CAMPAIGN_STAGES.EARLY,
    createdAt: "2024-03-10T10:00:00Z",
  },
  {
    id: "urban-farming-initiative",
    title: "Urban Farming Initiative",
    description: "Vertical farming solution for urban areas, reducing water usage and increasing crop yields.",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
    goal: 750000,
    raised: 525000,
    backers: 1567,
    category: CAMPAIGN_CATEGORIES.AGRICULTURE,
    status: "Established Business",
    stage: CAMPAIGN_STAGES.EXPANSION,
    createdAt: "2024-03-05T10:00:00Z",
  },
];

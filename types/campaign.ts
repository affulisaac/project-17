import {
  CAMPAIGN_STATUS,
  CAMPAIGN_STAGES,
  CAMPAIGN_CATEGORIES,
} from '@/config/constants';

export type CampaignStatus =
  (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];
export type CampaignStage =
  (typeof CAMPAIGN_STAGES)[keyof typeof CAMPAIGN_STAGES];
export type CampaignCategory =
  (typeof CAMPAIGN_CATEGORIES)[keyof typeof CAMPAIGN_CATEGORIES];

export interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  backers: number;
  category: CampaignCategory;
  status: string;
  stage: CampaignStage;
  createdAt: string;
}

export type InvestorTransactions = {
  amount: number;
  transactionDate: string;
  investorId: string
}

export type SortOption = 'newest' | 'raised' | 'goal' | 'backers';

export interface FilterState {
  search: string;
  categories: CampaignCategory[];
  stages: CampaignStage[];
  fundingRange: [number, number];
  sortBy: SortOption;
}

export interface CampaignDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  date: string;
}

export interface CampaignTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'milestone' | 'general' | 'important';
  metrics?: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
}

export interface CampaignMilestone {
  id: string;
  campaignId: string;
  title: string;
  campaign_id: string;
  description: string;
  amount: number;
  timeline: string;
  status: 'pending' | 'completed' | 'in_progress';
}


export interface CampaignBasicDetails {
  title: string;
  description: string;
  id?: string
  category: string;
  fundingGoal: number;
  businessType: string;
  launchTimeline: string
  numberOfEmployees: number;
  marketResearch?: string;
  businessPlan?: string;
  currentOperations?: string;
}

export interface CampaignBusinessDetails {
  problemStatement: string;
  solution: string;
  targetMarket: string;
  revenueModel: string;
  competitiveAdvantage: string;
  marketResearch: string
  businessPlan: string
  numberOfEmployees:string
  launchTimeline: string
  currentOperations: string
}

export interface CampaignStepThreeData {
  returnPercentage: number;
  returnTac: string;
}

export interface CampaignMilestone {

}
export interface CampaignStepFourData {
  videoUrl?: string;
  pitchDec?: string;
}

export interface CampaignVisibility {
  visibilityType: 'public' | 'private';
  featured: boolean;
  allowMessages: boolean;
  showTeamInfo: boolean;
  customMessages?: string;
}

export type CampaignDetail = CampaignBasicDetails & CampaignBusinessDetails & CampaignStepThreeData & CampaignStepFourData & CampaignStepFiveData & CampaignMilestone
export interface CampaignStepFiveData {
  visibilityType: 'public' | 'private';
  featured: boolean;
  allowMessages: boolean;
  showTeamInfo: boolean;
  customMessages?: string;
}

export interface FilterActions {
  setSearch: (search: string) => void;
  toggleCategory: (category: CampaignCategory) => void;
  toggleStage: (stage: CampaignStage) => void;
  setFundingRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  clearFilters: () => void;
}



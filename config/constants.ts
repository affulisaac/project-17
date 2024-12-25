export const CATEGORIES = [
  "Technology",
  "Healthcare",
  "Real Estate",
  "Clean Energy",
  "Agriculture",
  "Education",
  "Finance",
] as const;

export const STAGES = [
  "Seed",
  "Early Stage",
  "Growth",
  "Expansion",
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "raised", label: "Most Raised" },
  { value: "goal", label: "Funding Goal" },
  { value: "backers", label: "Most Backers" },
] as const;


export const CAMPAIGN_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  FUNDED: "funded",
  COMPLETED: "completed",
} as const;

export const CAMPAIGN_STAGES = {
  SEED: "seed",
  EARLY: "early",
  GROWTH: "growth",
  EXPANSION: "expansion",
} as const;

export const CAMPAIGN_CATEGORIES = {
  TECH: "Technology",
  HEALTHCARE: "Healthcare",
  REAL_ESTATE: "Real Estate",
  CLEAN_ENERGY: "Clean Energy",
  AGRICULTURE: "Agriculture",
  EDUCATION: "Education",
  FINANCE: "Finance",
} as const;
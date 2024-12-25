"use client";

import { CampaignHeader } from "./campaign-header";
import { CampaignStats } from "./campaign-stats";
import { CampaignTabs } from "./campaign-tabs";
import type { Campaign } from "@/types/campaign";
import { 
  mockDocuments, 
  mockTeamMembers, 
  mockUpdates 
} from "@/config/campaign";

interface CampaignDetailsProps {
  campaign: Campaign;
}

export function CampaignDetails({ campaign }: CampaignDetailsProps) {
  if (!campaign) return null;

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-4xl mx-auto space-y-6">
        <CampaignHeader campaign={campaign} />
        <CampaignStats campaign={campaign} />
        <CampaignTabs 
          campaign={campaign}
          documents={mockDocuments}
          teamMembers={mockTeamMembers}
          updates={mockUpdates}
        />
      </div>
    </div>
  );
}
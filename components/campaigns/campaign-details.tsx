"use client";

import { CampaignHeader } from "./campaign-details/campaign-header";
import { CampaignStats } from "./campaign-details/campaign-stats";
import { CampaignTabs } from "./campaign-details/campaign-tabs";
import { mockDocuments, mockTeamMembers, mockUpdates } from "@/config/campaign";
import { Campaign } from "@/types/campaign";

type CampaignDetailProp = {
  campaign: Campaign
}

export default function CampaignDetails({campaign}: CampaignDetailProp) {

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

"use client";

import { CampaignCard } from "@/components/home/campaign-card";
import { EmptyState } from "@/components/shared/empty-state";
import type { Campaign } from "@/types/campaign";

interface CampaignListProps {
  campaigns: Campaign[];
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export function CampaignList({ 
  campaigns,
  hasFilters,
  onResetFilters,
}: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <EmptyState
        title={hasFilters ? "No matching campaigns" : "No campaigns found"}
        description={
          hasFilters
            ? "Try adjusting your filters or search terms to find more campaigns."
            : "There are no campaigns available at the moment."
        }
        icon={hasFilters ? "filter" : "default"}
        showReset={hasFilters}
        onReset={onResetFilters}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} {...campaign} />
      ))}
    </div>
  );
}
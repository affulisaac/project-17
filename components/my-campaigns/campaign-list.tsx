"use client";

import { CampaignCard } from "@/components/my-campaigns/campaign-card";
import type { CampaignStatus } from "./my-campaigns-view";

interface CampaignListProps {
  status: CampaignStatus;
  searchQuery: string;
}

// Mock data - in a real app, this would come from an API
const campaigns = {
  active: [
    {
      id: "1",
      title: "EcoTech Solar Solutions",
      description: "Revolutionary solar panels with 50% more efficiency",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=60",
      goal: 500000,
      raised: 375000,
      backers: 1234,
      daysLeft: 15,
      status: "active" as CampaignStatus,
    },
    {
      id: "2",
      title: "HealthAI Diagnostics",
      description: "AI-powered medical diagnostic tool",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
      goal: 1000000,
      raised: 850000,
      backers: 2156,
      daysLeft: 20,
      status: "active" as CampaignStatus,
    },
  ],
  draft: [
    {
      id: "3",
      title: "Smart Home Automation",
      description: "Next-generation home automation system",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60",
      goal: 300000,
      raised: 0,
      backers: 0,
      daysLeft: 0,
      status: "draft" as CampaignStatus,
    },
  ],
  funded: [
    {
      id: "4",
      title: "Sustainable Fashion Line",
      description: "Eco-friendly fashion using recycled materials",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60",
      goal: 250000,
      raised: 250000,
      backers: 1890,
      daysLeft: 0,
      status: "funded" as CampaignStatus,
    },
  ],
  completed: [
    {
      id: "5",
      title: "Urban Farming Initiative",
      description: "Vertical farming solution for urban areas",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
      goal: 400000,
      raised: 425000,
      backers: 2450,
      daysLeft: 0,
      status: "completed" as CampaignStatus,
    },
  ],
};

export function CampaignList({ status, searchQuery }: CampaignListProps) {
  const filteredCampaigns = (campaigns[status] || []).filter((campaign) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      campaign.title.toLowerCase().includes(searchLower) ||
      campaign.description.toLowerCase().includes(searchLower)
    );
  });

  if (filteredCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {searchQuery
            ? "No campaigns found matching your search"
            : "No campaigns found"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {filteredCampaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          {...campaign}
          showManageButton
          status={campaign.status}
        />
      ))}
    </div>
  );
}
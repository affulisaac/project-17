"use client";

import { useState } from "react";
import { CampaignList } from "./campaign-list";
import { CampaignStats } from "./campaign-stats";
import { CampaignFilters } from "./campaign-filters";

export type CampaignStatus = "draft" | "active" | "funded" | "completed";

export function MyCampaignsView() {
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus>("active");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">My Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your campaign performance
          </p>
        </header>

        <CampaignStats />
        <CampaignFilters 
          selectedStatus={selectedStatus} 
          onStatusChange={setSelectedStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CampaignList 
          status={selectedStatus}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
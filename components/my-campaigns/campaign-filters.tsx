"use client";

import { Button } from "@/components/ui/button";
import { CampaignSearch } from "./campaign-search";
import type { CampaignStatus } from "./my-campaigns-view";

interface CampaignFiltersProps {
  selectedStatus: CampaignStatus;
  onStatusChange: (status: CampaignStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const statusFilters: { label: string; value: CampaignStatus }[] = [
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Funded", value: "funded" },
  { label: "Completed", value: "completed" },
];

export function CampaignFilters({
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: CampaignFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={selectedStatus === filter.value ? "default" : "outline"}
            onClick={() => onStatusChange(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      <CampaignSearch
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
}
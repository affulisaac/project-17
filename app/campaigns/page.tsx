"use client";

import { CampaignList } from "@/components/campaigns/campaign-list";
import { CampaignFilters } from "@/components/campaigns/campaign-filters";
import { Pagination } from "@/components/ui/pagination";
import { useCampaignFilters } from "@/hooks/use-campaign-filters";
import { CAMPAIGNS } from "@/config/campaign";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ITEMS_PER_PAGE = 9;

export default function CampaignsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const decodedCategory = categoryParam ? decodeURIComponent(categoryParam) : undefined;
  
  const { filters, actions, filteredCampaigns } = useCampaignFilters(
    CAMPAIGNS,
    decodedCategory
  );

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = filters.search || 
    filters.categories.length > 0 || 
    filters.stages.length > 0 ||
    filters.fundingRange[0] > 0 ||
    filters.fundingRange[1] < 1000000;

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Investment Opportunities</h1>
          <p className="text-muted-foreground mt-1">
            Discover and invest in promising ventures
          </p>
        </header>

        <CampaignFilters filters={filters} actions={actions} />
        
        <CampaignList 
          campaigns={paginatedCampaigns}
          hasFilters={hasActiveFilters}
          onResetFilters={actions.clearFilters}
        />
        
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
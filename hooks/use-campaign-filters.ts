import { useState, useCallback, useMemo, useEffect } from 'react';
import type { FilterState, FilterActions, Campaign, SortOption } from '@/types/campaign';
import { filterCampaigns, sortCampaigns } from '@/services/campaign';


// function sortCampaigns(campaigns: Campaign[], sortBy: SortOption): Campaign[] {
//     switch (sortBy) {
//         case 'newest':
//             return campaigns.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         case 'raised':
//             return campaigns.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
//         case 'goal':
//             return campaigns.sort((a, b) => b.goal - a.goal);
//         case 'backers':
//             return campaigns.sort((a, b) => a.backers - b.backers);
//         default:
//             return campaigns;
//     }
// }

// function filterCampaigns(
//     campaigns: Campaign[],
//     search: string,
//     categories: string[],
//     stages: string[],
//     fundingRange: [number, number]
// ): Campaign[] {
//     return campaigns.filter(campaign => {
//         const matchesSearch = campaign.title.toLowerCase().includes(search.toLowerCase());
//         const matchesCategory = categories.length === 0 || categories.includes(campaign.category);
//         const matchesStage = stages.length === 0 || stages.includes(campaign.stage);
//         const matchesFundingRange = campaign.raised >= fundingRange[0] && campaign.raised <= fundingRange[1];

//         return matchesSearch && matchesCategory && matchesStage && matchesFundingRange;
//     });
// }

const initialState: FilterState = {
  search: '',
  categories: [],
  stages: [],
  fundingRange: [0, 1000000],
  sortBy: 'newest'
};

export function useCampaignFilters(campaigns: Campaign[], initialCategory?: string) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...initialState,
    categories: initialCategory ? [initialCategory] : []
  }));

  // Handle initial category from URL
  useEffect(() => {
    if (initialCategory && !filters.categories.includes(initialCategory)) {
      setFilters(prev => ({
        ...prev,
        categories: [initialCategory]
      }));
    }
  }, [initialCategory]);

  const actions: FilterActions = {
    setSearch: useCallback((search: string) => {
      setFilters(prev => ({ ...prev, search }));
    }, []),

    toggleCategory: useCallback((category: string) => {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [category] // Replace existing categories instead of adding
      }));
    }, []),

    toggleStage: useCallback((stage: string) => {
      setFilters(prev => ({
        ...prev,
        stages: prev.stages.includes(stage)
          ? prev.stages.filter(s => s !== stage)
          : [...prev.stages, stage]
      }));
    }, []),

    setFundingRange: useCallback((range: [number, number]) => {
      setFilters(prev => ({ ...prev, fundingRange: range }));
    }, []),

    setSortBy: useCallback((sortBy: SortOption) => {
      setFilters(prev => ({ ...prev, sortBy }));
    }, []),

    clearFilters: useCallback(() => {
      setFilters(initialState);
    }, [])
  };

  const filteredCampaigns = useMemo(() => {
    const filtered = filterCampaigns(
      campaigns,
      filters.search,
      filters.categories,
      filters.stages,
      filters.fundingRange
    );
    return sortCampaigns(filtered, filters.sortBy);
  }, [campaigns, filters]);

  return {
    filters,
    actions,
    filteredCampaigns
  };
}
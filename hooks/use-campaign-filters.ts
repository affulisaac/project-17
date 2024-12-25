// import { useState, useCallback, useMemo, useEffect } from 'react';
// import type { FilterState, FilterActions, Campaign, SortOption } from '@/types/campaign';
// import { filterCampaigns, sortCampaigns } from '@/services/campaign';

// const initialState: FilterState = {
//   search: '',
//   categories: [],
//   stages: [],
//   fundingRange: [0, 1000000],
//   sortBy: 'newest'
// };

// export function useCampaignFilters(campaigns: Campaign[], initialCategory?: string) {
//   const [filters, setFilters] = useState<FilterState>(() => ({
//     ...initialState,
//     categories: initialCategory ? [initialCategory] : []
//   }));

//   // Handle initial category from URL
//   useEffect(() => {
//     if (initialCategory && !filters.categories.includes(initialCategory)) {
//       setFilters(prev => ({
//         ...prev,
//         categories: [initialCategory]
//       }));
//     }
//   }, [initialCategory]);

//   const actions: FilterActions = {
//     setSearch: useCallback((search: string) => {
//       setFilters(prev => ({ ...prev, search }));
//     }, []),

//     toggleCategory: useCallback((category: string) => {
//       setFilters(prev => ({
//         ...prev,
//         categories: prev.categories.includes(category)
//           ? prev.categories.filter(c => c !== category)
//           : [category] // Replace existing categories instead of adding
//       }));
//     }, []),

//     toggleStage: useCallback((stage: string) => {
//       setFilters(prev => ({
//         ...prev,
//         stages: prev.stages.includes(stage)
//           ? prev.stages.filter(s => s !== stage)
//           : [...prev.stages, stage]
//       }));
//     }, []),

//     setFundingRange: useCallback((range: [number, number]) => {
//       setFilters(prev => ({ ...prev, fundingRange: range }));
//     }, []),

//     setSortBy: useCallback((sortBy: SortOption) => {
//       setFilters(prev => ({ ...prev, sortBy }));
//     }, []),

//     clearFilters: useCallback(() => {
//       setFilters(initialState);
//     }, [])
//   };

//   const filteredCampaigns = useMemo(() => {
//     const filtered = filterCampaigns(
//       campaigns,
//       filters.search,
//       filters.categories,
//       filters.stages,
//       filters.fundingRange
//     );
//     return sortCampaigns(filtered, filters.sortBy);
//   }, [campaigns, filters]);

//   return {
//     filters,
//     actions,
//     filteredCampaigns
//   };
// }
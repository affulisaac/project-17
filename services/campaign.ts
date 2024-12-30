import { CAMPAIGNS } from '@/config/campaign'
import { saveCampaignBasicDetail, saveMilestones, updateCampaignDetail, saveReturnProjections } from '@/lib/queries/campaign'
import { Campaign, CampaignMilestone, SortOption } from '@/types/campaign'
import { CampaignDetail } from '@/types/campaign'

export const campaignService = {


  getCampaignById(id: string): Campaign | undefined {
    //get campaign from dummy data
   return CAMPAIGNS.find((campaign) => campaign.id == id)
  },

  createBasicCampaignDetails(data: Omit<Partial<CampaignDetail>, 'id'>) {
    return saveCampaignBasicDetail(data as any)
  },

  createMilestone(data: CampaignMilestone[]) {
    return saveMilestones(data)
  },

  createReturnProjections(projections: any[]) {
    return saveReturnProjections(projections)
  },

  updateCampaignDetail<T>(id: string, data: Partial<T>) {
    return updateCampaignDetail(id, data)
  },

  deleteCampaign(id: string) {
    // return campaignService.deleteCampaign(id)
  }

  


}

export function filterCampaigns(
  campaigns: Campaign[],
  search: string,
  categories: string[],
  stages: string[],
  fundingRange: [number, number]
): Campaign[] {
  return campaigns.filter((campaign) => {
    // Case-insensitive search
    const matchesSearch =
      !search ||
      campaign.title.toLowerCase().includes(search.toLowerCase()) ||
      campaign.description.toLowerCase().includes(search.toLowerCase());

    // Exact category matching
    const matchesCategory =
      categories.length === 0 ||
      categories.some(
        (cat) => campaign.category.toLowerCase() === cat.toLowerCase()
      );

    // Stage matching
    const matchesStage = stages.length === 0 || stages.includes(campaign.stage);

    // Funding range
    const matchesFunding =
      campaign.goal >= fundingRange[0] && campaign.goal <= fundingRange[1];

    return matchesSearch && matchesCategory && matchesStage && matchesFunding;
  });
}

export function sortCampaigns(
  campaigns: Campaign[],
  sortBy: SortOption
): Campaign[] {
  return [...campaigns].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'raised':
        return b.raised - a.raised;
      case 'goal':
        return b.goal - a.goal;
      case 'backers':
        return b.backers - a.backers;
      default:
        return 0;
    }
  });
}
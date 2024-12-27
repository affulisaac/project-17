import { CAMPAIGNS } from '@/config/campaign'
import { saveCampaignBasicDetail, saveMilestones, updateCampaignDetail, saveReturnProjections } from '@/lib/queries/campaign'
import { Campaign, CampaignMilestone } from '@/types/campaign'
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
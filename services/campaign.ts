import { CAMPAIGNS } from '@/config/campaign'
import { createCampaignQuery } from '@/lib/queries/campaign'
import { transformData } from '@/lib/utils'
import { Campaign } from '@/types/campaign'

export const campaignService = {

  getCampaign() {
    
  },

  getCampaignById(id: string): Campaign | undefined {
    //get campaign from dummy data
   return CAMPAIGNS.find((campaign) => campaign.id == id)
  },

  createCampaign(data: Omit<Campaign, 'id'>) {
    return createCampaignQuery(data as any)
  },

  updateCampaign(id: string, data: Partial<Campaign>) {
    // return campaignService.updateCampaign(id, data)
  },

  deleteCampaign(id: string) {
    // return campaignService.deleteCampaign(id)
  }

}
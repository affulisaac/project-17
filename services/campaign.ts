import { CAMPAIGNS } from '@/config/campaign'
import { saveCampaignBasicDetail, updateCampaignDetail  } from '@/lib/queries/campaign'
import { transformData } from '@/lib/utils'
import { Campaign } from '@/types/campaign'
import { CampaignDetail } from '@/types/campaign'

export const campaignService = {

  getCampaign() {
    
  },

  getCampaignById(id: string): Campaign | undefined {
    //get campaign from dummy data
   return CAMPAIGNS.find((campaign) => campaign.id == id)
  },

  createBasicCampaignDetails(data: Omit<Partial<CampaignDetail>, 'id'>) {
    return saveCampaignBasicDetail(data as any)
  },

  updateCampaignDetail<T>(id: string, data: Partial<T>) {
    return updateCampaignDetail(id, data)
  },

  // updateCampaign(id: string, data: Partial<Campaign>) {
  //   // return campaignService.updateCampaign(id, data)
  // },

  deleteCampaign(id: string) {
    // return campaignService.deleteCampaign(id)
  }

}
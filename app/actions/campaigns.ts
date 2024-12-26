'use server'

import { campaignService } from "@/services/campaign";

//Get all campaigns
export async function getCampaign() {}

//Get a campaign by id
export async function getCampaignById(id: string) {
   return campaignService.getCampaignById(id)
}


//Create a basic  campaign details
export async function createCampaign<T = any>(data:  Partial<T>) {
   
  return campaignService.createBasicCampaignDetails(data as any)
}

//Update a campaign
export async function updateCampaign<T >(id: string, data: Partial<T>) {
   return campaignService.updateCampaignDetail(id, data)
}

//Delete a campaign
export async function deleteCampaign(id: string) {}
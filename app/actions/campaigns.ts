'use server'

import { Campaign, CampaignCreate } from "@/types/supabase";
import { campaignService } from "@/services/campaign";
import { ApiErrorHandler } from "@/lib/errors";

//Get all campaigns
export async function getCampaign() {}

//Get a campaign by id
export async function getCampaignById(id: string) {}


//Create a new campaign
export async function createCampaign(data: Omit<CampaignCreate, 'id'>) {
   try {
      const response = campaignService.createCampaign(data as any)
      return response
   } catch (error) {
   }

} 

//Update a campaign
export async function updateCampaign(id: string, data: Partial<Campaign>) {}

//Delete a campaign
export async function deleteCampaign(id: string) {}
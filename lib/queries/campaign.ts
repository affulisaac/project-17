import { createClient } from '@/lib/supabase/server';
import { ApiErrorHandler } from '../errors';
import { CampaignBasicDetails, CampaignMilestone } from '@/types/campaign';
import { convertObjectToSnakeCase } from '../utils';

export async function saveCampaignBasicDetail(data: CampaignBasicDetails) {
  console.log('data', data);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw ApiErrorHandler.unauthorized('User not found');
  }
  const convertObj = convertObjectToSnakeCase(data);
  console.log('convertObj', convertObj);
  const { data: campaign, error } = await supabase
    .from('campaign_details')
    .insert<CampaignBasicDetails>({
      user_id: user.id,
      ...convertObj
    })
    .select()
    .single();

  if (error) throw error;
  return campaign;
}

export async function updateCampaignDetail<T>(campaignId: string, data: Partial<T>) {
  console.log('data', data);
  const convertObj = convertObjectToSnakeCase(data);
  const supabase = await createClient();
  const { data: campaign, error } = await supabase
    .from('campaign_details')
    .update(convertObj)
    .eq('id', campaignId)
    .select()
    .single();

  if (error) throw error;
  return campaign;
}

export async function saveMilestones<T=any>(milestone: CampaignMilestone[]) {
  console.log('data', milestone);
  const supabase = await createClient();
  const { data: campaign, error } = await supabase
    .from('milestones')
    .insert<CampaignMilestone[]>(milestone)
    .select();

  console.log('error', error);
  if (error) throw error;
  console.log('campaign', campaign);
  return campaign;
}

export async function saveReturnProjections(projections: any[]) {
  const supabase = await createClient();
  const { data: campaign, error } = await supabase
    .from('return_projections')
    .insert(projections)
    .select();

  if (error) throw error;
  return campaign;
}


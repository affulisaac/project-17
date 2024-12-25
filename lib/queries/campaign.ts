
import type { Campaign, CampaignCreate } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';
import { ApiErrorHandler } from '../errors';

export async function createCampaignQuery(data:
  {
    campaign: Omit<CampaignCreate, 'image_url'>;
    details: {
      businessType: 'idea' | 'started' | 'unstarted';
      marketResearch?: string;
      businessPlan?: string;
      currentOperations?: string;
      problemStatement?: string;
      solution?: string;
    };
    returns: {
      model: 'profit-sharing' | 'equity' | 'revenue-sharing';
      percentage: number;
      minimumInvestment: number;
      terms: string;
      projections: Array<{ year: number; amount: number; }>;
    };
    media: {
      images: File[];
      video?: string;
      documents?: File[];
    };
    visibility: {
      type: 'public' | 'private';
      featured: boolean;
      allowMessages: boolean;
      showTeam: boolean;
      invitedEmails?: string[];
    };
  }
) {
  const { campaign, details, returns, media, visibility } = data;
  console.log({campaign, details, returns, media, visibility});
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw ApiErrorHandler.unauthorized('Unauthorized', { message: 'User not found' });

  try {

    // 2. Create campaign
    const preparedData = {
      // creator_id: user.id,
      title: campaign.title,
      description: campaign.description,
      category: campaign.category,
      funding_goal: campaign.fundingGoal,
      market_research: details.marketResearch,
    }
    console.log({preparedData});
    const { data: campaignData, error: campaignError } = await supabase
      .from('campaign_details')
      .insert([preparedData])
      .select()
      .single();

      console.log({campaignError});
    if (campaignError) throw campaignError;
    return campaignData;

  } catch (error) {
    // In case of error, attempt to clean up any uploaded files
    // This would need proper error handling in production
    throw error;
  }
}


export async function getCampaigns(filters?: {
  category?: string;
  stage?: string;
  status?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from('campaigns')
    .select(`
      *,
      creator:users(full_name, avatar_url),
      milestones(*),
      team_members(*),
      updates(*)
    `);

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.stage) {
    query = query.eq('stage', filters.stage);
  }
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getCampaign(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      creator:users(full_name, avatar_url),
      milestones(*),
      team_members(*),
      updates(*),
      documents(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createCampaign(campaign: CampaignCreate) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('campaigns')
    .insert([campaign])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCampaign(id: string, updates: Partial<Campaign>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('campaigns_details')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCampaign(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
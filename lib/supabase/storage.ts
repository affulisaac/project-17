import { createClient } from './client';

export async function uploadCampaignImage(campaignId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const filePath = `campaigns/${campaignId}/images/${Date.now()}.${fileExt}`;
  const supabase = createClient()

  const { error: uploadError } = await supabase.storage
    .from('campaign-media')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('campaign-media')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function uploadCampaignDocument(
  campaignId: string,
  file: File,
  type: string
) {
  const fileExt = file.name.split('.').pop();
  const filePath = `campaigns/${campaignId}/documents/${Date.now()}.${fileExt}`;
  const supabase = createClient()

  const { error: uploadError } = await supabase.storage
    .from('campaign-media')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('campaign-media')
    .getPublicUrl(filePath);

  const { error: docError } = await supabase
    .from('documents')
    .insert([{
      campaign_id: campaignId,
      name: file.name,
      type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      url: publicUrl
    }]);

  if (docError) throw docError;

  return publicUrl;
}
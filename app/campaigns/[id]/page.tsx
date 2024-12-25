"use client"
import { campaignService, } from '@/services/campaign';
import CampaignDetails from '@/components/campaigns/campaign-details';
import { useParams } from 'next/navigation';
import CampaignNotFound from './not-found';


export default function CampaignPage() {
  const params = useParams();
  const campaign = campaignService.getCampaignById(params.id as string);

  if (!campaign) {
    return (
     <CampaignNotFound />
    );
  }
  return <CampaignDetails campaign={campaign} />;
}

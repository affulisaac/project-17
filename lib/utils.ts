import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Campaign } from '@/types/campaign';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatCampaignStats(campaign: Campaign) {
  return {
    progress: Math.round((campaign.raised / campaign.goal) * 100),
    raisedFormatted: campaign.raised.toLocaleString(),
    goalFormatted: campaign.goal.toLocaleString(),
  };
}

export function transformData(data: any) {
  return {
      campaign: {
          ...data,
          image_url: undefined
      },
      details: {
          businessType: data?.businessType as 'idea' | 'started' | 'unstarted',
          marketResearch: data?.marketResearch,
          problemStatement: data?.concept?.problem,
          businessPlan: data?.concept?.plan,
          solution: data?.concept?.solution
      },
      returns: {
          model: data?.returns?.model as 'profit-sharing' | 'equity' | 'revenue-sharing',
          percentage: data?.returns?.percentage,
          minimumInvestment: 0, // Assuming a default value as it's not present in the original data
          terms: data?.returns?.terms,
          projections: data?.returns?.projections
      },
      media: {
          images: [], // Assuming an empty array as the original data has an empty array for images
          video: data?.video,
          documents: [] // Assuming an empty array as the original data has an empty array for documents
      },
      visibility: {
          type: data?.visibility?.type as 'public' | 'private',
          featured: data?.visibility?.featured,
          allowMessages: data?.visibility?.allowMessages,
          showTeam: data?.visibility?.showTeam,
          invitedEmails: data?.visibility?.invitedEmails
      }
  };
}

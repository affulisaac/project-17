"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Calendar } from "lucide-react";
import type { Campaign } from "@/types/campaign";
import { formatCampaignStats } from "@/lib/utils";

interface CampaignStatsProps {
  campaign: Campaign;
}

export function CampaignStats({ campaign }: CampaignStatsProps) {
  const { progress, raisedFormatted, goalFormatted } = formatCampaignStats(campaign);

  return (
    <Card className="p-6">
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">Raised</p>
          <p className="text-2xl font-bold">${raisedFormatted}</p>
          <p className="text-sm text-muted-foreground mt-1">
            of ${goalFormatted}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Backers</p>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <p className="text-2xl font-bold">{campaign.backers}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Progress</p>
          <p className="text-2xl font-bold">{progress}%</p>
          <Progress value={progress} className="mt-2 h-2" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Created</p>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <p className="text-lg">
              {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
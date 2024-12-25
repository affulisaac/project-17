"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import type { Campaign } from "@/types/campaign";

interface CampaignHeaderProps {
  campaign: Campaign;
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.title}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary">{campaign.category}</Badge>
            <Badge variant="outline">{campaign.stage}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
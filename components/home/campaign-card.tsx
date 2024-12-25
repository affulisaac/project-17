"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { formatCampaignStats } from "@/lib/utils";
import type { Campaign } from "@/types/campaign";

interface CampaignCardProps extends Partial<Campaign> {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  backers: number;
  category: string;
  status?: string;
}

export function CampaignCard({
  id,
  title,
  description,
  image,
  goal,
  raised,
  backers,
  category,
  status = "Established Business",
}: CampaignCardProps) {
  const { progress, raisedFormatted, goalFormatted } = formatCampaignStats({ 
    goal, raised 
  } as Campaign);

  return (
    <Link href={`/campaigns/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="flex gap-2 mb-3">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">{status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Raised: ${raisedFormatted}</span>
                <span>Goal: ${goalFormatted}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{backers} investors</span>
              <span className="text-primary">View Details</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
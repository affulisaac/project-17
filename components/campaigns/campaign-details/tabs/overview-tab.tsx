"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Rocket } from "lucide-react";
import type { Campaign } from "@/types/campaign";

interface OverviewTabProps {
  campaign: Campaign;
  onInvest: () => void;
  onContact: () => void;
}

export function OverviewTab({ campaign, onInvest, onContact }: OverviewTabProps) {
  return (
    <Card className="p-6">
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-4">About the Campaign</h3>
        <p className="text-muted-foreground whitespace-pre-wrap">
          {campaign.description}
        </p>
      </div>

      <div className="mt-6 flex gap-4">
        <Button 
          className="flex-1"
          onClick={onInvest}
        >
          <Rocket className="mr-2 h-4 w-4" />
          Invest Now
        </Button>
        <Button 
          variant="outline"
          onClick={onContact}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Team
        </Button>
      </div>
    </Card>
  );
}
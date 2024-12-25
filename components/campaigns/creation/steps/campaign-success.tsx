"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Eye, Share2 } from "lucide-react";
import Link from "next/link";

interface CampaignSuccessProps {
  campaignId?: string;
}

export function CampaignSuccess({ campaignId }: CampaignSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-4">Campaign Submitted Successfully!</h1>
        <p className="text-muted-foreground mt-2">
          Your campaign has been submitted and is now under review
        </p>
      </div>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Review Time</p>
              <p className="font-medium">24-48 hours</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="text-left space-y-2">
            <h3 className="font-medium">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>1. Our team will review your campaign details</li>
              <li>2. You'll receive an email once the review is complete</li>
              <li>3. If approved, your campaign will go live immediately</li>
              <li>4. You can make updates to your campaign while waiting</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/my-campaigns">
            View My Campaigns
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
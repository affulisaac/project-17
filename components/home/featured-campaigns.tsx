"use client";

import { Button } from "@/components/ui/button";
import { CampaignCard } from "./campaign-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CAMPAIGNS } from "@/config/campaign";

export function FeaturedCampaigns() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Campaigns</h2>
        <Button variant="ghost" asChild>
          <Link href="/campaigns" className="gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CAMPAIGNS.map((campaign) => (
          <CampaignCard key={campaign.id} {...campaign} />
        ))}
      </div>
    </section>
  );
}
"use client";

import { FeaturedCampaigns } from "./featured-campaigns";
import { TrendingCategories } from "./trending-categories";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function HomeView() {
  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Discover Campaigns</h1>
            <p className="text-muted-foreground">
              Explore innovative projects and investment opportunities
            </p>
          </div>
          <Link href="/campaigns/create">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Campaign
            </Button>
          </Link>
        </header>
        
        <TrendingCategories />
        <FeaturedCampaigns />
      </div>
    </div>
  );
}
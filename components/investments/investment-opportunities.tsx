"use client";

import { CampaignCard } from "@/components/home/campaign-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export function InvestmentOpportunities() {
  // Sample data - in a real app, this would come from an API
  const opportunities = [
    {
      title: "AI-Powered Healthcare Platform",
      description: "Revolutionary healthcare platform using artificial intelligence for early disease detection and personalized treatment recommendations.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
      goal: 1000000,
      raised: 750000,
      backers: 156,
      daysLeft: 20,
    },
    {
      title: "Sustainable Urban Farming",
      description: "Innovative vertical farming solution for urban areas, reducing water usage and increasing crop yields.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=60",
      goal: 500000,
      raised: 325000,
      backers: 89,
      daysLeft: 15,
    },
  ];

  return (
    <div className="space-y-6 mt-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {opportunities.map((opportunity) => (
          <CampaignCard
            key={opportunity.title}
            {...opportunity}
          />
        ))}
      </div>
    </div>
  );
}
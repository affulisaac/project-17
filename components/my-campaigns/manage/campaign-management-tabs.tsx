"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignUpdates } from "./campaign-updates";
import { CampaignInvestors } from "./campaign-investors";
import { CampaignMilestones } from "./campaign-milestones";
import { CampaignFinancials } from "./campaign-financials";
import { CampaignDisputes } from "./campaign-disputes";
import type { CampaignStatus } from "../my-campaigns-view";

interface CampaignManagementTabsProps {
  campaign: {
    id: string;
    title: string;
    description: string;
    goal: number;
    raised: number;
    status: CampaignStatus;
    image: string;
  };
}

export function CampaignManagementTabs({ campaign }: CampaignManagementTabsProps) {
  return (
    <Tabs defaultValue="updates" className="space-y-4">
      <TabsList>
        <TabsTrigger value="updates">Updates</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="investors">Investors</TabsTrigger>
        <TabsTrigger value="financials">Financials</TabsTrigger>
        <TabsTrigger value="disputes">Disputes</TabsTrigger>
      </TabsList>

      <TabsContent value="updates">
        <CampaignUpdates />
      </TabsContent>

      <TabsContent value="milestones">
        <CampaignMilestones campaign={campaign} />
      </TabsContent>

      <TabsContent value="investors">
        <CampaignInvestors />
      </TabsContent>

      <TabsContent value="financials">
        <CampaignFinancials campaign={campaign} />
      </TabsContent>

      <TabsContent value="disputes">
        <CampaignDisputes campaign={campaign} />
      </TabsContent>
    </Tabs>
  );
}
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./tabs/overview-tab";
import { DocumentsTab } from "./tabs/documents-tab";
import { TeamTab } from "./tabs/team-tab";
import { UpdatesTab } from "./tabs/updates-tab";
import { InvestmentDialog } from "../investment-dialog";
import { ContactTeamDialog } from "../contact-team-dialog";
import type { Campaign ,  CampaignDocument,  CampaignTeamMember, CampaignUpdate } from "@/types/campaign";


interface CampaignTabsProps {
  campaign: Campaign;
  documents: CampaignDocument[];
  teamMembers: CampaignTeamMember[];
  updates: CampaignUpdate[];
}

export function CampaignTabs({ 
  campaign,
  documents,
  teamMembers,
  updates,
}: CampaignTabsProps) {
  const [showInvestDialog, setShowInvestDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  return (
    <>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab 
            campaign={campaign}
            onInvest={() => setShowInvestDialog(true)}
            onContact={() => setShowContactDialog(true)}
          />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab documents={documents} />
        </TabsContent>

        <TabsContent value="updates">
          <UpdatesTab updates={updates} />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab 
            members={teamMembers}
            onContactMember={() => setShowContactDialog(true)}
          />
        </TabsContent>
      </Tabs>

      <InvestmentDialog
        open={showInvestDialog}
        onOpenChange={setShowInvestDialog}
        campaign={campaign}
      />

      <ContactTeamDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        campaign={campaign}
      />
    </>
  );
}
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CampaignManagementTabs } from "./manage/campaign-management-tabs";
import type { CampaignStatus } from "./my-campaigns-view";

interface ManageCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function ManageCampaignDialog({
  open,
  onOpenChange,
  campaign,
}: ManageCampaignDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Manage Campaign: {campaign.title}</DialogTitle>
        </DialogHeader>
        <CampaignManagementTabs campaign={campaign} />
      </DialogContent>
    </Dialog>
  );
}
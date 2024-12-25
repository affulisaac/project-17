"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { CampaignStatus } from "../my-campaigns-view";

interface CampaignSettingsProps {
  campaign: {
    id: string;
    status: CampaignStatus;
  };
}

export function CampaignSettings({ campaign }: CampaignSettingsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Campaign Settings</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Campaign</Label>
              <p className="text-sm text-muted-foreground">
                Make your campaign visible to all users
              </p>
            </div>
            <Switch defaultChecked={campaign.status === "active"} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Comments</Label>
              <p className="text-sm text-muted-foreground">
                Let investors comment on your campaign
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your campaign
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
        <div className="space-y-4">
          {campaign.status === "active" ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pause Campaign</p>
                <p className="text-sm text-muted-foreground">
                  Temporarily hide your campaign from investors
                </p>
              </div>
              <Button variant="outline">Pause Campaign</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Resume Campaign</p>
                <p className="text-sm text-muted-foreground">
                  Make your campaign visible to investors again
                </p>
              </div>
              <Button variant="outline">Resume Campaign</Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-destructive">Delete Campaign</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete this campaign and all its data
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Campaign</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this campaign? This action
                    cannot be undone and all data will be permanently lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                    Delete Campaign
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>
    </div>
  );
}
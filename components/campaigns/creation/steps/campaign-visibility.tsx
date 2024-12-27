"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Lock, AlertCircle } from "lucide-react";

interface CampaignVisibilityProps {
  data: {
      visibility_type: "public" | "private";
      featured?: boolean;
      allow_messages?: boolean;
      show_team?: boolean;
      invited_emails?: string[];
      custom_message?: string;
  };
  onUpdate: (data: any) => void;
}

export function CampaignVisibility({ data, onUpdate }: CampaignVisibilityProps) {
  const visibility = data || {
    visibility_type: "public",
    featured: false,
    allow_messages: true,
    show_team: true,
  };

  console.log(visibility);

  const handleVisibilityChange = (type: "public" | "private") => {
    onUpdate({
      ...data,
      ...visibility, type ,
    });
  };

  const handleToggle = (field: keyof typeof visibility) => {
    onUpdate({
      ...data,
        [field]: !visibility[field],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Campaign Visibility</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Configure who can view and interact with your campaign
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          className={`p-6 cursor-pointer transition-all ${
            visibility.visibility_type === "public"
              ? "ring-2 ring-primary"
              : "hover:bg-accent"
          }`}
          onClick={() => handleVisibilityChange("public")}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Public Campaign</h3>
                <Badge variant="secondary">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Visible to all users on the platform
              </p>
            </div>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all ${
            visibility.visibility_type === "private"
              ? "ring-2 ring-primary"
              : "hover:bg-accent"
          }`}
          onClick={() => handleVisibilityChange("private")}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Private Campaign</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Only visible to invited investors
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Visibility Settings</h3>
        <div className="space-y-6">
          {visibility.visibility_type === "public" && (
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Featured Campaign</Label>
                <p className="text-sm text-muted-foreground">
                  Allow your campaign to be featured on the platform
                </p>
              </div>
              <Switch
                checked={visibility.featured}
                onCheckedChange={() => handleToggle("featured")}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Allow Messages</Label>
              <p className="text-sm text-muted-foreground">
                Let investors send you direct messages
              </p>
            </div>
            <Switch
              checked={visibility.allow_messages}
              onCheckedChange={() => handleToggle("allow_messages")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Team Information</Label>
              <p className="text-sm text-muted-foreground">
                Display team members and their roles
              </p>
            </div>
            <Switch
              checked={visibility.show_team}
              onCheckedChange={() => handleToggle("show_team")}
            />
          </div>
        </div>
      </Card>

      {visibility.visibility_type === "private" && (
        <Card className="p-6 space-y-6">
          <div>
            <Label>Invited Investors</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Enter email addresses of investors you want to invite
            </p>
            <Textarea
              placeholder="Enter email addresses (one per line)"
              value={visibility.invited_emails?.join("\n") || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  visibility: {
                    ...visibility,
                    invitedEmails: e.target.value.split("\n").filter(Boolean),
                  },
                })
              }
              rows={4}
            />
          </div>

          <div>
            <Label>Custom Message</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Add a personal message to your invitations
            </p>
            <Textarea
              placeholder="Enter your message to invited investors..."
              value={visibility.custom_message || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  visibility: {
                    ...visibility,
                    customMessage: e.target.value,
                  },
                })
              }
              rows={4}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
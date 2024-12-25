"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: {
      newMessages: true,
      newConnections: true,
      campaignUpdates: true,
      investmentOpportunities: true,
      marketingEmails: false,
    },
    pushNotifications: {
      newMessages: true,
      newConnections: true,
      campaignUpdates: false,
      investmentOpportunities: false,
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to update settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`email-${key}`} className="flex-1">
                {key.split(/(?=[A-Z])/).join(" ")}
              </Label>
              <Switch
                id={`email-${key}`}
                checked={value}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    emailNotifications: {
                      ...prev.emailNotifications,
                      [key]: checked,
                    },
                  }))
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`push-${key}`} className="flex-1">
                {key.split(/(?=[A-Z])/).join(" ")}
              </Label>
              <Switch
                id={`push-${key}`}
                checked={value}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    pushNotifications: {
                      ...prev.pushNotifications,
                      [key]: checked,
                    },
                  }))
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { CampaignUpdate } from "@/types/campaign";

interface UpdatesTabProps {
  updates: CampaignUpdate[];
}

export function UpdatesTab({ updates }: UpdatesTabProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <Card key={update.id} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {update.type === 'important' && (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <Badge variant="secondary">{update.type}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(update.date).toLocaleDateString()}
              </span>
            </div>

            <div>
              <h3 className="font-medium">{update.title}</h3>
              <p className="text-muted-foreground mt-2">{update.content}</p>
            </div>

            {update.metrics && update.metrics.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {update.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm">{metric.label}:</span>
                    <span className="text-sm font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}

      {updates.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          No updates available
        </div>
      )}
    </div>
  );
}
"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    name: "Total Raised",
    value: "$1.2M",
    icon: DollarSign,
    change: "+12.3%",
    trend: "up",
  },
  {
    name: "Total Backers",
    value: "3.4K",
    icon: Users,
    change: "+8.2%",
    trend: "up",
  },
  {
    name: "Success Rate",
    value: "92%",
    icon: TrendingUp,
    change: "+5.1%",
    trend: "up",
  },
  {
    name: "Avg. Duration",
    value: "45 days",
    icon: Clock,
    change: "-2.3%",
    trend: "down",
  },
];

export function CampaignStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
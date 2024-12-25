"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lightbulb, Building2, Rocket } from "lucide-react";
import type { BusinessType } from "../campaign-creation-stepper";

interface BusinessTypeSelectionProps {
  data: {
    businessType: BusinessType;
  };
  onUpdate: (data: any) => void;
}

const businessTypes = [
  {
    id: "idea" as BusinessType,
    title: "Idea",
    description: "Have a great idea that needs validation and initial funding",
    icon: Lightbulb,
    details: "Perfect for entrepreneurs with innovative ideas seeking initial support and validation.",
  },
  {
    id: "started" as BusinessType,
    title: "Started Business",
    description: "Existing business looking to expand or raise additional capital",
    icon: Building2,
    details: "Ideal for established businesses seeking growth capital or expansion funding.",
  },
  {
    id: "unstarted" as BusinessType,
    title: "Unstarted Business",
    description: "Ready to launch a business with a solid plan",
    icon: Rocket,
    details: "Suitable for entrepreneurs ready to transform their business plan into reality.",
  },
];

export function BusinessTypeSelection({ data, onUpdate }: BusinessTypeSelectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Select Your Business Type</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the category that best describes your venture
        </p>
      </div>

      <div className="grid gap-4">
        {businessTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all ${
                data.businessType === type.id
                  ? "ring-2 ring-primary"
                  : "hover:bg-accent"
              }`}
              onClick={() => onUpdate({ ...data, businessType: type.id })}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Label className="text-base font-medium">{type.title}</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                  {data.businessType === type.id && (
                    <p className="text-sm mt-2">{type.details}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, GripVertical } from "lucide-react";
import type { CampaignStatus } from "../my-campaigns-view";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  timeline: string;
}

interface CampaignMilestonesProps {
  campaign: {
    id: string;
    goal: number;
    status: CampaignStatus;
  };
}

export function CampaignMilestones({ campaign }: CampaignMilestonesProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "1",
      title: "Initial Development",
      description: "Complete the MVP and basic functionality",
      amount: 50000,
      timeline: "3 months",
    },
  ]);

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      amount: 0,
      timeline: "",
    };
    setMilestones([...milestones, newMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | number) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Milestones</h3>
          <p className="text-sm text-muted-foreground">
            Break down your campaign into achievable milestones
          </p>
        </div>
        <Button onClick={addMilestone}>
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card key={milestone.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="mt-2 cursor-move">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Label>Title</Label>
                    <Input
                      value={milestone.title}
                      onChange={(e) =>
                        updateMilestone(milestone.id, "title", e.target.value)
                      }
                      placeholder="Milestone title"
                    />
                  </div>
                  <div className="w-[150px]">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      value={milestone.amount}
                      onChange={(e) =>
                        updateMilestone(
                          milestone.id,
                          "amount",
                          parseInt(e.target.value)
                        )
                      }
                      placeholder="Amount"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeMilestone(milestone.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={milestone.description}
                    onChange={(e) =>
                      updateMilestone(milestone.id, "description", e.target.value)
                    }
                    placeholder="Describe this milestone"
                  />
                </div>

                <div>
                  <Label>Timeline</Label>
                  <Input
                    value={milestone.timeline}
                    onChange={(e) =>
                      updateMilestone(milestone.id, "timeline", e.target.value)
                    }
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
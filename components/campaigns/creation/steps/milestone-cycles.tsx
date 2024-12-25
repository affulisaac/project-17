"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import type { Milestone } from "../campaign-creation-stepper";

interface MilestoneCyclesProps {
  data: {
    milestones: Milestone[];
    fundingGoal: number;
  };
  onUpdate: (data: any) => void;
}

export function MilestoneCycles({ data, onUpdate }: MilestoneCyclesProps) {
  const handleAddMilestone = () => {
    onUpdate({
      ...data,
      milestones: [
        ...(data.milestones || []),
        {
          title: "",
          description: "",
          amount: 0,
          criteria: "",
          timeline: "",
        },
      ],
    });
  };

  const handleRemoveMilestone = (index: number) => {
    const newMilestones = [...data.milestones];
    newMilestones.splice(index, 1);
    onUpdate({ ...data, milestones: newMilestones });
  };

  const updateMilestone = (index: number, field: keyof Milestone, value: string | number) => {
    const newMilestones = [...data.milestones];
    newMilestones[index] = {
      ...newMilestones[index],
      [field]: value,
    };
    onUpdate({ ...data, milestones: newMilestones });
  };

  const totalAmount = data.milestones.reduce((sum, m) => sum + (m.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Milestone Cycles</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Break down your funding goal into specific milestones
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Total Funding Goal: ${data.fundingGoal?.toLocaleString()}</Label>
            <p className="text-sm text-muted-foreground">
              Remaining to allocate: ${(data.fundingGoal - totalAmount).toLocaleString()}
            </p>
          </div>
          <Button onClick={handleAddMilestone} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>

        <div className="space-y-4">
          {data.milestones.map((milestone, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between mb-4">
                <Label className="text-base font-medium">Milestone {index + 1}</Label>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveMilestone(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, "title", e.target.value)}
                    placeholder="e.g., Product Development Phase 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, "description", e.target.value)}
                    placeholder="Describe what will be achieved in this milestone"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Amount Needed ($)</Label>
                  <Input
                    type="number"
                    value={milestone.amount}
                    onChange={(e) => updateMilestone(index, "amount", parseInt(e.target.value))}
                    placeholder="Enter amount needed for this milestone"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Success Criteria</Label>
                  <Textarea
                    value={milestone.criteria}
                    onChange={(e) => updateMilestone(index, "criteria", e.target.value)}
                    placeholder="Define specific criteria for milestone completion"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <Input
                    value={milestone.timeline}
                    onChange={(e) => updateMilestone(index, "timeline", e.target.value)}
                    placeholder="e.g., 3 months"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
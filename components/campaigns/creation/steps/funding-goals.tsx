"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FundingGoalsProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function FundingGoals({ data, onUpdate }: FundingGoalsProps) {
  const handleAddReward = () => {
    onUpdate({
      ...data,
      rewards: [
        ...(data.rewards || []),
        { title: "", description: "", amount: 0 },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Funding Goals</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Set your funding target and campaign duration
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
          <Input
            id="fundingGoal"
            type="number"
            value={data.fundingGoal}
            onChange={(e) =>
              onUpdate({ ...data, fundingGoal: parseInt(e.target.value) })
            }
            placeholder="Enter your funding goal"
          />
        </div>

        <div className="space-y-4">
          <Label>Campaign Duration (Days): {data.duration}</Label>
          <Slider
            value={[data.duration]}
            onValueChange={([value]) => onUpdate({ ...data, duration: value })}
            max={60}
            min={1}
            step={1}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Reward Tiers</Label>
            <Button onClick={handleAddReward} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Reward
            </Button>
          </div>

          <div className="space-y-4">
            {(data.rewards || []).map((reward: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Reward Title</Label>
                    <Input
                      value={reward.title}
                      onChange={(e) => {
                        const newRewards = [...data.rewards];
                        newRewards[index].title = e.target.value;
                        onUpdate({ ...data, rewards: newRewards });
                      }}
                      placeholder="Early Bird Special"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      value={reward.amount}
                      onChange={(e) => {
                        const newRewards = [...data.rewards];
                        newRewards[index].amount = parseInt(e.target.value);
                        onUpdate({ ...data, rewards: newRewards });
                      }}
                      placeholder="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      value={reward.description}
                      onChange={(e) => {
                        const newRewards = [...data.rewards];
                        newRewards[index].description = e.target.value;
                        onUpdate({ ...data, rewards: newRewards });
                      }}
                      placeholder="Describe the reward"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
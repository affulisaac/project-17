"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BusinessType } from "../campaign-creation-stepper";

interface BusinessStageDetailsProps {
  data: {
    businessType: BusinessType;
    problemStatement: string;
    solution: string;
    marketResearch: string;
    businessStrategy: string;
    requiredResources: string;
    challenges: string;
    revenue: number;
    launchTimeline: string;
    customerBase: number;
    growthRate: number;
    performance: string;
    team: string;
    currentOperations: string;
    numberOfEmployees: number;
  };
  onUpdate: (data: any) => void;
}

export function BusinessStageDetails({
  data,
  onUpdate,
}: BusinessStageDetailsProps) {
  const renderIdeaFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Problem Statement</Label>
          <Textarea
            value={data.problemStatement || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                 problemStatement: e.target.value ,
              })
            }
            placeholder="Describe the problem your idea solves"
            rows={3}
          />
        </div>

        <div>
          <Label>Solution</Label>
          <Textarea
            value={data?.solution || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                solution: e.target.value ,
              })
            }
            placeholder="Explain your proposed solution"
            rows={3}
          />
        </div>

        <div>
          <Label>Market Research</Label>
          <Textarea
            value={data?.marketResearch || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                marketResearch: e.target.value ,
              })
            }
            placeholder="Share your market research findings"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderUnstartedFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Business Strategy</Label>
          <Textarea
            value={data?.businessStrategy || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                businessStrategy: e.target.value,
              })
            }
            placeholder="Outline your business strategy and execution plan"
            rows={3}
          />
        </div>

        <div>
          <Label>Required Resources</Label>
          <Textarea
            value={data?.requiredResources || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                requiredResources: e.target.value,
              })
            }
            placeholder="List the resources needed to start (team, equipment, etc.)"
            rows={3}
          />
        </div>

        <div>
          <Label>Anticipated Challenges</Label>
          <Textarea
            value={data?.challenges || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                challenges: e.target.value,
              })
            }
            placeholder="Describe potential challenges and mitigation strategies"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeline">Launch Timeline</Label>
          <Input  value={data?.launchTimeline || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                launchTimeline: e.target.value,
              })
            } id="timeline" placeholder="e.g., 3 months from funding" />
        </div>
      </div>
    </div>
  );

  const renderStartedFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Current Revenue ($)</Label>
            <Input
              type="number"
              value={data.revenue || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  revenue: parseInt(e.target.value),
                })
              }
              placeholder="Annual revenue"
            />
          </div>
          <div>
            <Label>Customer Base</Label>
            <Input
              type="number"
              value={data.customerBase || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  customerBase: parseInt(e.target.value),
                })
              }
              placeholder="Number of customers"
            />
          </div>
          <div>
            <Label>Growth Rate (%)</Label>
            <Input
              type="number"
              value={data.growthRate || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  growthRate: parseInt(e.target.value),
                })
              }
              placeholder="Annual growth rate"
            />
          </div>
          <div>
            <Label htmlFor="employees">Number of Employees</Label>
            <Input
              value={data.numberOfEmployees || ""}

              id="employees"
              onChange={(e) =>
                onUpdate({
                  ...data,
                  numberOfEmployees: parseInt(e.target.value),
                })
              }
              type="number"
              placeholder="Enter employee count"
            />
          </div>
        </div>

        <div>
          <Label>Business Performance</Label>
          <Textarea
            value={data.performance || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                performance: e.target.value,
              })
            }
            placeholder="Describe your current business performance and market position"
            rows={3}
          />
        </div>

        <div>
          <Label>Team & Operations</Label>
          <Textarea
            value={data?.team || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                team: e.target.value,
              })
            }
            placeholder="Describe your team and current operations"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Business Stage Details</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Provide detailed information about your business stage
        </p>
      </div>

      {data.businessType === "idea" && renderIdeaFields()}
      {data.businessType === "unstarted" && renderUnstartedFields()}
      {data.businessType === "started" && renderStartedFields()}
    </div>
  );
}

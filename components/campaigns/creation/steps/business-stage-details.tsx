"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Lightbulb, Building2, Rocket } from "lucide-react";
import type { BusinessType } from "../campaign-creation-stepper";

interface BusinessStageDetailsProps {
  data: {
    businessType: BusinessType;
    concept?: {
      problem: string;
      solution: string;
      marketResearch: string;
    };
    businessPlan?: {
      strategy: string;
      resources: string;
      challenges: string;
    };
    operations?: {
      metrics: {
        revenue: number;
        customers: number;
        growth: number;
      };
      performance: string;
      team: string;
    };
  };
  onUpdate: (data: any) => void;
}

export function BusinessStageDetails({ data, onUpdate }: BusinessStageDetailsProps) {
  const renderIdeaFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Problem Statement</Label>
          <Textarea
            value={data.concept?.problem || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                concept: { ...data.concept, problem: e.target.value },
              })
            }
            placeholder="Describe the problem your idea solves"
            rows={3}
          />
        </div>

        <div>
          <Label>Solution</Label>
          <Textarea
            value={data.concept?.solution || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                concept: { ...data.concept, solution: e.target.value },
              })
            }
            placeholder="Explain your proposed solution"
            rows={3}
          />
        </div>

        <div>
          <Label>Market Research</Label>
          <Textarea
            value={data.concept?.marketResearch || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                concept: { ...data.concept, marketResearch: e.target.value },
              })
            }
            placeholder="Share your market research findings"
            rows={3}
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Idea Validation Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Clearly define the problem and target audience</li>
              <li>• Include market size and growth potential</li>
              <li>• Highlight your unique value proposition</li>
              <li>• Provide evidence of initial validation or feedback</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderUnstartedFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Business Strategy</Label>
          <Textarea
            value={data.businessPlan?.strategy || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                businessPlan: { ...data.businessPlan, strategy: e.target.value },
              })
            }
            placeholder="Outline your business strategy and execution plan"
            rows={3}
          />
        </div>

        <div>
          <Label>Required Resources</Label>
          <Textarea
            value={data.businessPlan?.resources || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                businessPlan: { ...data.businessPlan, resources: e.target.value },
              })
            }
            placeholder="List the resources needed to start (team, equipment, etc.)"
            rows={3}
          />
        </div>

        <div>
          <Label>Anticipated Challenges</Label>
          <Textarea
            value={data.businessPlan?.challenges || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                businessPlan: { ...data.businessPlan, challenges: e.target.value },
              })
            }
            placeholder="Describe potential challenges and mitigation strategies"
            rows={3}
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Launch Planning Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Detail your go-to-market strategy</li>
              <li>• Include timeline and key milestones</li>
              <li>• Outline required permits or licenses</li>
              <li>• Describe your competitive advantage</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStartedFields = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label>Current Revenue ($)</Label>
            <Input
              type="number"
              value={data.operations?.metrics.revenue || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  operations: {
                    ...data.operations,
                    metrics: {
                      ...data.operations?.metrics,
                      revenue: parseInt(e.target.value),
                    },
                  },
                })
              }
              placeholder="Annual revenue"
            />
          </div>
          <div>
            <Label>Customer Base</Label>
            <Input
              type="number"
              value={data.operations?.metrics.customers || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  operations: {
                    ...data.operations,
                    metrics: {
                      ...data.operations?.metrics,
                      customers: parseInt(e.target.value),
                    },
                  },
                })
              }
              placeholder="Number of customers"
            />
          </div>
          <div>
            <Label>Growth Rate (%)</Label>
            <Input
              type="number"
              value={data.operations?.metrics.growth || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  operations: {
                    ...data.operations,
                    metrics: {
                      ...data.operations?.metrics,
                      growth: parseInt(e.target.value),
                    },
                  },
                })
              }
              placeholder="Annual growth rate"
            />
          </div>
        </div>

        <div>
          <Label>Business Performance</Label>
          <Textarea
            value={data.operations?.performance || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                operations: { ...data.operations, performance: e.target.value },
              })
            }
            placeholder="Describe your current business performance and market position"
            rows={3}
          />
        </div>

        <div>
          <Label>Team & Operations</Label>
          <Textarea
            value={data.operations?.team || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                operations: { ...data.operations, team: e.target.value },
              })
            }
            placeholder="Describe your team and current operations"
            rows={3}
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Business Growth Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include historical growth metrics</li>
              <li>• Highlight major achievements</li>
              <li>• Describe market share and competition</li>
              <li>• Outline expansion plans</li>
            </ul>
          </div>
        </div>
      </Card>
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
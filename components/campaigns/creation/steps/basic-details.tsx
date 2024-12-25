"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { BusinessType } from "../campaign-creation-stepper";

const categories = [
  "Technology",
  "Healthcare",
  "Real Estate",
  "Sustainability",
  "Education",
  "Entertainment",
  "Food & Beverage",
  "Fashion",
];

interface BasicDetailsProps {
  data: {
    businessType: BusinessType;
    title: string;
    description: string;
    category: string;
    marketResearch: string;
    businessPlan: string;
    currentOperations: string;
    fundingGoal: number;
  };
  onUpdate: (data: any) => void;
}

export function BasicDetails({ data, onUpdate }: BasicDetailsProps) {
  const renderIdeaFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="marketResearch">Market Research</Label>
        <Textarea
          id="marketResearch"
          value={data.marketResearch}
          onChange={(e) => onUpdate({ ...data, marketResearch: e.target.value })}
          placeholder="Describe your market research, target audience, and competitive analysis"
          rows={4}
        />
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Idea Validation Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include market size and growth potential</li>
              <li>• Highlight unique value proposition</li>
              <li>• Describe potential challenges and solutions</li>
              <li>• Outline initial customer feedback or validation</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStartedBusinessFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="currentOperations">Current Operations</Label>
        <Textarea
          id="currentOperations"
          value={data.currentOperations}
          onChange={(e) => onUpdate({ ...data, currentOperations: e.target.value })}
          placeholder="Describe your current business operations, revenue, and market position"
          rows={4}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="revenue">Current Annual Revenue ($)</Label>
          <Input
            id="revenue"
            type="number"
            placeholder="Enter current revenue"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees</Label>
          <Input
            id="employees"
            type="number"
            placeholder="Enter employee count"
          />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Business Growth Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include historical growth metrics</li>
              <li>• Highlight major achievements and milestones</li>
              <li>• Describe expansion plans and strategy</li>
              <li>• Outline current market share and competition</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderUnstartedBusinessFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessPlan">Business Plan</Label>
        <Textarea
          id="businessPlan"
          value={data.businessPlan}
          onChange={(e) => onUpdate({ ...data, businessPlan: e.target.value })}
          placeholder="Outline your business plan, including strategy, operations, and financial projections"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Launch Timeline</Label>
        <Input
          id="timeline"
          placeholder="e.g., 3 months from funding"
        />
      </div>

      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Launch Planning Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Detail your execution strategy</li>
              <li>• Include market entry approach</li>
              <li>• Outline required resources and team</li>
              <li>• Describe risk mitigation plans</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Campaign Details</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Provide the basic information about your campaign
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => onUpdate({ ...data, title: e.target.value })}
              placeholder="Enter a clear, descriptive title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Campaign Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onUpdate({ ...data, description: e.target.value })}
              placeholder="Describe your campaign in detail"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={data.category}
              onValueChange={(value) => onUpdate({ ...data, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
            <Input
              id="fundingGoal"
              type="number"
              value={data.fundingGoal}
              onChange={(e) => onUpdate({ ...data, fundingGoal: parseInt(e.target.value) })}
              placeholder="Enter your funding goal"
            />
          </div>
        </div>

        {/* Render type-specific fields */}
        {data.businessType === "idea" && renderIdeaFields()}
        {data.businessType === "started" && renderStartedBusinessFields()}
        {data.businessType === "unstarted" && renderUnstartedBusinessFields()}
      </div>
    </div>
  );
}
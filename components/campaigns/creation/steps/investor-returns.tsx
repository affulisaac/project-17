"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, X, AlertCircle, TrendingUp, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvestorReturnsProps {
  data: {
    returns: {
      model: "profit-sharing" | "equity" | "revenue-sharing";
      percentage: number;
      projections: {
        year: number;
        amount: number;
      }[];
      terms: string;
    };
  };
  onUpdate: (data: any) => void;
}

export function InvestorReturns({ data, onUpdate }: InvestorReturnsProps) {
  const handleAddProjection = () => {
    const newProjections = [
      ...data.returns.projections,
      { year: data.returns.projections.length + 1, amount: 0 },
    ];
    onUpdate({
      ...data,
      returns: { ...data.returns, projections: newProjections },
    });
  };

  const handleRemoveProjection = (index: number) => {
    const newProjections = [...data.returns.projections];
    newProjections.splice(index, 1);
    // Update year numbers for remaining projections
    newProjections.forEach((p, i) => (p.year = i + 1));
    onUpdate({
      ...data,
      returns: { ...data.returns, projections: newProjections },
    });
  };

  const updateProjection = (index: number, amount: number) => {
    const newProjections = [...data.returns.projections];
    newProjections[index] = { ...newProjections[index], amount };
    onUpdate({
      ...data,
      returns: { ...data.returns, projections: newProjections },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Investor Returns</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Define your return model and projections for investors
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Return Model</Label>
            <Select
              value={data.returns.model}
              onValueChange={(value: "profit-sharing" | "equity" | "revenue-sharing") =>
                onUpdate({
                  ...data,
                  returns: { ...data.returns, model: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select return model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit-sharing">Profit Sharing</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="revenue-sharing">Revenue Sharing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Return Percentage (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={data.returns.percentage || ""}
              onChange={(e) =>
                onUpdate({
                  ...data,
                  returns: {
                    ...data.returns,
                    percentage: parseFloat(e.target.value),
                  },
                })
              }
              placeholder="Enter return percentage"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Return Projections</h3>
            <p className="text-sm text-muted-foreground">
              Add yearly return projections
            </p>
          </div>
          <Button onClick={handleAddProjection} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Year
          </Button>
        </div>

        <div className="space-y-4">
          {data.returns.projections.map((projection, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border rounded-lg"
            >
              <Badge variant="secondary">Year {projection.year}</Badge>
              <div className="flex-1">
                <Label>Projected Return ($)</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={projection.amount || ""}
                    onChange={(e) =>
                      updateProjection(index, parseFloat(e.target.value))
                    }
                    className="pl-9"
                    placeholder="Enter projected amount"
                  />
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveProjection(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {data.returns.projections.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No projections added
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 space-y-6">
        <div>
          <Label>Return Terms & Conditions</Label>
          <Textarea
            value={data.returns.terms}
            onChange={(e) =>
              onUpdate({
                ...data,
                returns: { ...data.returns, terms: e.target.value },
              })
            }
            placeholder="Describe the terms and conditions of your return model..."
            rows={4}
          />
        </div>

        <div className="flex items-start gap-4 p-4 bg-accent rounded-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Return Model Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Clearly define how returns will be calculated</li>
              <li>• Include payment frequency and distribution methods</li>
              <li>• Specify any minimum investment requirements</li>
              <li>• Detail exit strategies or buyout options</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
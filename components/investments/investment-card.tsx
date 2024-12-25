"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  ExternalLink,
  AlertCircle 
} from "lucide-react";
import { useState } from "react";
import { InvestmentDetailsDialog } from "./investment-details-dialog";

interface InvestmentCardProps {
  investment: {
    id: string;
    companyName: string;
    amount: number;
    returnRate: number;
    status: "active" | "pending" | "completed";
    progress: number;
    risk: "low" | "medium" | "high";
    sector: string;
    startDate: string;
    endDate?: string;
  };
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getRiskBadge = () => {
    switch (investment.risk) {
      case "low":
        return <Badge variant="outline" className="text-green-500">Low Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="text-yellow-500">Medium Risk</Badge>;
      case "high":
        return <Badge variant="outline" className="text-red-500">High Risk</Badge>;
    }
  };

  const getStatusBadge = () => {
    switch (investment.status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold">{investment.companyName}</h3>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge()}
              <Badge variant="secondary">{investment.sector}</Badge>
              {getRiskBadge()}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowDetails(true)}>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Invested Amount</p>
              <p className="text-lg font-semibold">
                ${investment.amount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Return Rate</p>
              <div className="flex items-center gap-1">
                <p className="text-lg font-semibold">
                  {investment.returnRate}%
                </p>
                {investment.returnRate > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-medium">{investment.progress}%</span>
            </div>
            <Progress value={investment.progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Started {investment.startDate}</span>
            {investment.endDate && <span>Ends {investment.endDate}</span>}
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => setShowDetails(true)}>
              <BarChart2 className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </Card>

      <InvestmentDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        investment={investment}
      />
    </>
  );
}
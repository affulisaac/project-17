"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MilestoneApprovalDialog } from "./milestone-approval-dialog";
import { ProfitManagementDialog } from "./profit-management-dialog";
import { DisputeDialog } from "./dispute-dialog";
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  ChevronRight 
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "approved" | "declined";
  progress: number;
  proofOfWork?: string;
}

interface InvestmentManagementProps {
  investment: {
    id: string;
    companyName: string;
    totalProfit: number;
    availableProfit: number;
    milestones: Milestone[];
    transactions: {
      id: string;
      type: "profit" | "withdrawal";
      amount: number;
      date: string;
      status: "completed" | "pending";
    }[];
    disputes: {
      id: string;
      type: string;
      description: string;
      status: "open" | "resolved" | "closed";
      date: string;
      resolution?: string;
    }[];
  };
}

export function InvestmentManagement({ investment }: InvestmentManagementProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showProfitDialog, setShowProfitDialog] = useState(false);
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Milestones</h3>
          <Badge variant="outline">
            {investment.milestones.filter(m => m.status === "approved").length} of {investment.milestones.length} Completed
          </Badge>
        </div>

        <div className="space-y-4">
          {investment.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => setSelectedMilestone(milestone)}
            >
              <div className="flex items-center gap-4">
                {milestone.status === "approved" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : milestone.status === "declined" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <h4 className="font-medium">{milestone.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">
                      ${milestone.amount.toLocaleString()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Due {milestone.dueDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="w-24 h-2" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Profit Management</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your investment returns
              </p>
            </div>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-xl font-bold mt-1">
                  ${investment.totalProfit.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-bold mt-1">
                  ${investment.availableProfit.toLocaleString()}
                </p>
              </div>
            </div>
            <Button 
              className="w-full" 
              onClick={() => setShowProfitDialog(true)}
            >
              Manage Profits
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Dispute Management</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Handle investment issues
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Disputes</p>
              <p className="text-xl font-bold mt-1">
                {investment.disputes.filter(d => d.status === "open").length}
              </p>
            </div>
            <Button 
              className="w-full" 
              onClick={() => setShowDisputeDialog(true)}
            >
              Manage Disputes
            </Button>
          </div>
        </Card>
      </div>

      {selectedMilestone && (
        <MilestoneApprovalDialog
          open={!!selectedMilestone}
          onOpenChange={() => setSelectedMilestone(null)}
          milestone={selectedMilestone}
          companyName={investment.companyName}
        />
      )}

      <ProfitManagementDialog
        open={showProfitDialog}
        onOpenChange={setShowProfitDialog}
        investment={investment}
      />

      <DisputeDialog
        open={showDisputeDialog}
        onOpenChange={setShowDisputeDialog}
        investment={investment}
      />
    </div>
  );
}
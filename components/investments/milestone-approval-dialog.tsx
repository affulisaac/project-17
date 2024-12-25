"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

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

interface MilestoneApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestone: Milestone;
  companyName: string;
}

export function MilestoneApprovalDialog({
  open,
  onOpenChange,
  milestone,
  companyName,
}: MilestoneApprovalDialogProps) {
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAction = async (action: "approve" | "decline") => {
    if (action === "decline" && !feedback) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback when declining a milestone.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, make an API call to update milestone status
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: action === "approve" ? "Milestone Approved" : "Milestone Declined",
        description: action === "approve"
          ? "Funds will be released to the company"
          : "Feedback has been sent to the company",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Milestone Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {companyName}
                  </p>
                </div>
                <Badge variant={
                  milestone.status === "approved" ? "default" :
                  milestone.status === "declined" ? "destructive" :
                  "secondary"
                }>
                  {milestone.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{milestone.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">${milestone.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{milestone.dueDate}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <span className="text-sm font-medium">{milestone.progress}%</span>
                </div>
                <Progress value={milestone.progress} className="h-2" />
              </div>

              {milestone.proofOfWork && (
                <div>
                  <p className="text-sm text-muted-foreground">Proof of Work</p>
                  <p className="mt-1">{milestone.proofOfWork}</p>
                </div>
              )}
            </div>
          </Card>

          <div className="space-y-4">
            <label className="text-sm font-medium">Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback or comments about this milestone..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleAction("decline")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4 mr-2" />
              )}
              Decline
            </Button>
            <Button
              onClick={() => handleAction("approve")}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
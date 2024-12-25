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
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DisputeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investment: {
    id: string;
    companyName: string;
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

export function DisputeDialog({
  open,
  onOpenChange,
  investment,
}: DisputeDialogProps) {
  const [disputeType, setDisputeType] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!disputeType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, make an API call to create dispute
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Dispute Created",
        description: "Your dispute has been submitted successfully.",
      });
      
      setDisputeType("");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "closed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dispute Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Create New Dispute</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Dispute Type</label>
                <Select
                  value={disputeType}
                  onValueChange={setDisputeType}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select dispute type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="milestone">Milestone Issues</SelectItem>
                    <SelectItem value="payment">Payment Problems</SelectItem>
                    <SelectItem value="communication">Communication Issues</SelectItem>
                    <SelectItem value="performance">Performance Concerns</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your dispute in detail..."
                  className="mt-1 min-h-[150px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Submit Dispute
                  </>
                )}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Dispute History</h3>
            <div className="space-y-4">
              {investment.disputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        {dispute.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {dispute.date}
                      </span>
                    </div>
                    <Badge
                      variant={
                        dispute.status === "resolved" ? "default" :
                        dispute.status === "closed" ? "destructive" :
                        "secondary"
                      }
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(dispute.status)}
                      {dispute.status}
                    </Badge>
                  </div>

                  <p className="text-sm">{dispute.description}</p>

                  {dispute.resolution && (
                    <div className="bg-accent p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <MessageSquare className="h-4 w-4" />
                        Resolution
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {dispute.resolution}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {investment.disputes.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No disputes found
                </p>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
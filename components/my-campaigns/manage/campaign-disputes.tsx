"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CampaignStatus } from "../my-campaigns-view";

interface Dispute {
  id: string;
  investor: string;
  type: string;
  description: string;
  status: "open" | "resolved" | "closed";
  date: string;
  resolution?: string;
}

interface CampaignDisputesProps {
  campaign: {
    id: string;
    status: CampaignStatus;
  };
}

export function CampaignDisputes({ campaign }: CampaignDisputesProps) {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const disputes: Dispute[] = [
    {
      id: "1",
      investor: "Sarah Chen",
      type: "Milestone",
      description: "Delay in milestone completion",
      status: "open",
      date: "2024-03-01",
    },
    {
      id: "2",
      investor: "Michael Rodriguez",
      type: "Communication",
      description: "Lack of regular updates",
      status: "resolved",
      date: "2024-02-15",
      resolution: "Committed to weekly updates",
    },
  ];

  const handleRespond = async () => {
    if (!response.trim()) {
      toast({
        title: "Response Required",
        description: "Please enter a response to the dispute.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, make an API call to update dispute
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Response Sent",
        description: "Your response has been sent to the investor.",
      });
      
      setSelectedDispute(null);
      setResponse("");
    } catch (error) {
      toast({
        title: "Failed to Send Response",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
    <>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Active Disputes</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and resolve investor disputes
              </p>
            </div>
            <Badge variant="outline">
              {disputes.filter(d => d.status === "open").length} Open
            </Badge>
          </div>

          <div className="space-y-4">
            {disputes.map((dispute) => (
              <Card
                key={dispute.id}
                className="p-4 cursor-pointer hover:bg-accent"
                onClick={() => setSelectedDispute(dispute)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <Badge variant="secondary">{dispute.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {dispute.date}
                      </span>
                    </div>
                    <p className="font-medium">{dispute.investor}</p>
                    <p className="text-sm text-muted-foreground">
                      {dispute.description}
                    </p>
                  </div>
                  <Badge
                    variant={
                      dispute.status === "resolved" ? "default" :
                      dispute.status === "closed" ? "secondary" :
                      "outline"
                    }
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(dispute.status)}
                    {dispute.status}
                  </Badge>
                </div>
              </Card>
            ))}

            {disputes.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No disputes found
              </div>
            )}
          </div>
        </Card>
      </div>

      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dispute Details</DialogTitle>
          </DialogHeader>

          {selectedDispute && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Investor</p>
                <p className="font-medium">{selectedDispute.investor}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{selectedDispute.description}</p>
              </div>

              {selectedDispute.resolution && (
                <div className="bg-accent p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <p className="font-medium">Resolution</p>
                  </div>
                  <p className="text-sm">{selectedDispute.resolution}</p>
                </div>
              )}

              {selectedDispute.status === "open" && (
                <div className="space-y-4">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    rows={4}
                  />

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedDispute(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleRespond}
                      disabled={isSubmitting || !response.trim()}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Response"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
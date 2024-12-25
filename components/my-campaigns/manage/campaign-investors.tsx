"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Users,
  Search,
  ChevronRight,
  BarChart2,
  Mail,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Investor {
  id: string;
  name: string;
  amount: number;
  joinDate: string;
  status: "active" | "pending";
  lastInteraction: string;
}

export function CampaignInvestors() {
  const [investors] = useState<Investor[]>([
    {
      id: "1",
      name: "Sarah Chen",
      amount: 50000,
      joinDate: "2024-02-15",
      status: "active",
      lastInteraction: "2024-03-01",
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      amount: 25000,
      joinDate: "2024-02-20",
      status: "active",
      lastInteraction: "2024-02-28",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const filteredInvestors = investors.filter((investor) =>
    investor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!message.trim() || selectedInvestors.length === 0) {
      toast({
        title: "Invalid Message",
        description: "Please enter a message and select at least one investor.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      // In a real app, make an API call to send messages
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: `Message sent to ${selectedInvestors.length} investor${
          selectedInvestors.length > 1 ? "s" : ""
        }`,
      });
      
      setMessage("");
      setSelectedInvestors([]);
      setShowMessageDialog(false);
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Campaign Investors</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and communicate with your investors
            </p>
          </div>
          <Button
            onClick={() => setShowMessageDialog(true)}
            disabled={investors.length === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Message Investors
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search investors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredInvestors.map((investor) => (
              <Card key={investor.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{investor.name}</h4>
                      <Badge variant={investor.status === "active" ? "default" : "secondary"}>
                        {investor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Joined {new Date(investor.joinDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>${investor.amount.toLocaleString()} invested</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {filteredInvestors.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No investors found
              </div>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Investors</DialogTitle>
            <DialogDescription>
              Send a message to selected investors
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Select Investors</label>
              <div className="mt-2 space-y-2">
                {investors.map((investor) => (
                  <div
                    key={investor.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInvestors.includes(investor.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvestors([...selectedInvestors, investor.id]);
                        } else {
                          setSelectedInvestors(
                            selectedInvestors.filter((id) => id !== investor.id)
                          );
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span>{investor.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="mt-2"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowMessageDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={isSending || !message.trim() || selectedInvestors.length === 0}
              >
                {isSending ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
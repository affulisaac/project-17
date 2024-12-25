"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Share2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  MessageSquare,
  ExternalLink,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import { InvestmentDialog } from "./investment-dialog";
import { ContactTeamDialog } from "./contact-team-dialog";

interface CampaignViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: {
    id: string;
    title: string;
    description: string;
    image: string;
    goal: number;
    raised: number;
    backers: number;
    daysLeft: number;
    category: string;
    team: {
      name: string;
      role: string;
      avatar: string;
    }[];
    milestones: {
      title: string;
      amount: number;
      description: string;
      timeline: string;
    }[];
    documents: {
      title: string;
      type: string;
      size: string;
    }[];
  };
}

export function CampaignViewDialog({
  open,
  onOpenChange,
  campaign,
}: CampaignViewDialogProps) {
  const [showInvestDialog, setShowInvestDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Campaign Details</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <div className="relative aspect-video">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{campaign.title}</h2>
                      <Badge variant="secondary" className="mt-1">
                        {campaign.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{campaign.description}</p>

                  <Card className="p-6">
                    <div className="grid gap-6 md:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Raised</p>
                        <p className="text-2xl font-bold">
                          ${campaign.raised.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          of ${campaign.goal.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Backers</p>
                        <p className="text-2xl font-bold">{campaign.backers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Days Left</p>
                        <p className="text-2xl font-bold">{campaign.daysLeft}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-2xl font-bold">
                          {Math.round((campaign.raised / campaign.goal) * 100)}%
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={(campaign.raised / campaign.goal) * 100}
                      className="mt-4 h-2"
                    />
                  </Card>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => setShowInvestDialog(true)}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Invest Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowContactDialog(true)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Team
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="milestones">
              <div className="space-y-4">
                {campaign.milestones.map((milestone, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">
                            ${milestone.amount.toLocaleString()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {milestone.timeline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid gap-6 md:grid-cols-2">
                {campaign.team.map((member, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="space-y-4">
                {campaign.documents.map((doc, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{doc.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {doc.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <InvestmentDialog
        open={showInvestDialog}
        onOpenChange={setShowInvestDialog}
        campaign={campaign}
      />

      <ContactTeamDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        campaign={campaign}
      />
    </>
  );
}
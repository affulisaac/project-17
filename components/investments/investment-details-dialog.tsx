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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Calendar,
  FileText,
  Download,
  MessageSquare,
  Loader2,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Link as LinkIcon,
  ExternalLink,
  ThumbsUp,
  Share2,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactTeamDialog } from "./contact-team-dialog";
import { CompanyUpdateDetails } from "./company-update-details";

interface InvestmentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function InvestmentDetailsDialog({
  open,
  onOpenChange,
  investment,
}: InvestmentDetailsDialogProps) {
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null);
  const { toast } = useToast();

  const handleDownload = async (docId?: string) => {
    if (docId) {
      setDownloadingDoc(docId);
    } else {
      setDownloadingAll(true);
    }

    try {
      // In a real app, make an API call to download documents
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Download Complete",
        description: docId ? "Document downloaded successfully" : "All documents downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setDownloadingDoc(null);
      setDownloadingAll(false);
    }
  };

  // Mock data for demonstration
  const documents = [
    { id: "1", name: "Investment Agreement", type: "PDF", size: "2.4 MB" },
    { id: "2", name: "Financial Projections", type: "XLSX", size: "1.8 MB" },
    { id: "3", name: "Due Diligence Report", type: "PDF", size: "3.2 MB" },
  ];

  const updates = [
    {
      id: "1",
      type: "Milestone",
      title: "Q1 Goals Achieved",
      description: "Successfully completed all planned objectives for Q1 2024",
      date: "2024-03-31",
      important: true,
    },
    {
      id: "2",
      type: "Financial",
      title: "Revenue Growth Update",
      description: "Monthly recurring revenue increased by 25%",
      date: "2024-03-15",
      important: false,
    },
  ];

  const overview = {
    metrics: [
      { label: "Total Investment", value: `$${investment.amount.toLocaleString()}` },
      { label: "Current Value", value: `$${(investment.amount * (1 + investment.returnRate / 100)).toLocaleString()}` },
      { label: "Return Rate", value: `${investment.returnRate}%` },
      { label: "Time Invested", value: "6 months" },
    ],
    performance: {
      monthly: [
        { month: "Jan", value: 100 },
        { month: "Feb", value: 120 },
        { month: "Mar", value: 115 },
        { month: "Apr", value: 140 },
      ],
    },
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {overview.metrics.map((metric, index) => (
                      <div key={index}>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Investment Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge>{investment.status}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sector</span>
                        <span>{investment.sector}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>{investment.startDate}</span>
                      </div>
                      {investment.endDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Date</span>
                          <span>{investment.endDate}</span>
                        </div>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                      <Button 
                        className="w-full justify-between"
                        onClick={() => setShowContactDialog(true)}
                      >
                        Contact Team
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => handleDownload()}
                      >
                        Download Documents
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="font-semibold">Investment Documents</h3>
                  <Button
                    variant="outline"
                    onClick={() => handleDownload()}
                    disabled={downloadingAll}
                  >
                    {downloadingAll ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{doc.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {doc.size}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(doc.id)}
                        disabled={downloadingDoc === doc.id}
                      >
                        {downloadingDoc === doc.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <div className="space-y-6">
                {updates.map((update) => (
                  <Card
                    key={update.id}
                    className="p-4 cursor-pointer hover:bg-accent"
                    onClick={() => {
                      setSelectedUpdate(update);
                      setShowUpdateDetails(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {update.important && (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <Badge variant="secondary">{update.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {update.date}
                          </span>
                        </div>
                        <h4 className="font-medium">{update.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {update.description}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <ContactTeamDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        companyName={investment.companyName}
      />

      {selectedUpdate && (
        <CompanyUpdateDetails
          open={showUpdateDetails}
          onOpenChange={setShowUpdateDetails}
          update={selectedUpdate}
        />
      )}
    </>
  );
}
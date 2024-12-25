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
  AlertCircle,
  Calendar,
  FileText,
  Link as LinkIcon,
  Download,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Share2,
  Loader2,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  LineChart,
  BarChart2,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyUpdateDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  update: {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    important: boolean;
    content?: {
      text: string;
      metrics?: {
        label: string;
        value: string;
        change?: string;
      }[];
      attachments?: {
        id: string;
        name: string;
        type: string;
        size: string;
        url: string;
      }[];
      links?: {
        title: string;
        url: string;
      }[];
    };
    comments?: {
      id: string;
      author: string;
      text: string;
      date: string;
    }[];
  };
}

// Mock data for demonstration
const mockMetrics = {
  overview: {
    revenue: {
      current: "$1.2M",
      change: "+15%",
      trend: "up",
    },
    users: {
      current: "45K",
      change: "+22%",
      trend: "up",
    },
    growth: {
      current: "32%",
      change: "-5%",
      trend: "down",
    },
  },
  documents: [
    {
      id: "1",
      name: "Q1 2024 Financial Report",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-03-15",
    },
    {
      id: "2",
      name: "Product Development Roadmap",
      type: "PPTX",
      size: "5.1 MB",
      date: "2024-03-10",
    },
    {
      id: "3",
      name: "Market Analysis",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-03-05",
    },
  ],
  updates: [
    {
      id: "1",
      title: "New Partnership Announcement",
      type: "Strategic",
      date: "2024-03-15",
      content: "We're excited to announce our strategic partnership with TechCorp, which will accelerate our market expansion plans.",
      metrics: [
        { label: "Expected Revenue Impact", value: "+$500K", trend: "up" },
        { label: "Market Reach", value: "+3 Countries", trend: "up" },
      ],
    },
    {
      id: "2",
      title: "Product Launch Success",
      type: "Product",
      date: "2024-03-10",
      content: "Successfully launched our new product line with overwhelming market response.",
      metrics: [
        { label: "Pre-orders", value: "2,500", trend: "up" },
        { label: "Customer Satisfaction", value: "94%", trend: "up" },
      ],
    },
    {
      id: "3",
      title: "Team Expansion",
      type: "Operations",
      date: "2024-03-05",
      content: "Welcomed 5 new senior engineers to accelerate product development.",
      metrics: [
        { label: "Team Growth", value: "+25%", trend: "up" },
        { label: "Development Velocity", value: "+40%", trend: "up" },
      ],
    },
  ],
};

export function CompanyUpdateDetails({
  open,
  onOpenChange,
  update,
}: CompanyUpdateDetailsProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isLiked, setIsLiked] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleDownload = async (fileId: string) => {
    setDownloadingFile(fileId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "File Downloaded",
        description: "The file has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setDownloadingFile(null);
    }
  };

  const handleShare = () => {
    toast({
      title: "Update Shared",
      description: "Link copied to clipboard.",
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted.",
    });
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Details</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {update.important && (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <Badge variant="secondary">{update.type}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {update.date}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${isLiked ? "text-blue-500 fill-blue-500" : ""}`}
                  />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">{update.title}</h3>
              <p className="mt-2 text-muted-foreground">{update.description}</p>
            </div>

            <Card className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {Object.entries(mockMetrics.overview).map(([key, data]) => (
                  <div key={key}>
                    <p className="text-sm text-muted-foreground capitalize">{key}</p>
                    <p className="text-lg font-bold mt-1">{data.current}</p>
                    <p className={`text-sm ${
                      data.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {data.change}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {update.content?.links && (
              <div className="space-y-2">
                <p className="font-medium">Related Links</p>
                {update.content.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {link.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="metrics">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Performance Metrics</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue Growth</p>
                    <p className="text-2xl font-bold mt-1">32%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">+12% vs last month</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Acquisition</p>
                    <p className="text-2xl font-bold mt-1">1,234</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">+8% vs last month</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Market Share</p>
                    <p className="text-2xl font-bold mt-1">15%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">+3% vs last month</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Key Performance Indicators</h3>
                <div className="space-y-4">
                  {[
                    { label: "Product Development", progress: 75 },
                    { label: "Market Expansion", progress: 60 },
                    { label: "Customer Satisfaction", progress: 90 },
                  ].map((kpi, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{kpi.label}</span>
                        <span className="text-sm font-medium">{kpi.progress}%</span>
                      </div>
                      <Progress value={kpi.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              {mockMetrics.documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
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
                          <span className="text-sm text-muted-foreground">
                            {doc.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(doc.id)}
                      disabled={downloadingFile === doc.id}
                    >
                      {downloadingFile === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="updates">
            <div className="space-y-4">
              {mockMetrics.updates.map((update) => (
                <Card key={update.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{update.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {update.date}
                        </span>
                      </div>
                      <h4 className="font-medium">{update.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {update.content}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {update.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {metric.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm">{metric.label}:</span>
                            <span className="text-sm font-medium">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
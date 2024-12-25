"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { CampaignDocument } from "@/types/campaign";

interface DocumentsTabProps {
  documents: CampaignDocument[];
}

export function DocumentsTab({ documents }: DocumentsTabProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownload = async (doc: CampaignDocument) => {
    setDownloadingId(doc.id);
    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Download Started",
        description: `${doc.name} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Card className="p-6">
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
                  <span className="text-sm text-muted-foreground">{doc.size}</span>
                  <span className="text-sm text-muted-foreground">{doc.date}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDownload(doc)}
              disabled={downloadingId === doc.id}
            >
              {downloadingId === doc.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}

        {documents.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No documents available
          </div>
        )}
      </div>
    </Card>
  );
}
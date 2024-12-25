"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ManageCampaignDialog } from "./manage-campaign-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { CampaignStatus } from "./my-campaigns-view";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  backers: number;
  status: CampaignStatus;
  category: string;
  onDelete?: (id: string) => void;
}

export function CampaignCard({
  id,
  title,
  description,
  image,
  goal,
  raised,
  backers,
  status,
  category,
  onDelete,
}: CampaignCardProps) {
  const [showManageDialog, setShowManageDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const progress = (raised / goal) * 100;
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete?.(id);
    toast({
      title: "Campaign Deleted",
      description: "The campaign has been deleted successfully.",
    });
    setShowDeleteDialog(false);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "funded":
        return <Badge className="bg-green-500">Funded</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-full bg-background/80 hover:bg-background">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowManageDialog(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className="flex gap-2 mt-1">
                {getStatusBadge()}
                <Badge variant="secondary">{category}</Badge>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Raised: ${raised.toLocaleString()}</span>
                <span>Goal: ${goal.toLocaleString()}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{backers} investors</span>
              <button 
                className="text-primary hover:underline"
                onClick={() => setShowManageDialog(true)}
              >
                Manage Campaign
              </button>
            </div>
          </div>
        </div>
      </Card>

      <ManageCampaignDialog
        open={showManageDialog}
        onOpenChange={setShowManageDialog}
        campaign={{
          id,
          title,
          description,
          goal,
          raised,
          status,
          image,
        }}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Campaign"
        description={`Are you sure you want to delete "${title}"? This action cannot be undone and all campaign data will be permanently lost.`}
        confirmText="Delete Campaign"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
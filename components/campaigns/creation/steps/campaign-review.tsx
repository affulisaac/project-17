"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Rocket, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CampaignReviewProps {
  data: any;
}

export function CampaignReview({ data }: CampaignReviewProps) {
  const { toast } = useToast();
  const router = useRouter();

  const isReadyToLaunch = () => {
    return (
      data.title &&
      data.description &&
      data.category &&
      data.fundingGoal > 0 &&
      data.milestones?.length > 0 &&
      data.images?.length > 0
    );
  };

  const getMissingItems = () => {
    const missing = [];
    if (!data.title) missing.push("Campaign title");
    if (!data.description) missing.push("Campaign description");
    if (!data.category) missing.push("Category");
    if (!data.fundingGoal || data.fundingGoal <= 0) missing.push("Valid funding goal");
    if (!data.milestones?.length) missing.push("At least one milestone");
    if (!data.images?.length) missing.push("At least one campaign image");
    return missing;
  };

  const handleLaunch = () => {
    // In a real app, this would make an API call to save and launch the campaign
    toast({
      title: "Campaign Launched Successfully!",
      description: "Your campaign is now live and visible to investors.",
      duration: 5000,
    });
    router.push("/my-campaigns");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Review Your Campaign</h2>
          <p className="text-sm text-muted-foreground">
            Review all details before launching your campaign
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="gap-2"
              size="lg"
              disabled={!isReadyToLaunch()}
            >
              <Rocket className="h-4 w-4" />
              Launch Campaign
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ready to Launch Your Campaign?</AlertDialogTitle>
              <AlertDialogDescription>
                {isReadyToLaunch() ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-500">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>All required information is complete</span>
                    </div>
                    <p>
                      Your campaign will be visible to investors immediately after launch.
                      You can still edit some details after launching, but core information
                      will be locked.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-destructive">
                      Please complete the following required items:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      {getMissingItems().map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLaunch}
                disabled={!isReadyToLaunch()}
              >
                Launch Campaign
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-6">
        <Card className="p-4 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Title</Label>
            <p className="font-medium">{data.title}</p>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground">Description</Label>
            <p className="whitespace-pre-wrap">{data.description}</p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Category</Label>
            <p className="capitalize">{data.category}</p>
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Funding Goal</Label>
            <p className="font-medium">${data.fundingGoal?.toLocaleString()}</p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Duration</Label>
            <p>{data.duration} days</p>
          </div>

          {data.milestones?.length > 0 && (
            <div>
              <Label className="text-sm text-muted-foreground">Milestones</Label>
              <div className="grid gap-2 mt-2">
                {data.milestones.map((milestone: any, index: number) => (
                  <Card key={index} className="p-3">
                    <p className="font-medium">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ${milestone.amount?.toLocaleString()}
                    </p>
                    <p className="text-sm">{milestone.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>

        {data.images?.length > 0 && (
          <Card className="p-4 space-y-4">
            <Label className="text-sm text-muted-foreground">Campaign Images</Label>
            <div className="grid grid-cols-2 gap-4">
              {data.images.map((image: string, index: number) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={image}
                    alt={`Campaign image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
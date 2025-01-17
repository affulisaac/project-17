"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { BusinessTypeSelection } from "./steps/business-type-selection";
import { BasicDetails } from "./steps/basic-details";
import { BusinessStageDetails } from "./steps/business-stage-details";
import { MilestoneCycles } from "./steps/milestone-cycles";
import { InvestorReturns } from "./steps/investor-returns";
import { SupportingDocuments } from "./steps/supporting-documents";
import { CampaignVisibility } from "./steps/campaign-visibility";
import { CampaignReview } from "./steps/campaign-review";
import { CampaignSuccess } from "./steps/campaign-success";
import { Rocket } from "lucide-react";
import {
  createCampaign,
  createMilestone,
  updateCampaign,
  createReturnProjections,
} from "@/app/actions/campaigns";
import {
  CampaignBusinessDetails,
  CampaignCategory,
  CampaignDetail,
  CampaignMilestone,
  CampaignVisibility as CampaignVisibilityType,
} from "@/types/campaign";
export type BusinessType = "idea" | "started" | "unstarted";
const steps = [
  {
    title: "Business Type",
    component: BusinessTypeSelection,
  },
  {
    title: "Basic Details",
    component: BasicDetails,
  },
  {
    title: "Business Stage",
    component: BusinessStageDetails,
  },
  {
    title: "Milestones",
    component: MilestoneCycles,
  },
  {
    title: "Investor Returns",
    component: InvestorReturns,
  },
  {
    title: "Media",
    component: SupportingDocuments,
  },
  {
    title: "Visibility",
    component: CampaignVisibility,
  },
  {
    title: "Review",
    component: CampaignReview,
  },
];

export function CampaignCreationStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [campaignData, setCampaignData] = useState({
    businessType: "" as BusinessType,
    title: "My Campaign",
    description: "This is the title",
    category: "",
    fundingGoal: 500,
    marketResearch: "",
    launchTimeline: "",
    businessStrategy: "",
    requiredResources: "",
    returnTac: "",
    challenges: "",
    featured: false,
    revenueModel: "",
    problemStatement: "",
    solution: "",
    customerBase: "",
    growthRate: "",
    competitiveAdvantage: "",
    performance: "",
    projections: [],
    allowMessages: true,
    showTeamInfo: true,
    customMessages: "",
    currentOperations: "",
    returnPercentage: 0,
    numberOfEmployees: 0,
    milestones: [] as CampaignMilestone[],
    images: [] as string[],
    video: "",
    visibility_type: "public" as "public" | "private",
    allow_messages: true,
    show_team: true,
  });
  const { toast } = useToast();

  const handleNext = async () => {
    // setCurrentStep(currentStep + 1);
    // return
    setIsLoading(true);
    try {
      if (currentStep === 1) {
        const payload = {
          title: campaignData.title,
          description: campaignData.description,
          category: campaignData.category as CampaignCategory,
          fundingGoal: campaignData.fundingGoal,
          businessType: campaignData.businessType,
        };
        console.log(campaignId);
        const campaign = campaignId
          ? await updateCampaign<Partial<CampaignDetail>>(
              campaignId as string,
              payload
            )
          : await createCampaign<Partial<CampaignDetail>>(payload);
        setCampaignId(campaign.id);
        console.log(campaign);
      } else if (campaignId) {
        switch (currentStep) {
          case 2:
            await updateCampaign<CampaignBusinessDetails>(campaignId, {
              problemStatement: campaignData.problemStatement,
              solution: campaignData.solution,
              targetMarket: campaignData.customerBase,
              challenges: campaignData.challenges,
              requiredResources: campaignData.requiredResources,
              // businessStrategy: campaignData.businessStrategy,
              revenueModel: campaignData.revenueModel,
              competitiveAdvantage: campaignData.competitiveAdvantage,
              marketResearch: campaignData.marketResearch,
              businessPlan: campaignData.businessStrategy,
              numberOfEmployees: campaignData.numberOfEmployees,
              launchTimeline: campaignData.launchTimeline,
              currentOperations: campaignData.currentOperations,
            });
            break;
          case 3:
            campaignData.milestones.forEach(
              (milestone) => (milestone.campaign_id = campaignId)
            );
            await createMilestone(campaignData.milestones);
            break;
          case 4:
            const payload = {
              revenueModel: campaignData.revenueModel,
              returnPercentage: campaignData.returnPercentage,
              returnTac: campaignData.returnTac,
            };
            campaignData.projections.forEach(
              (projection) => (projection.campaign_id = campaignId)
            );
            console.log(campaignData.projections);
            await updateCampaign(campaignId, payload);
            await createReturnProjections(campaignData.projections);
            break;
          case 5:
            // await updateCampaign<CampaignVisibilityType>(campaignId, {
            //   visibilityType: campaignData.visibilityType,
            //   featured: campaignData.featured,
            //   allowMessages: campaignData.allowMessages,
            //   showTeamInfo: campaignData.showTeamInfo,
            //   customMessages: campaignData.customMessages,
            // });
            break;
          case 6:
            const visibilityPayload = {
              visibility_type: campaignData.visibility_type,
              featured: campaignData.featured,
              allow_messages: campaignData.allow_messages,
              show_team: campaignData.show_team,
              custom_messages: campaignData.custom_messages,
            };
            console.log(visibilityPayload);
            await updateCampaign(campaignId, visibilityPayload);
            break;
        }
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        toast({
          title: "Progress Saved",
          description: "Your campaign details have been saved successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save campaign details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(campaignData);
    try {
      console.log(campaignId, { status: "submitted" });
      const response = await updateCampaign(campaignId as string, {
        status: "submitted",
      });
      console.log(response);

      toast({
        title: "Campaign Submitted",
        description: "Your campaign has been submitted for review.",
      });

      // Show success page
      setCurrentStep(steps.length);
    } catch (error) {
      console.log(error);
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    return true;
    switch (currentStep) {
      case 0:
        return !!campaignData.businessType;
      case 1:
        return !!(
          campaignData.title &&
          campaignData.description &&
          campaignData.category &&
          campaignData.fundingGoal
        );
      case 3:
        return campaignData.milestones.length > 0;
      case 4:
        return !!(
          campaignData.returns.model &&
          campaignData.returns.percentage &&
          campaignData.returns.terms
        );
      case 5:
        return true;
      // default:
      //   return true;
    }
  };

  if (currentStep === steps.length) {
    return (
      <div className="p-6 md:ml-64">
        <div className="max-w-7xl mx-auto space-y-8">
          <CampaignSuccess />;
        </div>
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-16 mx-2 ${
                      index < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <CurrentStepComponent
            data={campaignData}
            onUpdate={setCampaignData}
          />

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            <Button
              onClick={
                currentStep === steps.length - 1 ? handleSubmit : handleNext
              }
              disabled={!isStepValid() || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Rocket className="h-4 w-4" />
                      Launch Campaign
                    </>
                  ) : (
                    <>{currentStep === 0 ? "Next" : "Save and Continue"}</>
                  )}
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

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
import { CampaignMedia } from "./steps/campaign-media";
import { SupportingDocuments } from "./steps/supporting-documents";
import { CampaignVisibility } from "./steps/campaign-visibility";
import { CampaignReview } from "./steps/campaign-review";
import { CampaignSuccess } from "./steps/campaign-success";
import { Rocket, CheckCircle2 } from "lucide-react";
import { createCampaign } from "@/app/actions/campaigns";
import { transformData } from "@/lib/utils";
export type BusinessType = "idea" | "started" | "unstarted";
export type Milestone = {
  id: string;
  title: string;
  description: string;
  amount: number;
  timeline: string;
  criteria?: string;
};

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
  const [campaignData, setCampaignData] = useState({
    businessType: "" as BusinessType,
    title: "My Campaign",
    description: "This is the title",
    category: "",
    fundingGoal: 500,
    milestones: [] as Milestone[],
    returns: {
      model: "",
      percentage: 0,
      projections: [],
      terms: "",
    },
    images: [] as string[],
    video: "",
    visibility: {
      type: "public" as "public" | "private",
      featured: false,
      allowMessages: true,
      showTeam: true,
    },
  });
  const { toast } = useToast();

  const handleNext = () => {
    if(currentStep === 0) {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } 
  } else {
    handleSubmit();
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
      // In a real app, make an API call to submit the campaign
      const transformedData = transformData(campaignData);
      console.log(transformedData);
      const response = await createCampaign(transformedData);
      console.log(response);

      toast({
        title: "Campaign Submitted",
        description: "Your campaign has been submitted for review.",
      });

      // Show success page
      // setCurrentStep(steps.length);
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
    return <CampaignSuccess />;
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
              onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
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
                ) :  ( 
                 <>
                 {currentStep === 0 ? 'Next' : 'Save and Continue'}
                 </>
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

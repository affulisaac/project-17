"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Wallet } from "lucide-react";

const steps = [
  {
    id: "role",
    name: "Choose Role",
    component: ({ onNext, setUserData, userData }) => (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Choose Your Role</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            className={`p-6 cursor-pointer transition-all ${
              userData.role === "entrepreneur"
                ? "ring-2 ring-primary"
                : "hover:bg-accent"
            }`}
            onClick={() =>
              setUserData((prev) => ({ ...prev, role: "entrepreneur" }))
            }
          >
            <div className="flex flex-col items-center space-y-2">
              <Briefcase className="h-12 w-12" />
              <h3 className="font-medium">Entrepreneur</h3>
              <p className="text-sm text-muted-foreground text-center">
                Create campaigns and raise funds for your business
              </p>
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-all ${
              userData.role === "investor"
                ? "ring-2 ring-primary"
                : "hover:bg-accent"
            }`}
            onClick={() => setUserData((prev) => ({ ...prev, role: "investor" }))}
          >
            <div className="flex flex-col items-center space-y-2">
              <Wallet className="h-12 w-12" />
              <h3 className="font-medium">Investor</h3>
              <p className="text-sm text-muted-foreground text-center">
                Discover and invest in promising opportunities
              </p>
            </div>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!userData.role}
          >
            Continue
          </Button>
        </div>
      </div>
    ),
  },
  // Add more steps as needed
];

const OnboardingStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    role: "",
    // Add more user data fields as needed
  });

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
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

      <CurrentStepComponent
        onNext={handleNext}
        setUserData={setUserData}
        userData={userData}
      />
    </div>
  );
};

export default OnboardingStepper;
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { PaymentMethod } from "./payment-methods";

interface VerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  method: PaymentMethod;
  onComplete: (method: PaymentMethod) => void;
}

export function VerificationDialog({
  open,
  onOpenChange,
  method,
  onComplete,
}: VerificationDialogProps) {
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    onComplete(method);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Payment Method</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Enter the verification code to confirm your payment method"
              : "Your payment method has been verified successfully"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                <p>
                  {method.type === "bank"
                    ? "We've sent a small deposit to your bank account. Enter the amount below to verify."
                    : method.type === "card"
                    ? "Enter the verification code sent to your registered phone number."
                    : "Check your email for the verification code."}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Verification Code</Label>
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter code"
                maxLength={6}
              />
            </div>

            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={!verificationCode || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-2 font-semibold">Verification Complete</h3>
              <p className="text-sm text-muted-foreground text-center">
                Your payment method has been verified and is ready to use
              </p>
            </div>

            <Button className="w-full" onClick={handleComplete}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WithdrawalConfirmation } from "./withdrawal-confirmation";
import { WithdrawalSuccess } from "./withdrawal-success";
import { useToast } from "@/hooks/use-toast";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  account: {
    type: string;
    details: string;
  };
  onSuccess?: () => void;
}

type Step = "confirm" | "success";

export function WithdrawalDialog({
  open,
  onOpenChange,
  amount,
  account,
  onSuccess,
}: WithdrawalDialogProps) {
  const [step, setStep] = useState<Step>("confirm");
  const { toast } = useToast();

  const handleConfirm = async () => {
    try {
      // In a real app, make an API call to process withdrawal
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep("success");
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      // In a real app, generate and download receipt
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Receipt Downloaded",
        description: "The receipt has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset step after dialog animation completes
    setTimeout(() => setStep("confirm"), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "confirm" ? "Confirm Withdrawal" : "Withdrawal Complete"}
          </DialogTitle>
        </DialogHeader>

        {step === "confirm" ? (
          <WithdrawalConfirmation
            amount={amount}
            account={account}
            onConfirm={handleConfirm}
            onBack={handleClose}
          />
        ) : (
          <WithdrawalSuccess
            amount={amount}
            onClose={handleClose}
            onDownloadReceipt={handleDownloadReceipt}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Wallet } from "lucide-react";

interface WithdrawalConfirmationProps {
  amount: number;
  account: {
    type: string;
    details: string;
  };
  onConfirm: () => void;
  onBack: () => void;
}

export function WithdrawalConfirmation({
  amount,
  account,
  onConfirm,
  onBack,
}: WithdrawalConfirmationProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-500">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">Please verify the withdrawal details</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount to Withdraw</span>
            <span className="font-medium text-xl">${amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Withdrawal Method</span>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              <span className="font-medium">{account.type}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Account Details</span>
            <span className="font-medium">{account.details}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Processing Time</span>
            <Badge variant="secondary">1-3 business days</Badge>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={onConfirm}
          className="flex-1 gap-2"
        >
          Confirm Withdrawal
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
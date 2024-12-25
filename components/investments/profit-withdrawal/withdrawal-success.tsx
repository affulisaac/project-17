"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";

interface WithdrawalSuccessProps {
  amount: number;
  onClose: () => void;
  onDownloadReceipt: () => void;
}

export function WithdrawalSuccess({
  amount,
  onClose,
  onDownloadReceipt,
}: WithdrawalSuccessProps) {
  return (
    <div className="py-12">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Withdrawal Initiated</h3>
          <p className="text-2xl font-bold">${amount.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">
            Your withdrawal request has been submitted successfully.
            The funds will be transferred to your account within 1-3 business days.
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 mt-4">
          <Button onClick={onDownloadReceipt} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button onClick={onClose}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
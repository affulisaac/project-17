"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DollarSign, 
  Wallet, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

interface WithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onWithdraw: (amount: number) => Promise<void>;
}

export function WithdrawalDialog({
  open,
  onOpenChange,
  availableBalance,
  onWithdraw,
}: WithdrawalDialogProps) {
  const [step, setStep] = useState<"details" | "confirm" | "processing" | "complete">("details");
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setStep("details");
    setAmount("");
    setSelectedAccount("");
    setIsLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  const validateDetails = () => {
    if (!selectedAccount) {
      toast({
        title: "Account Required",
        description: "Please select a payment account.",
        variant: "destructive",
      });
      return false;
    }

    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      });
      return false;
    }

    if (withdrawalAmount > availableBalance) {
      toast({
        title: "Insufficient Funds",
        description: "Withdrawal amount exceeds available balance.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateDetails()) {
      setStep("confirm");
    }
  };

  const handleWithdraw = async () => {
    setStep("processing");
    setIsLoading(true);
    
    try {
      const withdrawalAmount = parseFloat(amount);
      await onWithdraw(withdrawalAmount);
      setStep("complete");
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setStep("details");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (step) {
      case "details":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Withdraw Funds</DialogTitle>
              <DialogDescription>
                Transfer funds from your campaign to your payment account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-2xl font-bold">
                      ${availableBalance.toLocaleString()}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label>Amount</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <Label>Payment Account</Label>
                  <Select
                    value={selectedAccount}
                    onValueChange={setSelectedAccount}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank1">Bank Account (•••• 4242)</SelectItem>
                      <SelectItem value="bank2">Bank Account (•••• 8888)</SelectItem>
                      <SelectItem value="wallet1">Digital Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {parseFloat(amount) > availableBalance && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Amount exceeds available balance
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!amount || !selectedAccount}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        );

      case "confirm":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Withdrawal</DialogTitle>
              <DialogDescription>
                Please review the withdrawal details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Please verify the details</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To Account</span>
                    <span className="font-medium">
                      {selectedAccount === "wallet1" ? "Digital Wallet" : `Bank Account (•••• ${selectedAccount === "bank1" ? "4242" : "8888"})`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time</span>
                    <span className="font-medium">1-3 business days</span>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                >
                  Back
                </Button>
                <Button
                  onClick={handleWithdraw}
                >
                  Confirm Withdrawal
                </Button>
              </div>
            </div>
          </>
        );

      case "processing":
        return (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="text-center">
                <h3 className="font-semibold">Processing Withdrawal</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your request
                </p>
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold">Withdrawal Initiated</h3>
                <p className="text-sm text-muted-foreground">
                  ${parseFloat(amount).toLocaleString()} will be transferred to your account
                </p>
                <p className="text-xs text-muted-foreground">
                  The funds will be available in 1-3 business days
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={handleClose}
              >
                Done
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Loader2,
  AlertTriangle,
  TrendingUp,
  FileText,
  CreditCard,
  Building,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: {
    id: string;
    title: string;
    goal: number;
    raised: number;
    milestones: {
      title: string;
      amount: number;
      description: string;
      timeline: string;
    }[];
  };
}

type PaymentMethod = "card" | "bank" | "wallet";

export function InvestmentDialog({
  open,
  onOpenChange,
  campaign,
}: InvestmentDialogProps) {
  const [step, setStep] = useState<"details" | "payment" | "confirm" | "processing" | "complete">("details");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setStep("details");
    setAmount("");
    setPaymentMethod("");
    setSelectedAccount("");
    setIsLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  const validateAmount = () => {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validateAmount()) {
      setStep("payment");
    }
  };

  const handlePaymentContinue = () => {
    if (!paymentMethod || !selectedAccount) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method and account.",
        variant: "destructive",
      });
      return;
    }
    setStep("confirm");
  };

  const handleInvest = async () => {
    setStep("processing");
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to process investment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep("complete");
    } catch (error) {
      toast({
        title: "Investment Failed",
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
              <DialogTitle>Investment Details</DialogTitle>
              <DialogDescription>
                Review campaign details and enter investment amount
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Campaign</p>
                      <p className="font-medium">{campaign.title}</p>
                    </div>
                    <Badge variant="secondary">
                      ${campaign.raised.toLocaleString()} raised
                    </Badge>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        Progress: ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium">
                        {Math.round((campaign.raised / campaign.goal) * 100)}%
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="milestones">
                <div className="space-y-4">
                  {campaign?.milestones?.map((milestone, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <Badge variant="secondary">
                            ${milestone.amount.toLocaleString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                        <p className="text-sm">Timeline: {milestone.timeline}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="returns">
                <Card className="p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium">Projected Returns</h4>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual ROI</p>
                      <p className="text-xl font-bold text-green-500">12-15%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lock Period</p>
                      <p className="text-xl font-bold">18 months</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mt-0.5" />
                    <p>
                      Returns are projected based on business performance and are not guaranteed.
                      Please review the investment terms carefully.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div>
                <Label>Investment Amount</Label>
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

              {amount && (
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projected Annual Return</span>
                      <span className="font-medium text-green-500">
                        ${(parseFloat(amount) * 0.15).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ownership Percentage</span>
                      <span className="font-medium">
                        {((parseFloat(amount) / campaign.goal) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </Card>
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
                disabled={!amount}
              >
                Continue to Payment
              </Button>
            </div>
          </>
        );

      case "payment":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Payment Method</DialogTitle>
              <DialogDescription>
                Select how you want to pay for your investment
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "ring-2 ring-primary"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="h-6 w-6" />
                    <span className="text-sm font-medium">Card</span>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === "bank"
                      ? "ring-2 ring-primary"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building className="h-6 w-6" />
                    <span className="text-sm font-medium">Bank</span>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === "wallet"
                      ? "ring-2 ring-primary"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm font-medium">Wallet</span>
                  </div>
                </Card>
              </div>

              {paymentMethod && (
                <div>
                  <Label>Select Account</Label>
                  <Select
                    value={selectedAccount}
                    onValueChange={setSelectedAccount}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose payment account" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethod === "card" && (
                        <>
                          <SelectItem value="card1">Visa ending in 4242</SelectItem>
                          <SelectItem value="card2">Mastercard ending in 8888</SelectItem>
                        </>
                      )}
                      {paymentMethod === "bank" && (
                        <>
                          <SelectItem value="bank1">Chase Account (...1234)</SelectItem>
                          <SelectItem value="bank2">Wells Fargo (...5678)</SelectItem>
                        </>
                      )}
                      {paymentMethod === "wallet" && (
                        <>
                          <SelectItem value="wallet1">PayPal</SelectItem>
                          <SelectItem value="wallet2">Digital Wallet</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                >
                  Back
                </Button>
                <Button
                  onClick={handlePaymentContinue}
                  disabled={!paymentMethod || !selectedAccount}
                >
                  Review Investment
                </Button>
              </div>
            </div>
          </>
        );

      case "confirm":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Investment</DialogTitle>
              <DialogDescription>
                Please review your investment details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Please verify all details</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investment Amount</span>
                    <span className="font-medium">${parseFloat(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Campaign</span>
                    <span className="font-medium">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium capitalize">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account</span>
                    <span className="font-medium">
                      {selectedAccount === "card1" && "Visa (...4242)"}
                      {selectedAccount === "card2" && "Mastercard (...8888)"}
                      {selectedAccount === "bank1" && "Chase (...1234)"}
                      {selectedAccount === "bank2" && "Wells Fargo (...5678)"}
                      {selectedAccount === "wallet1" && "PayPal"}
                      {selectedAccount === "wallet2" && "Digital Wallet"}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("payment")}
                >
                  Back
                </Button>
                <Button
                  onClick={handleInvest}
                >
                  Confirm Investment
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
                <h3 className="font-semibold">Processing Investment</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your investment
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
                <h3 className="font-semibold">Investment Successful!</h3>
                <p className="text-sm text-muted-foreground">
                  You have successfully invested ${parseFloat(amount).toLocaleString()} in {campaign.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  You can track your investment in the My Investments section
                </p>
              </div>
              <Button
                className="mt-4"
                onClick={handleClose}
              >
                View My Investments
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
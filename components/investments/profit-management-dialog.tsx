"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfitManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investment: {
    id: string;
    companyName: string;
    totalProfit: number;
    availableProfit: number;
    transactions: {
      id: string;
      type: "profit" | "withdrawal";
      amount: number;
      date: string;
      status: "completed" | "pending";
    }[];
  };
}

export function ProfitManagementDialog({
  open,
  onOpenChange,
  investment,
}: ProfitManagementDialogProps) {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exportingReport, setExportingReport] = useState(false);
  const { toast } = useToast();

  const handleWithdraw = async () => {
    if (!selectedAccount) {
      toast({
        title: "Account Required",
        description: "Please select a payment account.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > investment.availableProfit) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, make an API call to process withdrawal
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Withdrawal Initiated",
        description: `$${amount.toLocaleString()} will be transferred to your account.`,
      });
      
      setWithdrawAmount("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async () => {
    setExportingReport(true);
    try {
      // In a real app, make an API call to generate and download report
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Downloaded",
        description: "Profit report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setExportingReport(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Profit Management</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-2xl font-bold mt-1">
                ${investment.totalProfit.toLocaleString()}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Available for Withdrawal</p>
              <p className="text-2xl font-bold mt-1">
                ${investment.availableProfit.toLocaleString()}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Withdraw Profits</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Payment Account</label>
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

              <Button
                className="w-full"
                onClick={handleWithdraw}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw Funds
                  </>
                )}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Transaction History</h3>
              <Button
                variant="outline"
                onClick={handleExportReport}
                disabled={exportingReport}
              >
                {exportingReport ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {investment.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-accent rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "profit"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}>
                      {transaction.type === "profit" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {transaction.type}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {transaction.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant={transaction.status === "completed" ? "default" : "secondary"}
                      className="mt-1"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
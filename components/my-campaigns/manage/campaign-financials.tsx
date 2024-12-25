"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { WithdrawalDialog } from "./campaign-withdrawal-dialog";
import { TransactionDetailsDialog } from "./transaction-details-dialog";
import { WithdrawalDetailsDialog } from "./withdrawal-details-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  AlertCircle,
} from "lucide-react";
import type { CampaignStatus } from "../my-campaigns-view";

interface CampaignFinancialsProps {
  campaign: {
    id: string;
    status: CampaignStatus;
    goal: number;
    raised: number;
  };
}

type WithdrawalRequest = {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "approved" | "canceled";
  accountType: string;
  accountDetails: string;
};

export function CampaignFinancials({ campaign }: CampaignFinancialsProps) {
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const { toast } = useToast();

  const [withdrawalRequests] = useState<WithdrawalRequest[]>([
    {
      id: "1",
      amount: 25000,
      date: "2024-03-01",
      status: "pending",
      accountType: "Bank Account",
      accountDetails: "•••• 4242",
    },
    {
      id: "2",
      amount: 15000,
      date: "2024-02-15",
      status: "approved",
      accountType: "Bank Account",
      accountDetails: "•••• 4242",
    },
    {
      id: "3",
      amount: 10000,
      date: "2024-02-01",
      status: "canceled",
      accountType: "Digital Wallet",
      accountDetails: "example@email.com",
    },
  ]);

  const handleWithdraw = async (amount: number) => {
    try {
      // In a real app, make an API call to process withdrawal
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Withdrawal Initiated",
        description: `$${amount.toLocaleString()} will be transferred to your account.`,
      });
    } catch (error) {
      throw new Error("Failed to process withdrawal");
    }
  };

  const handleCancelRequest = async () => {
    if (!selectedRequestId) return;

    try {
      // In a real app, make an API call to cancel request
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Request Canceled",
        description: "The withdrawal request has been canceled.",
      });
      setSelectedRequestId(null);
    } catch (error) {
      toast({
        title: "Failed to Cancel",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "approved":
        return <Badge>Approved</Badge>;
      case "canceled":
        return <Badge variant="secondary">Canceled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold">
                  ${campaign.raised.toLocaleString()}
                </p>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round((campaign.raised / campaign.goal) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(campaign.raised / campaign.goal) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-xl font-bold mt-1">$45,000</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Withdrawals</p>
                  <p className="text-xl font-bold mt-1">$25,000</p>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setShowWithdrawDialog(true)}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Withdraw Funds
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">30-Day Volume</p>
                    <p className="text-xl font-bold mt-1">$75,000</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Withdrawals</p>
                    <p className="text-xl font-bold mt-1">$30,000</p>
                  </div>
                  <ArrowDownLeft className="h-8 w-8 text-blue-500" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Withdrawal Requests</h4>
        <div className="space-y-4">
          {withdrawalRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => setSelectedRequest(request)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    ${request.amount.toLocaleString()}
                  </p>
                  {getStatusBadge(request.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{request.accountType}</span>
                  <span>•</span>
                  <span>{request.accountDetails}</span>
                  <span>•</span>
                  <span>{new Date(request.date).toLocaleDateString()}</span>
                </div>
              </div>
              {request.status === "pending" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRequestId(request.id);
                      }}
                    >
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Withdrawal Request</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this withdrawal request? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, keep it</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelRequest}>
                        Yes, cancel request
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Recent Transactions</h4>
        <div className="space-y-4">
          {[
            {
              id: "1",
              investor: "Sarah Chen",
              amount: 50000,
              date: "2024-03-01",
              status: "completed",
              type: "investment",
              reference: "INV-2024-001",
              receipt: "receipt.pdf",
            },
            {
              id: "2",
              investor: "Michael Rodriguez",
              amount: 25000,
              date: "2024-02-28",
              status: "completed",
              type: "investment",
              reference: "INV-2024-002",
              receipt: "receipt.pdf",
            },
          ].map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
              onClick={() => setSelectedTransaction(transaction)}
            >
              <div>
                <p className="font-medium">{transaction.investor}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${transaction.amount.toLocaleString()}
                </p>
                <Badge variant="secondary">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <WithdrawalDialog
        open={showWithdrawDialog}
        onOpenChange={setShowWithdrawDialog}
        availableBalance={45000}
        onWithdraw={handleWithdraw}
      />

      {selectedTransaction && (
        <TransactionDetailsDialog
          open={!!selectedTransaction}
          onOpenChange={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      )}

      {selectedRequest && (
        <WithdrawalDetailsDialog
          open={!!selectedRequest}
          onOpenChange={() => setSelectedRequest(null)}
          request={selectedRequest}
          onCancel={(id) => {
            setSelectedRequestId(id);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
}
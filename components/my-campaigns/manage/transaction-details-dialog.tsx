"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    investor?: string;
    amount: number;
    date: string;
    status: string;
    type?: string;
    reference?: string;
    accountDetails?: string;
    receipt?: string;
  };
}

export function TransactionDetailsDialog({
  open,
  onOpenChange,
  transaction,
}: TransactionDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold">
                    ${transaction.amount.toLocaleString()}
                  </p>
                </div>
                <Badge>{transaction.status}</Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                {transaction.type && (
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{transaction.type}</p>
                  </div>
                )}
              </div>

              {transaction.investor && (
                <div>
                  <p className="text-sm text-muted-foreground">Investor</p>
                  <p className="font-medium">{transaction.investor}</p>
                </div>
              )}

              {transaction.accountDetails && (
                <div>
                  <p className="text-sm text-muted-foreground">Account Details</p>
                  <p className="font-medium">{transaction.accountDetails}</p>
                </div>
              )}

              {transaction.reference && (
                <div>
                  <p className="text-sm text-muted-foreground">Reference</p>
                  <p className="font-medium">{transaction.reference}</p>
                </div>
              )}
            </div>
          </Card>

          {transaction.receipt && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Receipt
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
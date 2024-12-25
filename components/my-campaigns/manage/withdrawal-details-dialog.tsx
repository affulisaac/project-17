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
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WithdrawalDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    id: string;
    amount: number;
    date: string;
    status: "pending" | "approved" | "canceled";
    accountType: string;
    accountDetails: string;
  };
  onCancel?: (id: string) => void;
}

export function WithdrawalDetailsDialog({
  open,
  onOpenChange,
  request,
  onCancel,
}: WithdrawalDetailsDialogProps) {
  const { toast } = useToast();

  const getStatusIcon = () => {
    switch (request.status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "canceled":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const handleCancel = async () => {
    if (onCancel) {
      onCancel(request.id);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdrawal Request Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold">
                    ${request.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon()}
                  <Badge variant={
                    request.status === "approved" ? "default" :
                    request.status === "canceled" ? "secondary" :
                    "outline"
                  }>
                    {request.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Date Requested</p>
                  <p className="font-medium">
                    {new Date(request.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">{request.accountType}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Details</p>
                <p className="font-medium">{request.accountDetails}</p>
              </div>

              {request.status === "pending" && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel Request
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
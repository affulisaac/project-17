"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, X, AlertCircle, Building, CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentSetupProps {
  data: {
    payment: {
      account: {
        type: string;
        details: string;
      };
      frequency: "monthly" | "quarterly" | "milestone";
      threshold: number;
    };
  };
  onUpdate: (data: any) => void;
}

export function PaymentSetup({ data, onUpdate }: PaymentSetupProps) {
  const handleAccountSelect = (type: string) => {
    onUpdate({
      ...data,
      payment: {
        ...data.payment,
        account: { ...data.payment.account, type },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Payment Setup</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Configure how you'll receive funds from your campaign
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Payment Account</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card
            className={`p-4 cursor-pointer transition-all ${
              data.payment.account.type === "bank"
                ? "ring-2 ring-primary"
                : "hover:bg-accent"
            }`}
            onClick={() => handleAccountSelect("bank")}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Bank Account</h4>
                <p className="text-sm text-muted-foreground">
                  Direct deposits to your bank account
                </p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-4 cursor-pointer transition-all ${
              data.payment.account.type === "wallet"
                ? "ring-2 ring-primary"
                : "hover:bg-accent"
            }`}
            onClick={() => handleAccountSelect("wallet")}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Digital Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  Receive funds in your digital wallet
                </p>
              </div>
            </div>
          </Card>
        </div>

        {data.payment.account.type === "bank" && (
          <div className="mt-6 space-y-4">
            <div>
              <Label>Account Holder Name</Label>
              <Input placeholder="Enter account holder name" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Account Number</Label>
                <Input type="password" placeholder="Enter account number" />
              </div>
              <div>
                <Label>Routing Number</Label>
                <Input placeholder="Enter routing number" />
              </div>
            </div>
          </div>
        )}

        {data.payment.account.type === "wallet" && (
          <div className="mt-6 space-y-4">
            <div>
              <Label>Wallet Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select wallet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="venmo">Venmo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="Enter wallet email address" />
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Payout Settings</h3>
          <div className="space-y-4">
            <div>
              <Label>Payout Frequency</Label>
              <Select
                value={data.payment.frequency}
                onValueChange={(value: "monthly" | "quarterly" | "milestone") =>
                  onUpdate({
                    ...data,
                    payment: { ...data.payment, frequency: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payout frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="milestone">Per Milestone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Minimum Payout Threshold ($)</Label>
              <Input
                type="number"
                value={data.payment.threshold || ""}
                onChange={(e) =>
                  onUpdate({
                    ...data,
                    payment: {
                      ...data.payment,
                      threshold: parseInt(e.target.value),
                    },
                  })
                }
                placeholder="Enter minimum amount for payout"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Minimum amount required before processing a payout
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-accent rounded-lg">
          <div className="p-2 bg-primary/10 rounded-lg">
            <AlertCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <h4 className="font-medium">Important Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Payouts are subject to verification</li>
              <li>• Processing times may vary by payment method</li>
              <li>• Keep your payment information up to date</li>
              <li>• Fees may apply based on payout method</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Building, 
  Wallet,
  Plus, 
  Check,
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddPaymentMethodDialog } from "./add-payment-method-dialog";
import { VerificationDialog } from "./verification-dialog";
import { PaymentMethodCard } from "./payment-method-card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type PaymentMethodType = "card" | "bank" | "wallet";

interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  isDefault: boolean;
  isVerified: boolean;
  details: {
    name?: string;
    last4?: string;
    expiryMonth?: string;
    expiryYear?: string;
    bankName?: string;
    accountType?: string;
    walletType?: string;
    email?: string;
  };
}

export function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      isDefault: true,
      isVerified: true,
      details: {
        name: "John Doe",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "24",
      },
    },
    {
      id: "2",
      type: "bank",
      isDefault: false,
      isVerified: true,
      details: {
        bankName: "Chase Bank",
        accountType: "Checking",
        last4: "9876",
      },
    },
  ]);

  const [showAddMethod, setShowAddMethod] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [pendingMethod, setPendingMethod] = useState<PaymentMethod | null>(null);
  const [filterType, setFilterType] = useState<PaymentMethodType | "all">("all");
  const { toast } = useToast();

  const handleAddMethod = (method: Omit<PaymentMethod, 'id' | 'isDefault' | 'isVerified'>) => {
    const newMethod: PaymentMethod = {
      id: Math.random().toString(36).substring(7),
      ...method,
      isDefault: methods.length === 0,
      isVerified: false,
    };

    setPendingMethod(newMethod);
    setShowAddMethod(false);
    setShowVerification(true);
  };

  const handleVerificationComplete = (method: PaymentMethod) => {
    setMethods((prev) => [...prev, { ...method, isVerified: true }]);
    setShowVerification(false);
    setPendingMethod(null);
    toast({
      title: "Payment Method Added",
      description: "Your payment method has been verified and added successfully.",
    });
  };

  const handleRemoveMethod = (methodId: string) => {
    setMethods((prev) => prev.filter((method) => method.id !== methodId));
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed.",
    });
  };

  const handleSetDefaultMethod = (methodId: string) => {
    setMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    );
    toast({
      title: "Default Method Updated",
      description: "Your default payment method has been updated.",
    });
  };

  const filteredMethods = methods.filter(
    (method) => filterType === "all" || method.type === filterType
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <p className="text-sm text-muted-foreground">
              Manage your payment methods and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Select
              value={filterType}
              onValueChange={(value) => setFilterType(value as PaymentMethodType | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="card">Cards</SelectItem>
                <SelectItem value="bank">Bank Accounts</SelectItem>
                <SelectItem value="wallet">Digital Wallets</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setShowAddMethod(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Method
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              onSetDefault={() => handleSetDefaultMethod(method.id)}
              onRemove={() => handleRemoveMethod(method.id)}
            />
          ))}

          {filteredMethods.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No payment methods found
            </div>
          )}
        </div>
      </Card>

      <AddPaymentMethodDialog
        open={showAddMethod}
        onOpenChange={setShowAddMethod}
        onSubmit={handleAddMethod}
      />

      {pendingMethod && (
        <VerificationDialog
          open={showVerification}
          onOpenChange={setShowVerification}
          method={pendingMethod}
          onComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
}
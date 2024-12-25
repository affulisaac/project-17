"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building, Wallet, AlertCircle } from "lucide-react";
import type { PaymentMethod } from "./payment-methods";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSetDefault: () => void;
  onRemove: () => void;
}

export function PaymentMethodCard({
  method,
  onSetDefault,
  onRemove,
}: PaymentMethodCardProps) {
  const getIcon = () => {
    switch (method.type) {
      case "card":
        return <CreditCard className="h-6 w-6" />;
      case "bank":
        return <Building className="h-6 w-6" />;
      case "wallet":
        return <Wallet className="h-6 w-6" />;
    }
  };

  const getTitle = () => {
    switch (method.type) {
      case "card":
        return `•••• ${method.details.last4}`;
      case "bank":
        return `${method.details.bankName} - ${method.details.accountType}`;
      case "wallet":
        return `${method.details.walletType} - ${method.details.email}`;
    }
  };

  const getSubtitle = () => {
    switch (method.type) {
      case "card":
        return `Expires ${method.details.expiryMonth}/${method.details.expiryYear}`;
      case "bank":
        return `Account ending in ${method.details.last4}`;
      case "wallet":
        return method.details.email;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        {getIcon()}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{getTitle()}</p>
            {method.isDefault && (
              <Badge variant="outline">Default</Badge>
            )}
            {!method.isVerified && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Unverified
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {getSubtitle()}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {!method.isDefault && method.isVerified && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSetDefault}
          >
            Make Default
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
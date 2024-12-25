"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";
import { PaymentForm } from "./forms/payment-form";
import { AddPaymentMethodDialog } from "./add-payment-method-dialog";
import { useToast } from "@/hooks/use-toast";

export function PaymentSettings() {
  const [showAddMethod, setShowAddMethod] = useState(false);
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/24</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>

          <Button 
            variant="outline" 
            className="w-full gap-2" 
            onClick={() => setShowAddMethod(true)}
          >
            <Plus className="h-4 w-4" />
            Add New Payment Method
          </Button>
        </div>
      </Card>

      <PaymentForm 
        defaultValues={{
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          city: "San Francisco",
          state: "ca",
          zipCode: "94105",
          country: "us"
        }}
      />

      <AddPaymentMethodDialog
        open={showAddMethod}
        onOpenChange={setShowAddMethod}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
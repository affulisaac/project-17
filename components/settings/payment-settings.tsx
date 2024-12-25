"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus } from "lucide-react";
import { AddPaymentMethodDialog } from "./../payments/add-payment-method-dialog"

export function PaymentSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [ showPayymentDialog, setShowPayymentDialog] = useState(false)
  const { toast } = useToast();

  const handleAddCard = async () => {
    setIsLoading(true);
    try {
      setShowPayymentDialog(true)
      // In a real app, integrate with a payment provider
      // await new Promise(resolve => setTimeout(resolve, 1000));
      // toast({
      //   title: "Card Added",
      //   description: "Your payment method has been added successfully.",
      // });
    } catch (error) {
      toast({
        title: "Failed to Add Card",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

          <Button variant="outline" className="w-full gap-2" onClick={handleAddCard}>
            <Plus className="h-4 w-4" />
            Add New Card
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company Name (Optional)</Label>
            <Input placeholder="Your Company LLC" />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="123 Street Name" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="City" />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ZIP Code</Label>
              <Input placeholder="12345" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Country</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="mt-6">Save Billing Information</Button>
      </Card>
       <AddPaymentMethodDialog open={showPayymentDialog} />
    </div>

   
  );
}
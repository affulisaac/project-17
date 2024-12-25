"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Plus, DollarSign, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { PaymentMethods } from "./payment-methods";
import { TransactionHistory } from "./transaction-history";
import { BillingSettings } from "./billing-settings";

export function PaymentView() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddFunds = async () => {
    setIsLoading(true);
    try {
      // In a real app, integrate with a payment provider
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Funds Added",
        description: "Your funds have been added successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to Add Funds",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your payment methods and transactions
          </p>
        </header>

        {/* Balance Card */}
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <h2 className="text-3xl font-bold mt-1">$12,345.67</h2>
              <Button className="mt-4" onClick={handleAddFunds}>
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h2 className="text-3xl font-bold">$45,678.90</h2>
                <span className="text-sm text-green-500">+12.3%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Across 8 campaigns
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Recent Activity</p>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span>Received $1,234.56</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="h-4 w-4 text-red-500" />
                  <span>Invested $2,345.67</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="payment-methods" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="billing">
            <BillingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
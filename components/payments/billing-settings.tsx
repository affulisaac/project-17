"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // In a real app, make an API call to update billing info
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings Updated",
        description: "Your billing information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
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
        <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
        <form onSubmit={handleSave} className="space-y-6">
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
            <Label>Tax ID/VAT Number (Optional)</Label>
            <Input placeholder="Tax ID or VAT number" />
          </div>

          <div className="space-y-2">
            <Label>Billing Email</Label>
            <Input type="email" placeholder="billing@example.com" />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="Street Address" />
            <Input placeholder="Apt, Suite, etc. (optional)" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>City</Label>
              <Input placeholder="City" />
            </div>
            <div className="space-y-2">
              <Label>State/Province</Label>
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
              <Label>ZIP/Postal Code</Label>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Invoice #1234</p>
              <p className="text-sm text-muted-foreground">Feb 15, 2024</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium">$299.00</p>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Invoice #1233</p>
              <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium">$299.00</p>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PaymentFormProps {
  onSubmit?: (data: any) => void;
  defaultValues?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export function PaymentForm({ onSubmit, defaultValues = {} }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      if (onSubmit) {
        await onSubmit(data);
      }

      toast({
        title: "Information Updated",
        description: "Your billing information has been saved successfully.",
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
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Billing Information</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input 
              name="firstName"
              defaultValue={defaultValues.firstName}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              name="lastName"
              defaultValue={defaultValues.lastName}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company Name (Optional)</Label>
          <Input
            name="company"
            defaultValue={defaultValues.company}
            placeholder="Your Company LLC"
          />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            name="address"
            defaultValue={defaultValues.address}
            placeholder="123 Street Name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              name="city"
              defaultValue={defaultValues.city}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Select name="state" defaultValue={defaultValues.state}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ZIP Code</Label>
            <Input
              name="zipCode"
              defaultValue={defaultValues.zipCode}
              placeholder="12345"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Country</Label>
          <Select name="country" defaultValue={defaultValues.country}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Card>
  );
}
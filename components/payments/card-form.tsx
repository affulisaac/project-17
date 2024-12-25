"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCardNumber, formatExpiryDate } from "@/lib/payment-utils";

interface CardFormProps {
  form: UseFormReturn<{
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    name: string;
  }>;
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
}

export function CardForm({ form, onSubmit, isLoading }: CardFormProps) {
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formattedValue, month, year } = formatExpiryDate(e.target.value);
    e.target.value = formattedValue;
    
    if (month) form.setValue("expiryMonth", month);
    if (year) form.setValue("expiryYear", year);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cardholder Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Name on card" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value);
                    field.onChange(e.target.value.replace(/\s/g, ""));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Expiry Date</FormLabel>
            <FormControl>
              <Input
                placeholder="MM/YY"
                maxLength={5}
                onChange={handleExpiryDateChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding Card..." : "Add Card"}
        </Button>
      </form>
    </Form>
  );
}
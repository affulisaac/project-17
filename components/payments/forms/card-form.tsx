"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import { formatCardNumber, formatExpiryDate } from "@/lib/payment-utils";

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  expiryYear: z.string().regex(/^\d{2}$/, "Invalid year"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
  name: z.string().min(1, "Cardholder name is required"),
});

interface CardFormProps {
  onSuccess?: () => void;
}

export function CardForm({ onSuccess }: CardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof cardSchema>) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to save card
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Card Added",
        description: "Your card has been added successfully.",
      });
      
      onSuccess?.();
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
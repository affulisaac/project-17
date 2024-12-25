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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const walletSchema = z.object({
  email: z.string().email("Invalid email address"),
  walletType: z.enum(["paypal", "stripe", "googlepay", "applepay"]),
});

interface WalletFormProps {
  onSuccess?: () => void;
}

export function WalletForm({ onSuccess }: WalletFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof walletSchema>>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      email: "",
      walletType: "paypal",
    },
  });

  const onSubmit = async (values: z.infer<typeof walletSchema>) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to connect wallet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Wallet Connected",
        description: "Your digital wallet has been connected successfully.",
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Failed to Connect Wallet",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="walletType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digital Wallet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="googlepay">Google Pay</SelectItem>
                  <SelectItem value="applepay">Apple Pay</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter email address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Connecting Wallet..." : "Connect Wallet"}
        </Button>
      </form>
    </Form>
  );
}
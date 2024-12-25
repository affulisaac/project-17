"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardForm } from "./card-form";

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  expiryYear: z.string().regex(/^\d{2}$/, "Invalid year"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
  name: z.string().min(1, "Cardholder name is required"),
});

interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (cardDetails: {
    last4: string;
    expiryMonth: string;
    expiryYear: string;
  }) => void;
}

export function AddCardDialog({ open, onOpenChange, onSubmit }: AddCardDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (values: z.infer<typeof cardSchema>) => {
    setIsLoading(true);
    try {
      // In a real app, this would call your payment processor's API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onSubmit({
        last4: values.cardNumber.slice(-4),
        expiryMonth: values.expiryMonth,
        expiryYear: values.expiryYear,
      });
      
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new credit or debit card to your account
          </DialogDescription>
        </DialogHeader>
        <CardForm
          form={form}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
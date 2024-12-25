"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TwoFactorSetup } from "./two-factor-setup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function SecuritySettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup2FA, setShowSetup2FA] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      // In a real app, make an API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      form.reset();
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

  const handle2FASetupComplete = () => {
    setIs2FAEnabled(true);
    setShowSetup2FA(false);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled for your account.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </Form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        
        {is2FAEnabled ? (
          <div className="space-y-4">
            <p className="text-sm text-green-600 dark:text-green-500">
              Two-factor authentication is enabled
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setIs2FAEnabled(false);
                toast({
                  title: "2FA Disabled",
                  description: "Two-factor authentication has been disabled.",
                });
              }}
            >
              Disable 2FA
            </Button>
          </div>
        ) : (
          <Dialog open={showSetup2FA} onOpenChange={setShowSetup2FA}>
            <DialogTrigger asChild>
              <Button variant="outline">Enable 2FA</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
                <DialogDescription>
                  Enhance your account security by enabling two-factor authentication.
                </DialogDescription>
              </DialogHeader>
              <TwoFactorSetup onComplete={handle2FASetupComplete} />
            </DialogContent>
          </Dialog>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your connected social accounts and third-party integrations.
        </p>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Connect Google Account
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Connect LinkedIn Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
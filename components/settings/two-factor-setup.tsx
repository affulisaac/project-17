"use client";

import { useState, useEffect } from "react";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TwoFactorSetupProps {
  onComplete: () => void;
}

export function TwoFactorSetup({ onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState(1);
  const [secret] = useState(authenticator.generateSecret());
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes] = useState(() => 
    Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    )
  );
  const { toast } = useToast();

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const otpauth = authenticator.keyuri(
          "user@example.com", // In a real app, use the actual user's email
          "VentureConnect",
          secret
        );
        const qr = await QRCode.toDataURL(otpauth);
        setQrCode(qr);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to generate QR code",
          variant: "destructive",
        });
      }
    };

    generateQRCode();
  }, [secret, toast]);

  const handleVerification = () => {
    try {
      const isValid = authenticator.verify({
        token: verificationCode,
        secret: secret,
      });

      if (isValid) {
        setStep(3);
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check the code and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleComplete = () => {
    // In a real app, save the verified state and backup codes to the server
    onComplete();
  };

  return (
    <div className="space-y-4">
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Scan QR Code</CardTitle>
            <CardDescription>
              Scan this QR code with your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Can&apos;t scan the QR code? Use this code instead:
              </p>
              <code className="block mt-2 p-2 bg-muted rounded text-sm">
                {secret}
              </code>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setStep(2)}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Verify Code</CardTitle>
            <CardDescription>
              Enter the 6-digit code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className="text-center text-2xl tracking-widest"
            />
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleVerification}
              disabled={verificationCode.length !== 6}
            >
              Verify
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Save Backup Codes</CardTitle>
            <CardDescription>
              Save these backup codes in a secure place. You can use them to access
              your account if you lose your authenticator device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {backupCodes.map((code, index) => (
                <code
                  key={index}
                  className="p-2 bg-muted rounded text-center text-sm"
                >
                  {code}
                </code>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button className="flex-1" onClick={handleComplete}>
              Complete Setup
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
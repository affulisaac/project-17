"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  FileText,
  Camera,
} from "lucide-react";

type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";
type DocumentType = "passport" | "drivers_license" | "national_id";

interface KYCVerificationProps {
  status?: VerificationStatus;
}

export function KYCVerification({ status = "unverified" }: KYCVerificationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentType, setDocumentType] = useState<DocumentType | "">("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [selfie, setSelfie] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setDocuments(Array.from(files));
    }
  };

  const handleSelfieUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelfie(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!documentType || documents.length === 0 || !selfie) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, make an API call to submit KYC documents
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Verification Submitted",
        description: "Your documents have been submitted for review.",
      });
      
      setCurrentStep(3);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Shield className="h-3 w-3 mr-1" />
            Unverified
          </Badge>
        );
    }
  };

  if (status === "verified") {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Identity Verification</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your identity has been verified
            </p>
          </div>
          {getStatusBadge()}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Identity Verification</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Complete verification to access all features
            </p>
          </div>
          {getStatusBadge()}
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Document Type</Label>
                <Select
                  value={documentType}
                  onValueChange={(value: DocumentType) => setDocumentType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                    <SelectItem value="national_id">National ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Upload Document</Label>
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleDocumentUpload}
                      multiple
                    />
                  </label>
                </div>
                {documents.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <FileText className="h-4 w-4" />
                        <span>{doc.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => setCurrentStep(2)}
              disabled={!documentType || documents.length === 0}
            >
              Continue
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <Label>Take a Selfie</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Please take a clear photo of yourself holding your ID
              </p>
              <div className="mt-2">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to take a photo or upload one
                    </p>
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    capture="user"
                    onChange={handleSelfieUpload}
                  />
                </label>
              </div>
              {selfie && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Photo uploaded: {selfie.name}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={isSubmitting || !selfie}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Verification"
                )}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">Verification Submitted</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Your documents are being reviewed. This usually takes 24-48 hours.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
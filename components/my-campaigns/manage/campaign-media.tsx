"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X, Upload } from "lucide-react";
import Image from "next/image";
import type { CampaignStatus } from "../my-campaigns-view";

interface CampaignMediaProps {
  campaign: {
    id: string;
    image: string;
    status: CampaignStatus;
  };
}

export function CampaignMedia({ campaign }: CampaignMediaProps) {
  const [images, setImages] = useState<string[]>([campaign.image]);
  const [videoUrl, setVideoUrl] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload these to a storage service
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...newImages]);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload these to a storage service
      const newDocs = Array.from(files).map((file) => file.name);
      setDocuments([...documents, ...newDocs]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const removeDocument = (index: number) => {
    const newDocs = [...documents];
    newDocs.splice(index, 1);
    setDocuments(newDocs);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Campaign Media</h3>
        <div className="space-y-4">
          <Label>Campaign Images</Label>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={image}
                  alt={`Campaign image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="border-2 border-dashed rounded-lg p-4 hover:bg-accent cursor-pointer flex flex-col items-center justify-center aspect-video">
              <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Upload Images
              </span>
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Campaign Video</Label>
        <Input
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube or Vimeo URL"
        />
      </div>

      <div className="space-y-4">
        <Label>Supporting Documents</Label>
        <Card className="p-4">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-accent rounded"
              >
                <span className="text-sm">{doc}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeDocument(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg hover:bg-accent cursor-pointer">
              <Upload className="h-4 w-4" />
              <span className="text-sm">Upload Documents</span>
              <Input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleDocumentUpload}
              />
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
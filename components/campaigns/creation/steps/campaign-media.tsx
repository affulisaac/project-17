"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface CampaignMediaProps {
  data: {
    media: {
      images: File[];
      video?: string;
    };
  };
  onUpdate: (data: any) => void;
}

export function CampaignMedia({ data, onUpdate }: CampaignMediaProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      onUpdate({
        ...data,
        media: {
          ...data.media,
          images: [...Array.from(files)],
        },
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...data.media.images];
    newImages.splice(index, 1);
    onUpdate({
      ...data,
      media: {
        ...data.media,
        images: newImages,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Campaign Media</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add photos and video to showcase your campaign
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Campaign Images</Label>
          <div className="grid grid-cols-2 gap-4">
            {data.media.images.map((file, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
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
              <span className="text-sm text-muted-foreground">Upload Images</span>
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Campaign Video URL</Label>
          <Input
            value={data.media.video || ""}
            onChange={(e) =>
              onUpdate({
                ...data,
                media: {
                  ...data.media,
                  video: e.target.value,
                },
              })
            }
            placeholder="Enter YouTube or Vimeo URL"
          />
        </div>
      </div>
    </div>
  );
}
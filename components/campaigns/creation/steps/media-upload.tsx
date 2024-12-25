"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";

interface MediaUploadProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function MediaUpload({ data, onUpdate }: MediaUploadProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload these to a storage service
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      onUpdate({ ...data, images: [...(data.images || []), ...newImages] });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...data.images];
    newImages.splice(index, 1);
    onUpdate({ ...data, images: newImages });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Media Upload</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add photos and videos to showcase your campaign
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Campaign Images</Label>
          <div className="grid grid-cols-2 gap-4">
            {(data.images || []).map((image: string, index: number) => (
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

        <div className="space-y-4">
          <Label htmlFor="video">Campaign Video URL</Label>
          <Input
            id="video"
            value={data.video}
            onChange={(e) => onUpdate({ ...data, video: e.target.value })}
            placeholder="Enter YouTube or Vimeo URL"
          />
        </div>
      </div>
    </div>
  );
}
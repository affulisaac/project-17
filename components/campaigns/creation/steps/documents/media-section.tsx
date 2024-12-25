'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ImagePlus, Upload, X, FileText } from 'lucide-react';
import type { MediaAssets } from './types';

interface MediaSectionProps {
  media: MediaAssets;
  onUpdate: (media: MediaAssets) => void;
}

export function MediaSection({ media, onUpdate }: MediaSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Campaign Images</Label>
          <p className="text-sm text-muted-foreground">
            Upload images showcasing your project or product
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {media?.images?.map((file, index) => (
            <div
              key={index}
              className="relative aspect-video bg-accent rounded-lg"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => {
                  const newImages = [...media?.images];
                  newImages.splice(index, 1);
                  onUpdate({ ...media, images: newImages });
                }}
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
              multiple
              onChange={(e) => {
                if (!e.target.files) return;
                const newImages = [
                  ...media?.images,
                  ...Array.from(e.target.files),
                ];
                onUpdate({ ...media, images: newImages });
              }}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Pitch Deck</Label>
          <p className="text-sm text-muted-foreground">
            Upload your pitch presentation
          </p>
        </div>

        {media?.pitch ? (
          <div className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm truncate">{media?.pitch.name}</span>
              <Badge variant="secondary" className="text-xs">
                {(media?.pitch.size / 1024 / 1024).toFixed(2)} MB
              </Badge>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onUpdate({ ...media, pitch: undefined })}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg hover:bg-accent cursor-pointer">
            <Upload className="h-4 w-4" />
            <span className="text-sm">Upload Pitch Deck</span>
            <Input
              type="file"
              className="hidden"
              accept=".pdf,.ppt,.pptx"
              onChange={(e) => {
                if (!e.target.files?.[0]) return;
                onUpdate({ ...media, pitch: e.target.files[0] });
              }}
            />
          </label>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Video URL</Label>
          <p className="text-sm text-muted-foreground">
            Add a link to your pitch or demo video (YouTube or Vimeo)
          </p>
        </div>
        <Input
          placeholder="https://"
          value={media?.video || ''}
          onChange={(e) => {
            if (!e.target.files || !(e.target.files instanceof FileList))
              return;

            const newImages = [
              ...(media?.images || []), // Default to an empty array if `media?.images` is undefined or null
              ...Array.from(e.target.files), // Convert FileList to an array
            ];

            onUpdate({ ...media, images: newImages }); // Update the media object
          }}
          //onChange={(e) => onUpdate({ ...media, video: e.target.value })}
        />
      </div>
    </div>
  );
}

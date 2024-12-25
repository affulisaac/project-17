"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Upload, X, AlertCircle } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Update {
  id: string;
  title: string;
  content: string;
  type: "milestone" | "general" | "important";
  date: string;
  attachments?: {
    type: "image" | "document";
    url: string;
    name: string;
  }[];
}

export function CampaignUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    content: "",
    type: "general",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isPosting, setIsPosting] = useState(false);
  const { toast } = useToast();

  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments([...attachments, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!newUpdate.title || !newUpdate.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsPosting(true);
    try {
      // In a real app, upload attachments and create update via API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const update: Update = {
        id: Date.now().toString(),
        ...newUpdate,
        date: new Date().toISOString(),
        attachments: attachments.map(file => ({
          type: file.type.startsWith("image/") ? "image" : "document",
          url: URL.createObjectURL(file),
          name: file.name,
        })),
      };

      setUpdates([update, ...updates]);
      setNewUpdate({ title: "", content: "", type: "general" });
      setAttachments([]);

      toast({
        title: "Update Posted",
        description: "Your update has been posted successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to Post Update",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Post Update</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Update Type</label>
            <Select
              value={newUpdate.type}
              onValueChange={(value: "milestone" | "general" | "important") =>
                setNewUpdate({ ...newUpdate, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select update type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Update</SelectItem>
                <SelectItem value="milestone">Milestone Update</SelectItem>
                <SelectItem value="important">Important Announcement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newUpdate.title}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, title: e.target.value })
              }
              placeholder="Update title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Content</label>
            <Textarea
              value={newUpdate.content}
              onChange={(e) =>
                setNewUpdate({ ...newUpdate, content: e.target.value })
              }
              placeholder="Share your progress..."
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Attachments</label>
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="relative p-4 border rounded-lg"
                  >
                    {file.type.startsWith("image/") ? (
                      <div className="relative aspect-video">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <label className="border-2 border-dashed rounded-lg p-4 hover:bg-accent cursor-pointer flex flex-col items-center justify-center aspect-video">
                  <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Add Images or Documents
                  </span>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                    multiple
                    onChange={handleAttachmentUpload}
                  />
                </label>
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handlePost}
            disabled={isPosting}
          >
            {isPosting ? "Posting..." : "Post Update"}
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {update.type === "important" && (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <Badge variant="secondary">
                    {update.type === "milestone"
                      ? "Milestone Update"
                      : update.type === "important"
                      ? "Important"
                      : "General Update"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(update.date).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-lg font-medium">{update.title}</h4>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{update.content}</p>

            {update.attachments && update.attachments.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {update.attachments.map((attachment, index) => (
                  <div key={index} className="relative">
                    {attachment.type === "image" ? (
                      <div className="relative aspect-video">
                        <Image
                          src={attachment.url}
                          alt={attachment.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-4 border rounded">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm truncate">
                          {attachment.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, X, FileText } from "lucide-react";
import type { DocumentSectionProps } from "./types";

export function DocumentSection({
  type,
  title,
  description,
  required = false,
  documents,
  onUpload,
  onRemove,
}: DocumentSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label>{title}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {required && (
          <Badge variant="secondary" className="text-xs">Required</Badge>
        )}
      </div>

      <div className="space-y-2">
        {documents?
          .filter(doc => doc.type === type)
          ?.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm truncate">{doc.file.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onRemove(doc.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

        <label className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg hover:bg-accent cursor-pointer">
          <Upload className="h-4 w-4" />
          <span className="text-sm">Upload {title}</span>
          <Input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            multiple
            onChange={(e) => onUpload(type, e.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, File, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
  type: "image" | "file";
}

export function FileUpload({ open, onClose, onUpload, type }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
    onClose();
  }, [onUpload, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: type === "image" 
      ? { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }
      : { 'application/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx'] },
    multiple: true,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload {type === "image" ? "Images" : "Files"}
          </DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/10" : "border-muted"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {type === "image" ? (
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            ) : (
              <File className="h-8 w-8 text-muted-foreground" />
            )}
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>
                Drag & drop files here, or click to select{" "}
                {type === "image" ? "images" : "files"}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { BusinessType } from "../campaign-creation-stepper";
import { DocumentSection } from "./documents/document-section";
import { MediaSection } from "./documents/media-section";
import type { Document, DocumentType, MediaAssets } from "./documents/types";

interface SupportingDocumentsProps {
  data: {
    businessType: BusinessType;
    media: MediaAssets;
  };
  onUpdate: (data: any) => void;
}

export function SupportingDocuments({ data, onUpdate }: SupportingDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleDocumentUpload = (type: DocumentType, files: FileList | null) => {
    if (!files) return;

    const newDocuments = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type,
    }));

    const updatedDocuments = [...documents, ...newDocuments];
    setDocuments(updatedDocuments);
    onUpdate({ ...data, documents: updatedDocuments });
  };

  const handleDocumentRemove = (documentId: string) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== documentId);
    setDocuments(updatedDocuments);
    onUpdate({ ...data, documents: updatedDocuments });
  };

  const handleMediaUpdate = (media: MediaAssets) => {
    onUpdate({ ...data, media });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Supporting Documents</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Upload documents to support your campaign
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <DocumentSection
          type="business"
          title="Business Documents"
          description="Business plan, market research, or other relevant documents"
          required={data.businessType === "unstarted"}
          documents={documents}
          onUpload={handleDocumentUpload}
          onRemove={handleDocumentRemove}
        />

        <DocumentSection
          type="financial"
          title="Financial Documents"
          description="Financial projections, historical statements, or funding details"
          required={data.businessType === "started"}
          documents={documents}
          onUpload={handleDocumentUpload}
          onRemove={handleDocumentRemove}
        />

        <DocumentSection
          type="legal"
          title="Legal Documents"
          description="Licenses, permits, or other legal documentation"
          documents={documents}
          onUpload={handleDocumentUpload}
          onRemove={handleDocumentRemove}
        />

        <DocumentSection
          type="other"
          title="Additional Documents"
          description="Any other supporting documentation"
          documents={documents}
          onUpload={handleDocumentUpload}
          onRemove={handleDocumentRemove}
        />
      </Card>

      <Card className="p-6">
        <div>
          <h3 className="font-semibold mb-4">Media Assets</h3>
          <MediaSection
            media={data.media}
            onUpdate={handleMediaUpdate}
          />
        </div>
      </Card>
    </div>
  );
}
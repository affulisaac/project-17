export type DocumentType = "business" | "financial" | "legal" | "other";

export interface Document {
  id: string;
  file: File;
  type: DocumentType;
}

export interface MediaAssets {
  images: File[];
  video?: string;
  pitch?: File;
}

export interface DocumentSectionProps {
  type: DocumentType;
  title: string;
  description: string;
  required?: boolean;
  documents: Document[];
  onUpload: (type: DocumentType, files: FileList | null) => void;
  onRemove: (documentId: string) => void;
}
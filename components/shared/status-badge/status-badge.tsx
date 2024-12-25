import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  showIcon?: boolean;
}

export function StatusBadge({ status, variant, showIcon = true }: StatusBadgeProps) {
  const getIcon = () => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
      case "active":
        return <CheckCircle className="h-3 w-3" />;
      case "pending":
      case "processing":
        return <Clock className="h-3 w-3" />;
      case "canceled":
      case "declined":
      case "failed":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getVariant = () => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
      case "active":
        return "default";
      case "pending":
      case "processing":
        return "secondary";
      case "canceled":
      case "declined":
      case "failed":
        return "destructive";
      default:
        return variant || "outline";
    }
  };

  return (
    <Badge variant={getVariant()} className="flex items-center gap-1">
      {showIcon && getIcon()}
      <span className="capitalize">{status}</span>
    </Badge>
  );
}
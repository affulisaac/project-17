"use client";

import { Button } from "@/components/ui/button";
import { Search, Filter, RefreshCcw } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "search" | "filter" | "default";
  showReset?: boolean;
  onReset?: () => void;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  icon = "default",
  showReset = true,
  onReset,
}: EmptyStateProps) {
  const Icon = {
    search: Search,
    filter: Filter,
    default: Search,
  }[icon];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {showReset && onReset && (
        <Button 
          variant="outline" 
          onClick={onReset}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES, STAGES, SORT_OPTIONS } from "@/config/constants";
import type { FilterState, FilterActions } from "@/types/campaign";

interface CampaignFiltersProps {
  filters: FilterState;
  actions: FilterActions;
}

export function CampaignFilters({ filters, actions }: CampaignFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={filters.search}
            onChange={(e) => actions.setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Campaigns</SheetTitle>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Categories</h3>
                  {filters.categories.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => actions.clearFilters()}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Badge
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => actions.toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Stage</h3>
                  {filters.stages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => actions.clearFilters()}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((stage) => (
                    <Badge
                      key={stage}
                      variant={filters.stages.includes(stage) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => actions.toggleStage(stage)}
                    >
                      {stage}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Funding Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm">Min</label>
                    <Input
                      type="number"
                      value={filters.fundingRange[0]}
                      onChange={(e) => actions.setFundingRange([
                        parseInt(e.target.value),
                        filters.fundingRange[1]
                      ])}
                    />
                  </div>
                  <div>
                    <label className="text-sm">Max</label>
                    <Input
                      type="number"
                      value={filters.fundingRange[1]}
                      onChange={(e) => actions.setFundingRange([
                        filters.fundingRange[0],
                        parseInt(e.target.value)
                      ])}
                    />
                  </div>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => actions.clearFilters()}
              >
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <Select 
          value={filters.sortBy}
          onValueChange={(value) => actions.setSortBy(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(filters.categories.length > 0 || filters.stages.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => actions.toggleCategory(category)}
              />
            </Badge>
          ))}
          {filters.stages.map((stage) => (
            <Badge
              key={stage}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {stage}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => actions.toggleStage(stage)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
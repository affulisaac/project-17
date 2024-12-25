"use client";

import { InvestmentCard } from "./investment-card";

interface InvestmentListProps {
  investments: Array<{
    id: string;
    companyName: string;
    amount: number;
    returnRate: number;
    status: "active" | "pending" | "completed";
    progress: number;
    risk: "low" | "medium" | "high";
    sector: string;
    startDate: string;
    endDate?: string;
  }>;
}

export function InvestmentList({ investments }: InvestmentListProps) {
  if (investments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No investments found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {investments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}
    </div>
  );
}
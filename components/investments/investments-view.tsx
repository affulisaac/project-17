"use client";

import { useState } from "react";
import { InvestmentPortfolio } from "./investment-portfolio";
import { InvestmentList } from "./investment-list";
import { InvestmentManagement } from "./investment-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for investments
const mockInvestments = [
  {
    id: "1",
    companyName: "EcoTech Solar Solutions",
    amount: 50000,
    returnRate: 12.5,
    status: "active" as const,
    progress: 75,
    risk: "medium" as const,
    sector: "Clean Energy",
    startDate: "2024-01-15",
    endDate: "2024-12-15",
    totalProfit: 6250,
    availableProfit: 4500,
    milestones: [
      {
        id: "m1",
        title: "Product Development Phase 1",
        description: "Complete initial prototype and testing",
        amount: 20000,
        dueDate: "2024-03-15",
        status: "approved",
        progress: 100,
        proofOfWork: "Prototype documentation and test results attached",
      },
      {
        id: "m2",
        title: "Market Launch Preparation",
        description: "Prepare marketing materials and distribution channels",
        amount: 15000,
        dueDate: "2024-06-15",
        status: "pending",
        progress: 60,
      },
    ],
    transactions: [
      {
        id: "t1",
        type: "profit",
        amount: 2500,
        date: "2024-02-15",
        status: "completed",
      },
      {
        id: "t2",
        type: "withdrawal",
        amount: 1500,
        date: "2024-02-01",
        status: "completed",
      },
    ],
    disputes: [
      {
        id: "d1",
        type: "milestone",
        description: "Delay in milestone completion",
        status: "resolved",
        date: "2024-01-20",
        resolution: "Timeline adjusted with mutual agreement",
      },
    ],
  },
  {
    id: "2",
    companyName: "HealthAI Diagnostics",
    amount: 75000,
    returnRate: 8.2,
    status: "active" as const,
    progress: 60,
    risk: "low" as const,
    sector: "Healthcare",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    totalProfit: 3000,
    availableProfit: 3000,
    milestones: [
      {
        id: "m3",
        title: "AI Model Development",
        description: "Complete core AI diagnostic model",
        amount: 30000,
        dueDate: "2024-04-15",
        status: "pending",
        progress: 80,
      },
    ],
    transactions: [],
    disputes: [],
  },
];

export function InvestmentsView() {
  const [activeInvestments] = useState(mockInvestments);
  const [selectedInvestment, setSelectedInvestment] = useState(mockInvestments[0]);

  return (
    <div className="p-6 md:ml-64">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">My Investments</h1>
          <p className="text-muted-foreground mt-1">
            Track your portfolio and manage your investments
          </p>
        </header>

        <Tabs defaultValue="portfolio">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <InvestmentPortfolio />
          </TabsContent>
          
          <TabsContent value="investments">
            <InvestmentList 
              investments={activeInvestments}
              onSelect={setSelectedInvestment}
            />
          </TabsContent>
          
          <TabsContent value="management">
            <InvestmentManagement investment={selectedInvestment} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
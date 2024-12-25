"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpRight, ArrowDownLeft, Search, Download } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "investment",
    campaign: "EcoTech Solar Solutions",
    amount: 5000,
    status: "completed",
    date: "2024-02-15",
  },
  {
    id: "2",
    type: "deposit",
    amount: 10000,
    status: "completed",
    date: "2024-02-14",
  },
  {
    id: "3",
    type: "withdrawal",
    amount: 2500,
    status: "pending",
    date: "2024-02-13",
  },
  {
    id: "4",
    type: "return",
    campaign: "HealthAI Diagnostics",
    amount: 7500,
    status: "completed",
    date: "2024-02-12",
  },
];

export function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.campaign?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="investment">Investments</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="return">Returns</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  {transaction.type === "investment" || transaction.type === "withdrawal" ? (
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium capitalize">{transaction.type}</p>
                  {transaction.campaign && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.campaign}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {transaction.type === "deposit" || transaction.type === "return"
                    ? "+"
                    : "-"}
                  ${transaction.amount.toLocaleString()}
                </p>
                <Badge
                  variant={transaction.status === "completed" ? "default" : "secondary"}
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
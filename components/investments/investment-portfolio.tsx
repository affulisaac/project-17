"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function InvestmentPortfolio() {
  // Sample data - in a real app, this would come from an API
  const portfolioData = [
    { name: "Tech", value: 40000 },
    { name: "Healthcare", value: 30000 },
    { name: "Real Estate", value: 20000 },
    { name: "Sustainability", value: 10000 },
  ];

  const performanceData = [
    { month: "Jan", value: 100000 },
    { month: "Feb", value: 120000 },
    { month: "Mar", value: 115000 },
    { month: "Apr", value: 130000 },
    { month: "May", value: 140000 },
    { month: "Jun", value: 160000 },
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6 mt-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Total Portfolio Value: ${totalValue.toLocaleString()}
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Investments</h3>
        <div className="space-y-6">
          {portfolioData.map((investment, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{investment.name}</span>
                <span>${investment.value.toLocaleString()}</span>
              </div>
              <Progress value={(investment.value / totalValue) * 100} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
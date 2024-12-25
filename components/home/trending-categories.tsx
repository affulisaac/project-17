"use client";

import { Card } from "@/components/ui/card";
import { Laptop, Stethoscope, Building2, Sprout } from "lucide-react";
import { useRouter } from "next/navigation";

const categoryIcons = {
  Technology: Laptop,
  Healthcare: Stethoscope,
  "Real Estate": Building2,
  "Clean Energy": Sprout,
  Agriculture: Sprout,
} as const;

interface CategoryStats {
  name: string;
  count: number;
  color: string;
}

const trendingCategories: CategoryStats[] = [
  {
    name: "Technology",
    count: 245,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Healthcare",
    count: 189,
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Real Estate",
    count: 156,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "Clean Energy",
    count: 134,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

export function TrendingCategories() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    // Ensure consistent category casing and encoding
    const normalizedCategory = category.toLowerCase();
    const encodedCategory = encodeURIComponent(normalizedCategory);
    router.push(`/campaigns?category=${encodedCategory}`);
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Trending Categories</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {trendingCategories.map(({ name, count, color }) => {
          const Icon = categoryIcons[name as keyof typeof categoryIcons] || Laptop;
          return (
            <Card
              key={name}
              className="p-6 hover:bg-accent transition-colors cursor-pointer"
              onClick={() => handleCategoryClick(name)}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {count} campaigns
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
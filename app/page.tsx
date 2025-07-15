"use client";
import { RevenueChart } from "@/components/Dashboard/chart/RevenueChart";
import LowIngredientCard from "@/components/Dashboard/LowIngredientCard";
import ProductRankingCard from "@/components/Dashboard/ProductRankingCard";
import StatsGrid from "@/components/layout/grid/StatsGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

export default function DashboardPage() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("today");
  return (
    <div>
      <div className="mb-3 flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Tabs
          value={selectedTimeFilter}
          onValueChange={(value) => setSelectedTimeFilter(value)}
        >
          <TabsList>
            <TabsTrigger value="today" className="px-4 py-2">
              Hôm nay
            </TabsTrigger>
            <TabsTrigger value="this_week" className="px-4 py-2">
              Tuần này
            </TabsTrigger>
            <TabsTrigger value="this_month" className="px-4 py-2">
              Tháng này
            </TabsTrigger>
            <TabsTrigger value="three_month_ago" className="px-4 py-2">
              3 Tháng qua
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4">
        <StatsGrid />
        <div className="grid grid-cols-4 gap-6">
          <ProductRankingCard />
          <LowIngredientCard />
          <div className="col-start-3 col-end-5">
            <RevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
}

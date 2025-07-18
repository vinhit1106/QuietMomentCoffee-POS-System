"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import InventoryStatsCards from "./_components/StockStatsCards";
import StockActions from "./_components/StockActions";
import { DataTable } from "./ingredient-table/data-table";
import { columns } from "./ingredient-table/columns";
import { useIngredients } from "@/hooks/queries/useIngredient";

export default function InventoryPage() {
  const ingredientQuery = useIngredients();
  const ingredientsData = ingredientQuery.data?.data.data;

  const getCountIngredientStatus = () => {
    if (!ingredientsData) return null;
    const lowAndCriticalCount = ingredientsData.reduce(
      (pre, item) => {
        if (item.status == "low") pre.low++;
        if (item.status == "critical") pre.critical++;
        return pre;
      },
      { low: 0, critical: 0 },
    );
    return {
      total: ingredientsData.length,
      ...lowAndCriticalCount,
    };
  };
  const countIngredientStatus = getCountIngredientStatus();
  const isLoading = ingredientQuery.isLoading;
  return (
    <div className="grid gap-6">
      {/* Stats Cards */}
      <InventoryStatsCards
        totalCount={countIngredientStatus?.total || 0}
        lowCount={countIngredientStatus?.low || 0}
        criticalCount={countIngredientStatus?.critical || 0}
        isLoading={isLoading}
      />

      {/* Data Table */}
      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="text-lg">Danh sách nguyên vật liệu</CardTitle>
          <CardDescription>
            Quản lí tất cả nguyên vật liệu trong hệ thống của bạn
          </CardDescription>
          <CardAction>
            <StockActions />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <DataTable columns={columns} data={ingredientsData || []} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

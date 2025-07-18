import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, TriangleAlert, CircleAlert } from "lucide-react";
import React from "react";

export default function StockStatsCards({
  totalCount,
  lowCount,
  criticalCount,
  isLoading,
}: {
  totalCount: number;
  lowCount: number;
  criticalCount: number;
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card className="rounded-md border-current/20 bg-blue-50 text-blue-600/80">
        <CardHeader>
          <CardTitle className="text-lg">Số lượng nguyên vật liệu</CardTitle>
          <CardAction>
            <Package size={32} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-semibold">{totalCount}</span>
        </CardContent>
      </Card>
      <Card className="rounded-md border-current/20 bg-yellow-50 text-yellow-600/80">
        <CardHeader>
          <CardTitle className="text-lg">Nguyên vật liệu sắp hết</CardTitle>
          <CardAction>
            <TriangleAlert size={32} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-semibold">{lowCount}</span>
        </CardContent>
      </Card>
      <Card className="rounded-md border-current/20 bg-red-50 text-red-600/80">
        <CardHeader>
          <CardTitle className="text-lg">
            Nguyên vật liệu sắp cạn kiệt
          </CardTitle>
          <CardAction>
            <CircleAlert size={32} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-semibold">{criticalCount}</span>
        </CardContent>
      </Card>
    </div>
  );
}

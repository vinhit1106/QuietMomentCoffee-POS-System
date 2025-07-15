"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "Thứ 2", revenue: 4256000 },
  { month: "Thứ 3", revenue: 3549400 },
  { month: "Thứ 4", revenue: 2987500 },
  { month: "Thứ 5", revenue: 2797000 },
  { month: "Thứ 6", revenue: 3656000 },
  { month: "Thứ 7", revenue: 4454800 },
  { month: "Chủ nhật", revenue: 5245000 },
];

const chartConfig = {
  revenue: {
    label: "Doanh thu",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Biểu đồ thống kê doanh thu</CardTitle>
        <CardDescription>Tuần này</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={3} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

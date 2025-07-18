import StatsCard, { StatsCardProps } from "@/components/Dashboard/StatsCard";
import {
  Blend,
  DollarSign,
  PiggyBank,
  ScrollText,
  TriangleAlert,
  Users,
} from "lucide-react";
import React from "react";

export default function StatsGrid() {
  const stats: StatsCardProps[] = [
    {
      title: "Doanh thu",
      value: "643.845 đ",
      description: "Tổng doanh thu trong ngày",
      change: "+5%",
      changeType: "increase",
      icon: PiggyBank,
      iconColor: "text-emerald-600 bg-emerald-500/20 border-emerald-500/50",
      titleColor: "text-emerald-600/60",
    },
    {
      title: "Số đơn hàng",
      value: "150",
      description: "Tổng số đơn hàng đã hoàn thành",
      change: "-10%",
      changeType: "decrease",
      icon: ScrollText,
      iconColor: "text-yellow-600 bg-yellow-500/20 border-yellow-500/50",
      titleColor: "text-yellow-600/60",
    },
    {
      title: "Khách hàng mới",
      value: "5",
      description: "Tổng số khách hàng đã đăng ký",
      icon: Users,
      iconColor: "text-indigo-500 bg-indigo-500/20 border-indigo-500/50",
      titleColor: "text-indigo-500/60",
    },
    {
      title: " Loyalty Points",
      value: "1.200",
      description: "Tổng số điểm khách hàng đã tích lũy",
      change: "+100",
      changeType: "increase",
      icon: Blend,
      iconColor: "text-slate-600 bg-slate-500/20 border-slate-500/50",
      titleColor: "text-slate-600/60",
    },
  ];
  return (
    <div className="border-border grid w-full grid-cols-4 gap-4 divide-x rounded-lg border p-4 shadow-sm">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

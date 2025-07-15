import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { is } from "date-fns/locale/is";

export interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  change?: string;
  changeType?: "increase" | "decrease";
  icon: LucideIcon;
  iconColor?: string; // Optional color for the icon
  titleColor?: string; // Optional color for the title
}

export default function StatsCard({
  title,
  value,
  description,
  change,
  changeType,
  icon,
  iconColor,
  titleColor,
}: StatsCardProps) {
  const IconItem = icon;
  const isIncrease = changeType === "increase";
  const isDecrease = changeType === "decrease";
  return (
    <div className="relative flex items-start p-4">
      {/* Icon */}
      <div
        className={cn(
          "border-border bg-muted text-muted-foreground mt-2 rounded-full border p-2",
          iconColor,
        )}
      >
        <IconItem />
      </div>
      {/* Content */}
      <div className="ml-4">
        <h3
          className={cn(
            "text-muted-foreground text-lg font-semibold",
            titleColor,
          )}
        >
          {title}
        </h3>
        <p className="text-2xl font-bold">{value}</p>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {/* Arrow */}

      {change && (
        <Badge
          className={cn(
            "absolute top-0 right-8 select-none",
            isIncrease
              ? "bg-green-600/10 text-green-500"
              : isDecrease
                ? "bg-red-600/10 text-red-500"
                : "",
          )}
        >
          {isIncrease ? <TrendingUp /> : isDecrease ? <TrendingDown /> : null}
          {change}
        </Badge>
      )}
    </div>
  );
}

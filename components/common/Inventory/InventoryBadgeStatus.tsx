import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import IngredientType from "@/types/Ingredient";
import { Check, CircleAlert, TriangleAlert } from "lucide-react";
import React from "react";

export default function BadgeStatus({
  status,
}: {
  status: IngredientType["status"];
}) {
  const isSafe = status == "safe";
  const isLow = status == "low";
  const isCritical = status == "critical";
  return (
    <Badge
      variant="secondary"
      className={cn(
        "select-none",
        isSafe
          ? "bg-green-100 text-green-600"
          : isLow
            ? "bg-amber-100 text-amber-600"
            : isCritical
              ? "bg-red-100 text-red-600"
              : "",
      )}
    >
      {isSafe ? (
        <>
          <Check />
          <span>Còn đủ</span>
        </>
      ) : isLow ? (
        <>
          <TriangleAlert />
          <span>Sắp hết</span>
        </>
      ) : isCritical ? (
        <>
          <CircleAlert />
          <span>Nguy kịch</span>
        </>
      ) : null}
    </Badge>
  );
}

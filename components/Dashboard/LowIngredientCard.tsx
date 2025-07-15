import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { CircleAlert, TriangleAlert } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const IngredientWarningItem = ({
  level,
}: {
  level: "warning" | "critical";
}) => {
  const isWarning = level == "warning";
  const isCritical = level == "critical";
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="aspect-square w-full max-w-16 overflow-hidden rounded-full">
          <Image
            src="https://lypham.vn/wp-content/uploads/2025/01/lam-topping-tran-chau-trang.jpg"
            width={0}
            height={0}
            sizes="100vw"
            alt="Topping Image"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-balance">
            Trân châu trắng
          </span>
          <div className="mt-1">
            <Progress
              className={cn(
                "max-w-16",
                isWarning
                  ? "bg-amber-100 [&_[data-slot='progress-indicator']]:bg-amber-500"
                  : isCritical
                    ? "bg-red-100 [&_[data-slot='progress-indicator']]:bg-red-500"
                    : "",
              )}
              value={50}
            />
          </div>
        </div>
      </div>
      <Badge
        variant="secondary"
        className={
          isWarning
            ? "bg-amber-100 text-amber-500"
            : isCritical
              ? "bg-red-100 text-red-500"
              : ""
        }
      >
        {isWarning ? (
          <>
            <TriangleAlert />
            <span>Low</span>
          </>
        ) : isCritical ? (
          <>
            <CircleAlert />
            <span>Critical</span>
          </>
        ) : null}
      </Badge>
    </div>
  );
};

export default function LowIngredientCard() {
  return (
    <Card className="gap-y-4 rounded-lg shadow-none">
      <CardHeader>
        <CardTitle>Cảnh báo nguyên vật liệu</CardTitle>
        <CardDescription>
          Nguyên vật liệu dưới ngưỡng đáng báo động
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 gap-y-2 pr-4">
            <IngredientWarningItem level="warning" />
            <IngredientWarningItem level="critical" />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

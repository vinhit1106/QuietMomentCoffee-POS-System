import React from "react";
import { cn } from "@/lib/utils";

export default function LayoutMenuProducts({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className, "grid grid-cols-5 gap-3")}>{children}</div>
  );
}

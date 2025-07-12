import React from "react";
import { cn } from "@/lib/utils";

export default function LayoutListOrder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className, "grid w-full grid-cols-5 gap-4")}>
      {children}
    </div>
  );
}

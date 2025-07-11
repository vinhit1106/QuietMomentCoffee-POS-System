"use client";

import { useId, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function OrderDatePickerFilter({
  dateFilter,
  setDateFilter,
}: {
  dateFilter: DateRange | undefined;
  setDateFilter: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
  const id = useId();
  const today = new Date();

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant="outline"
              className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <span
                className={cn(
                  "truncate",
                  !dateFilter && "text-muted-foreground",
                )}
              >
                {dateFilter?.from ? (
                  dateFilter.to ? (
                    <>
                      {format(dateFilter.from, "LLL dd, y")} -{" "}
                      {format(dateFilter.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateFilter.from, "LLL dd, y")
                  )
                ) : (
                  "Lọc theo thời gian"
                )}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <Calendar
              mode="range"
              selected={dateFilter}
              onSelect={setDateFilter}
            />
            <div className="ml-auto w-fit">
              <Button
                variant="outline"
                size="sm"
                className="mt-2 mb-1"
                onClick={() => {
                  setDateFilter({ from: today, to: today });
                }}
              >
                Today
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

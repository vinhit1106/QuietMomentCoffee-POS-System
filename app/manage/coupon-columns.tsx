"use client";

import CouponType from "@/types/Coupon";
import { ColumnDef } from "@tanstack/react-table";

export const coupon_columns: ColumnDef<CouponType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "usedCount",
    header: "Usage",
    cell: ({ row }) => {
      return <>{row.original.usedCount + "/" + row.original.usageLimit}</>;
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "discountPercent",
    header: "Discount",
  },
  {
    accessorKey: "usageLimit",
    header: "Limit",
  },
  {
    accessorKey: "maxDiscountPrice",
    header: "Max Discount",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
];

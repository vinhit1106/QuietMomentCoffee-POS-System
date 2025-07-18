"use client";

import IngredientAvatar from "@/components/common/Inventory/IngredientAvatar";
import BadgeStatus from "@/components/common/Inventory/InventoryBadgeStatus";
import { Badge } from "@/components/ui/badge";
import IngredientType from "@/types/Ingredient";
import { ColumnDef } from "@tanstack/react-table";
import MoreActionDropdown from "./MoreActionDropdown";
import { numberWithSeparator } from "@/utils";

export const columns: ColumnDef<IngredientType>[] = [
  {
    id: "stt",
    header: () => <div className="text-center">STT</div>,
    cell: ({ row, table }) => {
      const visibleRows = table.getRowModel().rows;
      const index = visibleRows.findIndex((r) => r.id === row.id);
      return <div className="text-center">{index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên nguyên liệu",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IngredientAvatar />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "currentStockFormat",
    header: "Số lượng hiện có",
  },
  {
    accessorKey: "unit",
    header: "Đơn vị tính",
    cell: ({ row }) => (
      <div className="flex h-full items-center">
        <Badge variant="outline">{row.original.unit}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "minThreshold",
    header: "Ngưỡng sắp hết",
    cell: ({ row }) => (
      <span className="text-amber-500">
        {row.original.minThreshold} {row.original.unit}
      </span>
    ),
  },
  {
    accessorKey: "criticalThreshold",
    header: "Ngưỡng nguy kịch",
    cell: ({ row }) => (
      <span className="text-red-500">
        {row.original.criticalThreshold} {row.original.unit}
      </span>
    ),
  },
  {
    accessorKey: "conversion.unit",
    header: "Đơn vị cơ sở",
    cell: ({ row }) => (
      <div className="flex h-full items-center">
        <Badge variant="outline">{row.original.conversion.unit}</Badge>
      </div>
    ),
  },
  {
    id: "conversionRate",
    accessorKey: "conversion.rate",
    header: () => <div className="text-center">Tỷ lệ chuyển đổi</div>,
    cell: ({ row }) => {
      const conversionRate = numberWithSeparator(row.original.conversion.rate);
      return (
        <span className="text-muted-foreground flex flex-col gap-1 text-center">
          <span className="text-blue-500">{conversionRate}</span>
          <span>
            1 {row.original.unit} = {conversionRate}{" "}
            {row.original.conversion.unit}
          </span>
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <BadgeStatus status={row.original.status} />,
    filterFn: (row, id, values: string[]) => {
      if (values?.length === 0) return true;
      const status = row.getValue(id) as string;
      return values.includes(status);
    },
  },
  {
    accessorKey: "notes",
    header: "Ghi chú",
    cell: ({ row }) => (
      <div className="text-muted-foreground max-w-[240px] truncate">
        {row.original.notes || "Không có"}
      </div>
    ),
    size: 240,
  },
  {
    id: "actions",
    cell: ({ row }) => <MoreActionDropdown ingredient={row.original} />,
    size: 60,
    enableHiding: false,
  },
];

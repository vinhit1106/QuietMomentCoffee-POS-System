"use client";
import { Button } from "@/components/ui/button";
import { PackageMinus, PackagePlus, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import UpsertIngredientModal from "./modal/UpsertIngredientModal";

export default function StockActions() {
  const [stockModalState, setStockModalState] = useState<{
    isOpen: boolean;
    mode?: "add-ingredient" | "stock-in" | "stock-out";
  }>({
    isOpen: false,
  });

  return (
    <>
      <div className="flex space-x-2">
        <Button
          className="cursor-pointer bg-green-700 hover:bg-green-700/90"
          onClick={() =>
            setStockModalState({ isOpen: true, mode: "add-ingredient" })
          }
        >
          <PlusCircle />
          <span>Thêm nguyên vật liệu</span>
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() => setStockModalState({ isOpen: true, mode: "stock-in" })}
        >
          <PackagePlus />
          <span>Nhập kho</span>
        </Button>
        <Button
          className="cursor-pointer"
          onClick={() =>
            setStockModalState({ isOpen: true, mode: "stock-out" })
          }
        >
          <PackageMinus />
          <span>Xuất kho</span>
        </Button>
      </div>
      {stockModalState.isOpen && stockModalState.mode == "add-ingredient" ? (
        <UpsertIngredientModal
          mode="insert"
          onClose={() => setStockModalState({ isOpen: false })}
        />
      ) : null}
    </>
  );
}

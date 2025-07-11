"use client";
import React, { useState } from "react";
import CheckOut from "./_components/Checkout";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductFilters from "./_components/ProductFilters";
import MenuProduct from "./_components/MenuProduct";

const NewOrderPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  return (
    <div className="">
      <div className="flex gap-1">
        <div className="w-full">
          <div className="mb-2">
            <ProductFilters
              onSearchChange={setSearchValue}
              onCategoryChange={setSelectedCategoryId}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-15rem)] flex-1 pr-3">
            <MenuProduct
              searchValue={searchValue}
              selectedCategoryId={selectedCategoryId}
            />
          </ScrollArea>
        </div>
        <div className="h-[calc(100vh-15rem)] justify-self-end">
          <CheckOut />
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;

import { useMenu } from "@/hooks/queries/useMenu";
import React from "react";
import EmptyMenuProduct from "./EmptyMenuProduct";
import ProductCard from "@/components/Orders/ProductCard";

export default function MenuProduct({
  searchValue,
  selectedCategoryId,
}: {
  searchValue?: string;
  selectedCategoryId?: string;
}) {
  const menuQuery = useMenu();
  const products = menuQuery.data?.data.data;

  const getFilteredProducts = () => {
    if (!products) return [];

    let filtered = products;

    // Filter by search value
    if (searchValue) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategoryId && selectedCategoryId !== "all") {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategoryId,
      );
    }

    return filtered;
  };
  const filteredProducts = getFilteredProducts();

  // Show empty state if no products found
  if (filteredProducts.length === 0) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <EmptyMenuProduct />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-3">
      {filteredProducts?.map((productItem) => (
        <ProductCard key={productItem._id} product={productItem} />
      ))}
    </div>
  );
}

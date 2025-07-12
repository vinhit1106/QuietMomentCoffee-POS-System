import { useMenu } from "@/hooks/queries/useMenu";
import React from "react";
import EmptyMenuProduct from "./EmptyMenuProduct";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/Orders/ProductCard";
import LayoutMenuProducts from "@/components/layout/grid/LayoutListOrder";

export default function MenuProduct({
  searchValue,
  selectedCategoryId,
}: {
  searchValue?: string;
  selectedCategoryId?: string;
}) {
  const menuQuery = useMenu();
  const isFetching = menuQuery.isFetching;
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
  if (filteredProducts.length === 0 && !isFetching) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <EmptyMenuProduct />
      </div>
    );
  }

  return (
    <LayoutMenuProducts>
      {isFetching
        ? Array.from({ length: 10 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        : filteredProducts?.map((productItem) => (
            <ProductCard key={productItem._id} product={productItem} />
          ))}
    </LayoutMenuProducts>
  );
}

"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ProductType from "@/types/Product";
import ModalProductOrder from "./ModalProductOrder";
import { numberWithSeparator } from "@/utils";
import { Badge } from "../ui/badge";

export const ProductCardSkeleton = () => {
  return (
    <div className="border-border flex w-full max-w-[280px] animate-pulse flex-col rounded-md border shadow">
      <div className="mx-auto mt-4 aspect-square w-full max-w-[180px]">
        <div className="size-full bg-gray-200" />
      </div>
      <div className="my-1 flex h-full flex-col p-4">
        <div className="mb-2 space-y-2">
          <span className="text-md block h-5 w-3/4 bg-gray-200" />
          <div className="flex justify-between">
            <span className="h-5 w-1/3 bg-gray-200 text-amber-600" />
            <Badge variant="secondary" className="h-5 w-1/3 bg-gray-200" />
          </div>
        </div>
        <Button
          variant="default"
          className="mt-auto w-full bg-gray-200"
          disabled
        ></Button>
      </div>
    </div>
  );
};
const ProductCard = ({ product }: { product: ProductType }) => {
  const [openOrderModal, setOpenOrderModal] = useState(false);

  return (
    <>
      <div className="border-border flex w-full max-w-[280px] flex-col rounded-md border shadow transition-all">
        <div className="mx-auto mt-4 aspect-square w-full max-w-[180px]">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={product.avatarUrl}
            className="size-full object-contain"
            alt=""
          />
        </div>

        <div className="my-1 flex h-full flex-col p-4">
          <div className="mb-2 space-y-2">
            <span className="text-md block font-bold">{product.name}</span>
            <div className="flex justify-between">
              <span className="text-amber-600">
                {numberWithSeparator(product.basePrice)}đ
              </span>
              <Badge variant="secondary">{product.category.name}</Badge>
            </div>
          </div>
          <Button
            variant="default"
            onClick={() => setOpenOrderModal(true)}
            className="mt-auto w-full cursor-pointer"
          >
            <span>
              <Plus />
            </span>
            <span>Order</span>
          </Button>
        </div>
      </div>
      {openOrderModal && (
        <ModalProductOrder product={product} onClose={setOpenOrderModal} />
      )}
    </>
  );
};

export default ProductCard;

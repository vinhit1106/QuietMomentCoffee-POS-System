"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ProductType from "@/types/Product";
import ModalProductOrder from "./ModalProductOrder";
import { numberWithSeparator } from "@/utils";
import { Badge } from "../ui/badge";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [openOrderModal, setOpenOrderModal] = useState(false);

  return (
    <>
      <div className="border-border flex w-full max-w-[280px] flex-col rounded-md border shadow transition-all">
        <div className="mx-auto w-full max-w-[180px]">
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

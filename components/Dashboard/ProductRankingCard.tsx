import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";

const ProductRankItem = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="w-full max-w-20 overflow-hidden rounded-sm">
          <Image
            src="https://product.hstatic.net/1000075078/product/1737355411_mochi-tra-sua_5950a2ce430440d5bbe33527b7e10021_large.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="Product Image"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-balance">
            Mochi Kem Trà Sữa Trân Châu
          </span>
          <span className="text-muted-foreground text-xs">23 Ordered</span>
        </div>
      </div>
      <span className="text-sm font-semibold text-nowrap">437.000 đ</span>
    </div>
  );
};

export default function ProductRankingCard() {
  return (
    <Card className="gap-y-4 rounded-lg">
      <CardHeader>
        <CardTitle>Top Sản Phẩm Bán Chạy</CardTitle>
        <CardDescription>Hôm nay</CardDescription>
      </CardHeader>
      <CardContent className="">
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 gap-2 pr-4">
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
            <ProductRankItem />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

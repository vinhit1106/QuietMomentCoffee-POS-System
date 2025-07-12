import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ProductType, { ISizeProduct, IToppingsProduct } from "@/types/Product";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { v4 as uuidv4 } from "uuid";
import { numberWithSeparator } from "@/utils";
import useNewOrderStore from "@/store/useNewOrderStore";

const ModalProductOrder = ({
  product,
  orderIdEdit,
  onClose,
}: {
  product: ProductType;
  orderIdEdit?: string;
  onClose: (open: boolean) => void;
}) => {
  const { orderItems, addOrderItem, updateOrderItem } = useNewOrderStore(
    (state) => state,
  );
  // Checking order is existing to modify
  const isEditOrder = !!orderIdEdit;
  let orderModify = null;
  if (isEditOrder) {
    orderModify = orderItems.find((p) => p._id === orderIdEdit);
  }
  if (isEditOrder && !orderModify) return;
  const [selectedSize, setSelectedSize] = useState<ISizeProduct | undefined>(
    isEditOrder ? orderModify?.selectedSize : undefined,
  );
  const [selectedToppings, setSelectedToppings] = useState<IToppingsProduct[]>(
    isEditOrder ? orderModify?.selectedToppings || [] : [],
  );
  const [note, setNote] = useState(isEditOrder ? orderModify?.notes || "" : "");

  const handleConfirmOrder = () => {
    if (isEditOrder) {
      updateOrderItem({
        _id: orderModify?._id,
        product,
        selectedSize: selectedSize,
        selectedToppings: selectedToppings,
        notes: note.trim(),
      });
    } else {
      addOrderItem({
        _id: uuidv4(),
        product,
        basePrice: product.basePrice,
        productId: product._id,
        productName: product.name,
        itemTotal: 0,
        quantity: 1,
        selectedSize: selectedSize,
        selectedToppings: selectedToppings,
        notes: note.trim(),
      });
    }

    onClose(false);
  };
  return (
    <Dialog defaultOpen={true} onOpenChange={onClose} modal>
      <DialogContent
        className="sm:max-w-5xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <Image
              width={360}
              height={360}
              src={product.avatarUrl}
              className="object-cover"
              alt=""
            />
          </div>
          <div className="">
            {/* Title */}
            <h1 className="text-xl font-bold">{product.name}</h1>
            <Separator className="my-4" />
            {/* Size */}
            {!!product.sizes?.length && (
              <>
                <div className="flex items-center space-x-2">
                  <span>Size: </span>
                  <div className="flex overflow-hidden rounded-sm">
                    {product.sizes?.map((sizeObj) => (
                      <button
                        key={sizeObj._id}
                        onClick={() => setSelectedSize(sizeObj)}
                        className={cn(
                          "flex aspect-square h-9 cursor-pointer items-center justify-center text-sm font-medium transition-colors select-none",
                          sizeObj._id === selectedSize?._id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted/90",
                        )}
                      >
                        <span>{sizeObj.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Separator className="my-4 w-full max-w-32" />
              </>
            )}
            {/* Topping */}
            {!!product.toppings?.length && (
              <>
                {" "}
                <div className="">
                  <h4 className="mb-2 text-lg font-medium">Toppings</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.toppings?.map((topping) => {
                      const isToppingSelected = selectedToppings.some(
                        (p) => p._id === topping._id,
                      );

                      return (
                        <li
                          key={topping._id}
                          className={cn(
                            "border-border hover:bg-muted/90 relative flex h-full cursor-pointer items-center border px-2 py-1 transition-colors",
                            isToppingSelected
                              ? "border-amber-600 after:absolute after:top-0 after:right-0 after:h-0 after:w-0 after:border-t-[15px] after:border-l-[15px] after:border-t-amber-500 after:border-l-transparent"
                              : "",
                          )}
                          onClick={() =>
                            setSelectedToppings((pre) =>
                              isToppingSelected
                                ? pre.filter((p) => p._id != topping._id)
                                : [...pre, topping],
                            )
                          }
                        >
                          <div className="flex flex-col text-sm">
                            <span>{topping.name}</span>
                            <small className="text-amber-700">
                              {numberWithSeparator(topping.price)}đ
                            </small>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Separator className="my-4 w-full max-w-32" />
              </>
            )}

            {/* Notes */}
            <div className="grid w-full gap-3">
              <Label htmlFor="note" className="w-fit">
                Note
              </Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type your note here."
                id="note"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer"
            onClick={() => handleConfirmOrder()}
          >
            {isEditOrder ? "Modify" : "Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalProductOrder;

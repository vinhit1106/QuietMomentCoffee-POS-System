import ModalProductOrder from "@/components/Orders/ModalProductOrder";
import QuantitySelector from "@/components/Orders/QuantitySelector";
import { Button } from "@/components/ui/button";
import useNewOrderStore from "@/store/useNewOrderStore";
import OrderItemType from "@/types/OrderItem";
import { numberWithSeparator } from "@/utils";
import { Box, SquarePen, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckoutModalContent from "./modal/CheckoutModalContent";

export default function CheckOut() {
  const [orderItemEdit, setOrderItemEdit] = useState<OrderItemType | null>(
    null,
  );

  const { orderItems, updateOrderItem, deleteOrderItem } = useNewOrderStore(
    useShallow((state) => ({
      orderItems: state.orderItems,
      updateOrderItem: state.updateOrderItem,
      deleteOrderItem: state.deleteOrderItem,
    })),
  );
  return (
    <>
      <div className="border-muted flex h-fit w-sm flex-col rounded-md border p-4 shadow">
        <h3 className="mb-2 text-2xl font-bold">New Order</h3>
        {/* Order Items */}
        <ScrollArea className="h-[calc(100vh-14rem-200px)] max-h-fit">
          <ul className="h-auto min-h-10 space-y-2 px-2">
            {orderItems.length ? (
              orderItems.map((order) => (
                <li
                  key={order._id}
                  className="rounded-sm border border-gray-200 px-4 py-2"
                >
                  <div className="flex items-start justify-between space-x-4">
                    <div className="">
                      <span className="block text-base">
                        {order.product.name}
                      </span>
                      <div className="flex h-5 items-center space-x-3 text-base text-gray-700">
                        <small>x{order.quantity}</small>
                        {order.selectedSize && (
                          <>
                            <Separator orientation="vertical" />
                            <small>Size {order.selectedSize.name}</small>
                          </>
                        )}
                        <Separator orientation="vertical" />
                        <small className="text-amber-600">
                          {numberWithSeparator(
                            order.selectedSize
                              ? order.selectedSize.price
                              : order.product.basePrice,
                          )}
                          ₫
                        </small>
                      </div>
                      {/* Topping */}
                      {!!order.selectedToppings?.length && (
                        <>
                          <Separator className="my-2" />
                          <span className="text-sm font-medium">Toppings:</span>
                          <ul className="list-inside list-disc pl-5 text-sm">
                            {order.selectedToppings?.map((toppingObj) => (
                              <li
                                key={toppingObj._id}
                                className="flex items-center"
                              >
                                <span className="text-gray-600">
                                  {toppingObj.name}
                                </span>
                                <small className="pl-2 text-amber-600">
                                  + {numberWithSeparator(toppingObj.price)} ₫
                                </small>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      {/* Note */}
                      {order.notes && (
                        <div className="mt-2 max-w-[240px] text-sm">
                          <span className="font-medium">Note: </span>
                          <span className="break-words text-gray-600">
                            {order.notes}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="nowrap mt-2 flex gap-x-2">
                      <button
                        onClick={() => setOrderItemEdit(order)}
                        className="mt-1 cursor-pointer hover:text-gray-400"
                      >
                        <SquarePen size={18} />
                      </button>
                      <button
                        onClick={() => deleteOrderItem(order._id)}
                        className="mt-1 cursor-pointer hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {/* Quantity Selector */}
                  <div className="mt-5">
                    <QuantitySelector
                      increaseFn={() =>
                        updateOrderItem({
                          ...order,
                          quantity: order.quantity + 1,
                        })
                      }
                      quantity={order.quantity}
                      setQuantity={(newQuantity) =>
                        updateOrderItem({ ...order, quantity: newQuantity })
                      }
                      decreaseFn={() =>
                        updateOrderItem({
                          ...order,
                          quantity: order.quantity - 1,
                        })
                      }
                    />
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center text-gray-600 select-none">
                <Box />
                <p className="mt-2 text-center text-sm italic">
                  No items available
                </p>
              </div>
            )}
          </ul>
        </ScrollArea>
        <Separator className="my-4" />
        {/* Checkout Order */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full cursor-pointer bg-amber-600 hover:bg-amber-900"
              size="lg"
            >
              Checkout Order
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-7xl">
            <DialogTitle>Checkout</DialogTitle>
            <CheckoutModalContent orderItems={orderItems} />
          </DialogContent>
        </Dialog>
      </div>

      {orderItemEdit && (
        <ModalProductOrder
          orderIdEdit={orderItemEdit._id}
          product={orderItemEdit.product}
          onClose={() => setOrderItemEdit(null)}
        />
      )}
    </>
  );
}

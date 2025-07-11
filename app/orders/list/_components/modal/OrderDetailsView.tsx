import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import OrderType from "@/types/Order";
import { numberWithSeparator } from "@/utils";
import React from "react";
import StatusBadge from "../StatusBadge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Printer, XIcon } from "lucide-react";

export default function OrderDetailsView({ order }: { order: OrderType }) {
  return (
    <>
      <DialogTitle>
        View Order <strong>#{order.code}</strong>
      </DialogTitle>
      <main className="mt-5">
        <div className="grid grid-cols-2 gap-x-3">
          <Card className="rounded-sm">
            <CardContent>
              <div className="">
                <div className="flex justify-between">
                  <CardTitle>Order Infomation</CardTitle>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <Separator className="my-5" />

              <div className="">
                <CardTitle>Customer Infomation</CardTitle>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent>
              <CardTitle>Order Items</CardTitle>
              <ScrollArea className="mt-2 h-[calc(100vh-15rem-200px)] max-h-fit">
                <ul className="h-auto space-y-2 pr-2">
                  {order.items.map((order) => (
                    <li
                      key={order._id}
                      className="border-input rounded-sm border px-4 py-2"
                    >
                      <div className="flex items-start justify-between space-x-4">
                        <div className="w-full">
                          <div className="flex items-start space-x-2 text-sm">
                            <span>{order.quantity}</span>
                            <span>x</span>
                            <div>
                              {order.product.name}
                              {order.selectedSize && (
                                <span className="text-nowrap">
                                  {` ( ${order.selectedSize.name} )`}
                                </span>
                              )}
                            </div>
                            <span className="ml-auto text-nowrap text-amber-600">
                              {numberWithSeparator(
                                order.selectedSize
                                  ? order.selectedSize.price
                                  : order.product.basePrice,
                              )}
                              ₫<span className="text-gray-600"> / 1</span>
                            </span>
                          </div>
                          {/* Topping */}
                          {!!order.selectedToppings?.length && (
                            <>
                              <Separator className="my-2" />
                              <span className="text-sm font-medium">
                                Toppings:
                              </span>
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
                                      + {numberWithSeparator(toppingObj.price)}{" "}
                                      ₫
                                    </small>
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                          {/* Note */}
                          {order.notes && (
                            <div className="mt-2 max-w-[320px] text-sm">
                              <span className="font-medium">Note: </span>
                              <span className="break-words text-gray-600">
                                {order.notes}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <Separator className="my-5" />
              <div className="mt-auto mb-4 ml-auto w-fit space-y-1">
                <div className="grid grid-cols-2 gap-x-5">
                  <span>Subtotal</span>
                  <span className="ml-auto">
                    {numberWithSeparator(order.subtotalPrice)} ₫
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 text-red-600">
                  <span>Discount</span>
                  <span className="ml-auto">
                    -{numberWithSeparator(order.discountPrice)} ₫
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 font-bold">
                  <span className="">Total</span>
                  <span className="ml-auto">
                    {numberWithSeparator(order.totalPrice)} ₫
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <DialogFooter>
        <Button variant="outline">
          <Printer />
          Print Bill
        </Button>
      </DialogFooter>
    </>
  );
}

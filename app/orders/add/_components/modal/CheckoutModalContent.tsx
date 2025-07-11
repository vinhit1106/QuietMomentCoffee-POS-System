import useNewOrderStore from "@/store/useNewOrderStore";
import OrderType from "@/types/Order";
import OrderItemType from "@/types/OrderItem";
import {
  calculateDiscountPrice,
  calculateSubTotalOrder,
  numberWithSeparator,
} from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ApplyCoupon from "../ApplyCoupon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BookA,
  BookCheck,
  CreditCard,
  HandCoins,
  Landmark,
  LoaderCircleIcon,
  QrCode,
  ReceiptText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrder } from "@/hooks/queries/useOrder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NumberInput } from "@/components/form/NumberInput";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import CouponType from "@/types/Coupon";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CheckoutModalContent({
  orderItems,
}: {
  orderItems: OrderItemType[];
}) {
  const [coupon, setCoupon] = useState<CouponType | undefined>(undefined);
  const [subTotal, setSubTotal] = useState(() =>
    calculateSubTotalOrder(orderItems),
  );
  const [discountPrice, setDiscountPrice] = useState(
    coupon ? calculateDiscountPrice(subTotal, coupon) : 0,
  );
  const [totalPrice, setTotalPrice] = useState(subTotal - discountPrice);
  const [cashReceived, setCashReceived] = useState(totalPrice);

  const [paymentMethod, setPaymentMethod] =
    useState<OrderType["paymentMethod"]>("cash");
  const [orderNotes, setOrderNotes] = useState("");
  const createOrderMutation = useCreateOrder();
  useEffect(() => {
    if (paymentMethod !== "cash") setCashReceived(totalPrice);
  }, [paymentMethod]);
  useEffect(() => {
    const newSubTotal = calculateSubTotalOrder(orderItems);
    const newDiscountPrice = coupon
      ? calculateDiscountPrice(newSubTotal, coupon)
      : 0;

    if (newSubTotal !== subTotal) {
      setSubTotal(newSubTotal);
    }
    if (newDiscountPrice !== discountPrice) {
      setDiscountPrice(newDiscountPrice);
    }

    setTotalPrice(newSubTotal - newDiscountPrice);
  }, [orderItems, coupon]);

  const handleCreateNewOrder = () => {
    if (!orderItems.length) return;
    createOrderMutation.mutate({
      items: orderItems,
      paymentMethod: paymentMethod,
      couponCode: coupon?.code,
      notes: orderNotes,
    });
  };

  const cashGiveBackCustomer = cashReceived - totalPrice;
  return (
    <div className="grid min-h-[calc(100vh-12rem)] grid-cols-3 divide-x">
      {/* Order Info, Coupon */}
      <div className="pr-4">
        <h2 className="mb-2 text-base font-medium">Order Details</h2>
        {/* List Order Item */}
        <div className="mb-4">
          <ScrollArea className="h-[calc(100vh-12rem-200px)] max-h-fit">
            <ul className="h-auto min-h-10 space-y-2 px-2">
              {orderItems.map((order) => (
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
                              {" "}
                              {`( ${order.selectedSize.name} )`}
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
        </div>
        <div className="mb-5">
          <ApplyCoupon
            subTotalOrder={subTotal}
            coupon={coupon}
            setCoupon={setCoupon}
          />
        </div>

        {/* Pricing */}
        <div className="mt-auto mb-4 space-y-1 rounded-sm bg-gray-50 px-4 py-2 font-normal">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">
              {numberWithSeparator(subTotal)} ₫
            </span>
          </div>
          <div className="flex justify-between text-red-600">
            <span>Discount</span>
            <span className="font-medium">
              -{numberWithSeparator(discountPrice)} ₫
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span className="">Total</span>
            <span>{numberWithSeparator(subTotal - discountPrice)} ₫</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 px-4">
        <h2 className="mb-2 text-base font-medium">Payment Details</h2>
        {/* Customer */}
        <div className="*:not-first:mt-2">
          <Label>Customer</Label>
          <div className="flex gap-2">
            <Input
              className="bg-muted flex-1"
              defaultValue="Khách lẻ"
              type="text"
              readOnly
            />
            <Button variant="outline">
              <BookCheck size={16} />
            </Button>
          </div>
        </div>
        {/* Payment method */}
        <div className="">
          <Label className="mb-2 w-fit">Phương thức thanh toán</Label>
          <RadioGroup
            className="grid-cols-3 select-none"
            defaultValue="cash"
            onValueChange={(value) =>
              setPaymentMethod(value as OrderType["paymentMethod"])
            }
          >
            <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
              <RadioGroupItem
                id="payment_method--cash"
                value="cash"
                className="sr-only"
              />
              <HandCoins className="opacity-60" size={20} aria-hidden="true" />
              <label
                htmlFor="payment_method--cash"
                className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
              >
                Tiền mặt
              </label>
            </div>
            <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
              <RadioGroupItem
                id="payment_method--bank_transfer"
                value="bank_transfer"
                className="sr-only"
              />
              <QrCode className="opacity-60" size={20} aria-hidden="true" />
              <label
                htmlFor="payment_method--bank_transfer"
                className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
              >
                Chuyển khoản
              </label>
            </div>
            <div className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
              <RadioGroupItem
                id="payment_method--card"
                value="card"
                className="sr-only"
              />
              <CreditCard className="opacity-60" size={20} aria-hidden="true" />
              <label
                htmlFor="payment_method--card"
                className="text-foreground cursor-pointer text-sm leading-none font-medium after:absolute after:inset-0"
              >
                Thẻ
              </label>
            </div>
          </RadioGroup>
        </div>
        {/* Input to give back the change */}
        <div className="*:not-first:mt-2">
          <Label>Khách trả (VNĐ)</Label>
          <div className="flex gap-2">
            <NumberInput
              className={cn(
                "w-full rounded-sm",
                paymentMethod !== "cash" && "bg-muted",
              )}
              value={cashReceived}
              onChange={(e) =>
                setCashReceived(+e.target.value?.replaceAll(",", ""))
              }
              thousandSeparator=","
              disableChevron
              readOnly={paymentMethod !== "cash"}
            />
            {paymentMethod === "cash" && (
              <Button
                variant="outline"
                onClick={() =>
                  setCashReceived(Math.ceil(totalPrice / 1000) * 1000)
                }
              >
                Vừa đủ
              </Button>
            )}
          </div>
          {paymentMethod === "cash" && (
            <Badge
              variant="secondary"
              className="flex w-full justify-between bg-indigo-100 p-2 text-base"
            >
              <span>Tiền thừa:</span>
              <strong>
                {numberWithSeparator(
                  cashGiveBackCustomer > 0 ? cashGiveBackCustomer : 0,
                )}{" "}
                ₫
              </strong>
            </Badge>
          )}
        </div>
        <Separator className="my-4" />
        {/* Order Notes */}
        <div className="mb-4">
          <Label htmlFor="note" className="mb-2 w-fit">
            Note
          </Label>
          <Textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Type your note here."
            id="order-note"
          />
        </div>
        {/* Submit */}
        <DialogFooter className="mt-auto">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleCreateNewOrder}
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? (
              <>
                <LoaderCircleIcon
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />

                <span>Creating</span>
              </>
            ) : (
              <>
                <ReceiptText size={16} aria-hidden="true" />
                <span>Create Order</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
      <div className="pl-4"></div>
    </div>
  );
}

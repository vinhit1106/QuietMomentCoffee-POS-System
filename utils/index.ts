import CouponType from "@/types/Coupon";
import OrderItemType from "@/types/OrderItem";

export function numberWithSeparator(x: number, separator: string = ".") {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export const calculateDiscountPrice = (
  subtotal: number,
  coupon: CouponType,
): number => {
  let discount_price = subtotal * (coupon.discountPercent / 100);
  if (coupon.maxDiscountPrice && discount_price > coupon.maxDiscountPrice)
    discount_price = coupon.maxDiscountPrice;
  return discount_price;
};

export const calculateSubTotalOrder = (
  order_items: OrderItemType[],
): number => {
  return order_items.reduce((totalPriceOrder, item) => {
    const toppingPrice = item.selectedToppings?.reduce(
      (totalPriceTopping, toppingObj) => totalPriceTopping + toppingObj.price,
      0,
    );
    let product_price = item.product.basePrice;
    if (item.selectedSize) product_price = item.selectedSize.price;
    return (
      totalPriceOrder + (product_price + (toppingPrice || 0)) * item.quantity
    );
  }, 0);
};

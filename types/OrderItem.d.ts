import ProductType, { ISizeProduct, IToppingsProduct } from "./Product";

export default interface OrderItemType {
  _id: string;
  product: ProductType;
  productName: string;
  productId: string;
  selectedSize?: ISizeProduct;
  selectedToppings?: IToppingsProduct[];
  basePrice: number;
  quantity: number;
  itemTotal: number;
  notes?: string;
}

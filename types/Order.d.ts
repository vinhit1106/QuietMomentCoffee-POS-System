import OrderItemType from "./OrderItem";

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";
export default interface OrderType {
  _id: string;
  code: string;
  items: OrderItemType[];
  notes: string;
  subtotalPrice: number;
  discountPrice: number;
  totalPrice: number;
  paymentMethod: "cash" | "bank_transfer" | "card";
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  status: OrderStatus;
}

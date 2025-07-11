import OrderItemType from "@/types/OrderItem";
import { create } from "zustand";

interface NewOrderStoreType {
  // Order items
  orderItems: OrderItemType[];
  addOrderItem: (item: OrderItemType) => void;
  updateOrderItem: (item: Partial<OrderItemType>) => void;
  deleteOrderItem: (item_id: string) => void;
}

const useNewOrderStore = create<NewOrderStoreType>((set, get) => ({
  orderItems: [],
  addOrderItem: (item) => {
    set((state) => {
      // update quantity for order if existed same
      const existedOrder = state.orderItems.find(
        (currentOrder) =>
          currentOrder.product._id === item.product._id &&
          JSON.stringify(currentOrder.selectedToppings) ===
            JSON.stringify(item.selectedToppings) &&
          currentOrder.selectedSize === item.selectedSize,
      );
      if (existedOrder) {
        const orderQuantityUpdated = {
          ...existedOrder,
          quantity: existedOrder.quantity + 1,
        };
        const otherOrder = state.orderItems.filter(
          (o) => o._id !== existedOrder._id,
        );
        return {
          orderItems: [...otherOrder, orderQuantityUpdated],
        };
      }

      // add new
      return {
        orderItems: [...state.orderItems, item],
      };
    });
  },
  updateOrderItem: (item) => {
    if (item.quantity && item.quantity <= 0) return;
    set((state) => ({
      orderItems: state.orderItems.map((o) =>
        o._id != item._id ? o : { ...o, ...item },
      ),
    }));
  },
  deleteOrderItem: (item_id) =>
    set((state) => ({
      orderItems: state.orderItems.filter((o) => o._id !== item_id),
    })),
}));

export default useNewOrderStore;

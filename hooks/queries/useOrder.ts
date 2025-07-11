import {
  createOrderSerivce,
  deleteOrderService,
  getOrdersSerivce,
  updateOrderStatusSerivce,
} from "@/services/api/orderService";
import { OrderStatus } from "@/types/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders", "list"],
    queryFn: getOrdersSerivce,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ["orders", "create"],
    mutationFn: createOrderSerivce,
  });
};
export const useDeleteOrder = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["orders", "delete", orderId],
    mutationFn: () => deleteOrderService(orderId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrderStatus = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["orders", "updateStatus", orderId],
    mutationFn: (status: OrderStatus) =>
      updateOrderStatusSerivce(orderId, status),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

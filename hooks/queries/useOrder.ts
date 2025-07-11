import {
  createOrderSerivce,
  deleteOrderService,
  getOrdersSerivce,
  updateOrderStatusSerivce,
} from "@/services/api/orderService";
import { OrderStatus } from "@/types/Order";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useOrders = (params?: {
  status?: string;
  from?: string;
  to?: string;
}) => {
  return useQuery({
    queryKey: ["orders", "list", params],
    queryFn: () => getOrdersSerivce(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
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

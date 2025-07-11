import ApiRoutes from "@/constant/ApiRoutes.constant";
import axiosInstance from "@/services/api/config/axiosInstance";
import IBaseApiReponse from "@/types/BaseApiReponse";
import OrderType, { OrderStatus } from "@/types/Order";

interface IGetOrderResponse extends IBaseApiReponse {
  orders: OrderType[];
  limit?: number;
  currentPage?: number;
  totalPages?: number;
}

interface ICreateOrderResponse extends IBaseApiReponse {
  data: OrderType;
}

interface IDeleteOrderResponse extends IBaseApiReponse {
  data: boolean;
}

interface IUpdateOrderStatusReponse extends IBaseApiReponse {
  data: OrderType;
}

export const getOrdersSerivce = (params?: {
  status?: string;
  from?: string;
  to?: string;
}) => {
  return axiosInstance.get<IGetOrderResponse>(ApiRoutes.ORDER.GET_LIST, {
    params,
  });
};

export const createOrderSerivce = (
  data: Pick<OrderType, "items" | "notes" | "paymentMethod"> & {
    couponCode?: string;
  },
) => {
  return axiosInstance.post<ICreateOrderResponse>(ApiRoutes.ORDER.CREATE, data);
};

export const deleteOrderService = (orderId: string) => {
  return axiosInstance.delete<IDeleteOrderResponse>(
    ApiRoutes.ORDER.DELETE(orderId),
  );
};

export const updateOrderStatusSerivce = (
  orderId: string,
  status: OrderStatus,
) => {
  return axiosInstance.patch<IUpdateOrderStatusReponse>(
    ApiRoutes.ORDER.UPDATE_STATUS(orderId),
    {
      status,
    },
  );
};

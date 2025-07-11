const ApiRoutes = {
  GET_MENU: "/product",
  ORDER: {
    GET_LIST: "/order",
    CREATE: "/order/", // POST method
    GET_DETAIL: (orderId: string) => `/order/${orderId}`,
    UPDATE_STATUS: (orderId: string) => `/order/${orderId}/status`,
    DELETE: (orderId: string) => `/order/${orderId}`,
  },
  GET_COUPONS: "/coupon",
  CHECK_COUPON: "/coupon/check",
  CREATE_COUPON: "/coupon/create",
  CATEGORY: {
    GET_LIST: "/category",
  },
};

export default ApiRoutes;

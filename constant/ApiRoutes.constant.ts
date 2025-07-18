const ApiRoutes = {
  PRODUCT: {
    GET_LIST: "product",
  },
  ORDER: {
    GET_LIST: "/order",
    CREATE: "/order/", // POST method
    GET_DETAIL: (orderId: string) => `/order/${orderId}`,
    UPDATE_STATUS: (orderId: string) => `/order/${orderId}/status`,
    DELETE: (orderId: string) => `/order/${orderId}`,
  },
  COUPON: {
    GET_LIST: "/coupon",
    CREATE: "/coupon", // POST method
    CHECKING: "/coupon/check",
  },
  CATEGORY: {
    GET_LIST: "/category",
  },
  INGREDIENT: {
    GET_LIST: "/ingredient",
    CREATE: "/ingredient", // POST method
    UPDATE: (id: string) => `/ingredient/${id}`, // PATCH method
    DELETE: (id: string) => `/ingredient/${id}`, // DELETE method
  },
};

export default ApiRoutes;

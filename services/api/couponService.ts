import ApiRoutes from "@/constant/ApiRoutes.constant";
import axiosInstance from "@/services/api/config/axiosInstance";
import IBaseApiReponse from "@/types/BaseApiReponse";
import CouponType from "@/types/Coupon";

interface IGetCouponResponse extends IBaseApiReponse {
  data: CouponType[];
}

interface ICreateCouponResponse extends IBaseApiReponse {
  data: CouponType;
}

interface ICheckCouponResponse extends IBaseApiReponse {
  data: {
    coupon: CouponType;
    paid_price: number;
    discount_price: number;
  };
}

export const getCouponsSerivce = () => {
  return axiosInstance.get<IGetCouponResponse>(ApiRoutes.GET_COUPONS);
};

export const createCouponSerivce = (data: Partial<CouponType>) => {
  return axiosInstance.post<ICreateCouponResponse>(
    ApiRoutes.CREATE_COUPON,
    data,
  );
};

export const checkCouponService = (data: {
  coupon_code: string;
  price: number;
}) => {
  return axiosInstance.post<ICheckCouponResponse>(ApiRoutes.CHECK_COUPON, data);
};

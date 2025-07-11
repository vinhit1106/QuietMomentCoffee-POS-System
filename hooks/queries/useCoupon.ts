import {
  checkCouponService,
  createCouponSerivce,
  getCouponsSerivce,
} from "@/services/api/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupon", "list"],
    queryFn: getCouponsSerivce,
  });
};

export const useCreateCoupon = () => {
  return useMutation({
    mutationKey: ["coupon", "create"],
    mutationFn: createCouponSerivce,
  });
};

export const useCheckCoupon = () => {
  return useMutation({
    mutationKey: ["coupon", "check"],
    mutationFn: checkCouponService,
  });
};

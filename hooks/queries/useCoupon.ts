import {
  checkCouponService,
  createCouponService,
  getCouponsService,
} from "@/services/api/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons", "list"],
    queryFn: getCouponsService,
  });
};

export const useCreateCoupon = () => {
  return useMutation({
    mutationKey: ["coupons", "create"],
    mutationFn: createCouponService,
  });
};

export const useCheckCoupon = () => {
  return useMutation({
    mutationKey: ["coupons", "check"],
    mutationFn: checkCouponService,
  });
};

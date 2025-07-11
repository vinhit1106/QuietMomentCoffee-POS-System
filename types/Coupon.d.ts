export default interface CouponType {
  name: string;
  code: string;
  discountPercent: number;
  maxDiscountPrice: number;
  usageLimit: number;
  usedCount: number;
  startDate: number | Date | string;
  endDate: number | Date | string;
}

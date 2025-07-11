import React from "react";
import { DataTable } from "./coupon-data-table";
import { coupon_columns } from "./coupon-columns";
import CouponType from "@/types/Coupon";

const coupon_data: CouponType[] = [
  {
    name: "Mừng khai trương",
    code: "MUNGKHAITRUONG",
    discountPercent: 10,
    usageLimit: 20,
    usedCount: 0,
    maxDiscountPrice: 100000,
    startDate: new Date().toLocaleTimeString(),
    endDate: Date.now().toLocaleString(),
  },
];
const ManagePage = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-medium">Coupon</h2>
      <DataTable columns={coupon_columns} data={coupon_data} />
    </div>
  );
};

export default ManagePage;

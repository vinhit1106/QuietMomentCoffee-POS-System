"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderCard from "./_components/OrderCard";
import OrderDatePickerFilter from "./_components/OrderDatePickerFilter";
import { useEffect, useState } from "react";
import OrderType from "@/types/Order";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import OrderDetailsView from "./_components/modal/OrderDetailsView";
import OrderEditForm from "./_components/modal/OrderEditForm";
import { OrderStatusBadge } from "@/constant/OrderStatus.constant";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useOrders } from "@/hooks/queries/useOrder";

export default function OrdersListPage() {
  const [modalOrderState, setOrderModalState] = useState<{
    isOpen: boolean;
    selected_order?: OrderType;
    mode?: "view" | "edit";
  }>({ isOpen: false });

  const [dateFilter, setDateFilter] = useState<DateRange>();
  const ordersQuery = useOrders();
  const orders = ordersQuery.data?.data.data || [];
  const getFilteredOrders = (status: string) => {
    return orders.filter((order) => {
      if (status !== "all" && order.status !== status) return false;
      if (!dateFilter?.from) return true;

      // Filter By Date Range
      const orderCreatedDate = new Date(order.createdAt);
      if (isNaN(orderCreatedDate.getTime())) {
        return false;
      }
      // Reset time to compare only dates
      const orderDate = new Date(
        orderCreatedDate.getFullYear(),
        orderCreatedDate.getMonth(),
        orderCreatedDate.getDate(),
      );
      const fromDate = new Date(
        dateFilter.from.getFullYear(),
        dateFilter.from.getMonth(),
        dateFilter.from.getDate(),
      );

      // If no 'to' date, filter for single day
      if (!dateFilter.to) {
        return orderDate.getTime() === fromDate.getTime();
      }

      // Filter by date range
      const toDate = new Date(
        dateFilter.to.getFullYear(),
        dateFilter.to.getMonth(),
        dateFilter.to.getDate(),
      );
      return orderDate >= fromDate && orderDate <= toDate;
    });
  };
  const statusTabs = ["all", ...OrderStatusBadge.map((item) => item.status)];

  return (
    <div>
      <Tabs defaultValue="all" className="items-start">
        <div className="mb-2 flex w-full items-center justify-between">
          <TabsList>
            {statusTabs.map((sTab) => (
              <TabsTrigger
                key={"tab-" + sTab}
                value={sTab}
                className="px-5 capitalize"
              >
                {sTab}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex space-x-1">
            {dateFilter && (
              <Button
                variant="link"
                className="cursor-pointer bg-transparent"
                onClick={() => setDateFilter(undefined)}
              >
                <XIcon />
              </Button>
            )}
            <OrderDatePickerFilter
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>
        </div>
        {statusTabs.map((sTab) => (
          <TabsContent
            value={sTab}
            className="w-full"
            key={"statusTab-" + sTab}
          >
            <div className="grid w-full grid-cols-5 gap-4">
              {getFilteredOrders(sTab).map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onViewDetails={() =>
                    setOrderModalState({
                      isOpen: true,
                      selected_order: order,
                      mode: "view",
                    })
                  }
                  onEditOrder={() =>
                    setOrderModalState({
                      isOpen: true,
                      selected_order: order,
                      mode: "edit",
                    })
                  }
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog
        open={modalOrderState.isOpen}
        onOpenChange={(open) => setOrderModalState({ isOpen: open })}
      >
        <DialogContent
          className={modalOrderState.mode === "view" ? "min-w-5xl" : ""}
        >
          {modalOrderState.isOpen &&
            (modalOrderState.mode === "view" ? (
              <OrderDetailsView order={modalOrderState.selected_order!} />
            ) : (
              <OrderEditForm
                order={modalOrderState.selected_order!}
                onCloseModal={() => setOrderModalState({ isOpen: false })}
              />
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}

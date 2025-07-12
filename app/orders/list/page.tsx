"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OrderCard, { OrderCardSkeleton } from "./_components/OrderCard";
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
import { useRouter, useSearchParams } from "next/navigation";
import AppRoutes from "@/constant/AppRoutes.constant";
import LayoutListOrder from "@/components/layout/grid/LayoutListOrder";

export default function OrdersListPage() {
  const [modalOrderState, setOrderModalState] = useState<{
    isOpen: boolean;
    selected_order?: OrderType;
    mode?: "view" | "edit";
  }>({ isOpen: false });
  const params = useSearchParams();
  const router = useRouter();
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>(
    params.get("status") || "all",
  );
  const [dateFilter, setDateFilter] = useState<DateRange>({
    from: (params.get("from") && new Date(params.get("from")!)) || undefined,
    to: (params.get("to") && new Date(params.get("to")!)) || undefined,
  });
  const ordersQuery = useOrders({
    status: selectedStatusTab !== "all" ? selectedStatusTab : undefined,
    from: dateFilter?.from ? dateFilter.from.toISOString() : undefined,
    to: dateFilter?.to ? dateFilter.to.toISOString() : undefined,
  });
  const isFetchingOrders = ordersQuery.isFetching || ordersQuery.isRefetching;
  const orders = ordersQuery.data?.data.data.orders || [];

  useEffect(() => {
    const status = selectedStatusTab !== "all" ? selectedStatusTab : undefined;
    const from = dateFilter?.from ? dateFilter.from.toISOString() : undefined;
    const to = dateFilter?.to ? dateFilter.to.toISOString() : undefined;

    const queryParams: Record<string, string> = {};
    if (status) queryParams.status = status;
    if (from) queryParams.from = from;
    if (to) queryParams.to = to;

    const searchParams = new URLSearchParams(queryParams).toString();
    router.replace(AppRoutes.ORDER.LIST + "?" + searchParams);
  }, [selectedStatusTab, dateFilter]);

  const statusTabs = ["all", ...OrderStatusBadge.map((item) => item.status)];
  return (
    <div>
      <Tabs
        defaultValue="all"
        className="items-start"
        value={selectedStatusTab}
        onValueChange={(value) => {
          setSelectedStatusTab(value);
        }}
      >
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
            {(dateFilter?.from || dateFilter?.to) && (
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
            <LayoutListOrder>
              {isFetchingOrders
                ? Array.from({ length: 10 }, (_, i) => (
                    <OrderCardSkeleton key={`order-skeleton-${i}`} />
                  ))
                : orders.map((order) => (
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
            </LayoutListOrder>
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

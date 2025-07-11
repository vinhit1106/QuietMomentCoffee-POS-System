import { Button } from "@/components/ui/button";
import { DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderStatusBadge } from "@/constant/OrderStatus.constant";
import { useDeleteOrder, useUpdateOrderStatus } from "@/hooks/queries/useOrder";
import { cn } from "@/lib/utils";
import OrderType, { OrderStatus } from "@/types/Order";
import { TrashIcon } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";

export default function OrderEditForm({
  order,
  onCloseModal,
}: {
  order: OrderType;
  onCloseModal: () => void;
}) {
  const id = useId();
  const [statusSelected, setStatusSelected] = useState<OrderStatus>(
    order.status,
  );
  const [recentStatusUpdated, setRecentStatusUpdated] = useState<OrderStatus>(
    order.status,
  );
  const updateOrderStatus = useUpdateOrderStatus(order._id);
  const deleteOrderMutation = useDeleteOrder(order._id);
  const isLoading =
    updateOrderStatus.isPending || deleteOrderMutation.isPending;

  const handleUpdateStatus = () => {
    console.log(statusSelected);
    if (
      isLoading ||
      !statusSelected ||
      statusSelected === recentStatusUpdated
    ) {
      toast("Không có bất kì thay đổi!");
      return;
    }
    updateOrderStatus.mutate(statusSelected, {
      onSettled(data, error) {
        if (error || !data?.data.data) {
          toast.error(`Cập nhật trạng thái đơn #${order.code} thất bại!`);
          return;
        }
        setRecentStatusUpdated(data.data.data.status);
        toast.success(`Cập nhật trạng thái đơn #${order.code} thành công!`);
      },
    });
  };
  const handleDeleteOrder = () => {
    if (isLoading) {
      return;
    }
    if (!confirm("Confirm delete this order?")) {
      return;
    }
    deleteOrderMutation.mutate(undefined, {
      onSettled(data, error) {
        if (error || !data?.data.data) {
          toast.error(`Xóa đơn #${order.code} thất bại!`);
          return;
        }
        onCloseModal();
        toast.success(`Xóa đơn #${order.code} thành công!`);
      },
    });
  };
  return (
    <>
      <DialogTitle>
        Edit Order <strong>#{order.code}</strong>
      </DialogTitle>
      <main className="my-5">
        <div className="*:not-first:mt-2">
          <Label htmlFor={id}>Change Status</Label>

          <RadioGroup
            className="grid-cols-5"
            value={statusSelected}
            onValueChange={(value: OrderStatus) => setStatusSelected(value)}
          >
            {OrderStatusBadge.map((item) => (
              <div
                key={`${id}-${item.status}`}
                className={cn(
                  "border-input bg-muted has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col items-center gap-3 rounded-sm border px-2 py-3 text-center shadow-xs transition-all outline-none has-focus-visible:ring-[3px] has-data-[state=checked]:border-current/50",
                  statusSelected === item.status &&
                    `${item.colorClassName.background} ${item.colorClassName.text} `,
                )}
              >
                <RadioGroupItem
                  id={`${id}-${item.status}`}
                  value={item.status}
                  className="sr-only"
                />
                <item.icon
                  className="opacity-60"
                  size={20}
                  aria-hidden="true"
                />
                <label
                  htmlFor={`${id}-${item.status}`}
                  className="cursor-pointer text-xs leading-none font-medium after:absolute after:inset-0"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </main>
      <DialogFooter>
        <Button
          variant="destructive"
          className="mr-auto cursor-pointer"
          onClick={handleDeleteOrder}
          disabled={isLoading}
        >
          <TrashIcon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Delete Order
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          type="submit"
          className="cursor-pointer"
          onClick={handleUpdateStatus}
          disabled={isLoading}
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  );
}

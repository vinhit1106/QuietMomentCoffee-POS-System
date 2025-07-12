import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import OrderType from "@/types/Order";
import { numberWithSeparator } from "@/utils";
import { format } from "date-fns";
import { Calendar, Eye, GlassWater, SquarePen } from "lucide-react";
import StatusBadge from "./StatusBadge";

export function OrderCardSkeleton() {
  return (
    <Card className="animate-pulse rounded-sm shadow">
      <CardHeader>
        <CardTitle className="h-5 w-1/2 rounded-sm bg-gray-200" />
        <CardDescription className="h-4 w-1/3 rounded-sm bg-gray-200" />
        <CardAction>
          <Badge className="h-5 w-20 bg-gray-200" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <Separator className="mb-2" />
        <div className="flex h-[76px] flex-nowrap justify-between text-sm">
          <div className="w-[68px] rounded-sm bg-gray-200"></div>
          <div className="w-[100px] rounded-sm bg-gray-200"></div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-nowrap items-center justify-between">
          <strong className="h-6 w-1/4 rounded-sm bg-gray-200" />
          <strong className="h-6 w-1/3 rounded-sm bg-gray-200" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-2">
          <div className="h-9 w-[132px] rounded-md bg-gray-200" />
          <div className="h-9 w-[74px] rounded-md bg-gray-200" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default function OrderCard({
  order,
  onViewDetails,
  onEditOrder,
}: {
  order: OrderType;
  onViewDetails: () => void;
  onEditOrder: () => void;
}) {
  return (
    <Card className="rounded-sm shadow">
      <CardHeader>
        <CardTitle>Order</CardTitle>
        <CardDescription>#{order.code}</CardDescription>
        <CardAction>
          <StatusBadge status={order.status} />
        </CardAction>
      </CardHeader>

      <CardContent>
        <Separator className="mb-2" />
        <div className="flex flex-nowrap justify-between text-sm">
          <div>
            <span
              className="flex w-fit flex-col items-center justify-center px-4 py-2"
              aria-hidden="true"
            >
              <GlassWater size={20} className="opacity-60" />
              <p className="text-center">
                <strong>{order.items.length}</strong>
                <br />
                <span>Items</span>
              </p>
            </span>
          </div>
          <div>
            <span
              className="flex w-fit flex-col items-center justify-center px-4 py-2"
              aria-hidden="true"
            >
              <Calendar size={20} className="opacity-60" />
              <p className="text-center">
                <strong>{format(order.createdAt, "hh:mm aa")}</strong>
                <br />
                <span>{format(order.createdAt, "dd/MM/yyyy")}</span>
              </p>
            </span>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-nowrap items-center justify-between">
          <strong className="">Total</strong>
          <strong className="text-cyan-800">
            {numberWithSeparator(order.totalPrice)}đ
          </strong>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full gap-x-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onViewDetails}
          >
            <Eye />
            View Details
          </Button>
          <Button className="mb-2 cursor-pointer" onClick={onEditOrder}>
            <SquarePen />
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

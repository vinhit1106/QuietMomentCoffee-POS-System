import { OrderStatus } from "@/types/Order";
import {
  Clock,
  CheckCircle,
  XCircle,
  LucideIcon,
  LoaderCircle,
  Coffee,
} from "lucide-react";

export const OrderStatusBadge: Array<{
  status: OrderStatus;
  label: string;
  colorClassName: {
    background: string;
    text: string;
  };
  icon: LucideIcon;
}> = [
  {
    status: "pending",
    label: "Pending",
    colorClassName: {
      background: "bg-yellow-100",
      text: "text-yellow-800",
    },
    icon: Clock,
  },
  {
    status: "preparing",
    label: "Preparing",
    colorClassName: {
      background: "bg-indigo-100",
      text: "text-indigo-800",
    },
    icon: LoaderCircle,
  },
  {
    status: "ready",
    label: "Ready for Pickup",
    colorClassName: {
      background: "bg-fuchsia-100",
      text: "text-fuchsia-800",
    },
    icon: Coffee,
  },
  {
    status: "completed",
    label: "Completed",
    colorClassName: {
      background: "bg-green-100",
      text: "text-green-800",
    },
    icon: CheckCircle,
  },
  {
    status: "cancelled",
    label: "Cancelled",
    colorClassName: {
      background: "bg-red-100",
      text: "text-red-800",
    },
    icon: XCircle,
  },
];

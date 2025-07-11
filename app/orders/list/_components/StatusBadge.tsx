import { Badge } from "@/components/ui/badge";
import { OrderStatusBadge } from "@/constant/OrderStatus.constant";
import { OrderStatus } from "@/types/Order";

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const config = OrderStatusBadge.find((item) => item.status === status);
  if (!config) return null;
  const IconComponent = config?.icon;

  return (
    <Badge
      variant="secondary"
      className={`${config.colorClassName.background} ${config.colorClassName.text}`}
    >
      <IconComponent />
      <span className="capitalize">{config.label}</span>
    </Badge>
  );
}

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckCoupon } from "@/hooks/queries/useCoupon";
import { cn } from "@/lib/utils";
import useNewOrderStore from "@/store/useNewOrderStore";
import { useShallow } from "zustand/react/shallow";
import {
  CheckCircle2Icon,
  CircleX,
  CircleXIcon,
  EyeIcon,
  LoaderCircleIcon,
  TicketPercent,
} from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/error-handler";
import { numberWithSeparator } from "@/utils";
import CouponType from "@/types/Coupon";

export default function ApplyCoupon({
  subTotalOrder,
  coupon,
  setCoupon,
}: {
  subTotalOrder: number;
  coupon: CouponType | undefined;
  setCoupon: Dispatch<SetStateAction<CouponType | undefined>>;
}) {
  const [promoCode, setPromoCode] = useState("");

  const checkCouponMutation = useCheckCoupon();

  const handleCheckCoupon = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promoCode || !subTotalOrder) return;
    checkCouponMutation.mutate(
      {
        coupon_code: promoCode,
        price: subTotalOrder,
      },
      {
        onSuccess(data) {
          if (data.data.success) {
            setCoupon(data.data.data.coupon);
          }
        },
      },
    );
  };
  const handleCleanCoupon = () => {
    setPromoCode("");
    setCoupon(undefined);
    checkCouponMutation.reset();
  };
  const isFetching = checkCouponMutation.isPending;
  const isSuccessCoupon = checkCouponMutation.data?.data.success;
  return (
    <div>
      <form
        onSubmit={handleCheckCoupon}
        className="mb-2 flex w-full items-center"
      >
        <div className="flex w-full rounded-md shadow-xs">
          <Input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            type="text"
            className={cn(
              "focus-visible:z-10-me-px -me-px flex-1 rounded-e-none shadow-none focus-visible:z-10",
              isSuccessCoupon && "bg-muted",
            )}
            placeholder="Enter Promocode"
            disabled={isFetching || isSuccessCoupon}
          />
          {isSuccessCoupon ? (
            <Button
              onClick={handleCleanCoupon}
              type="button"
              variant="outline"
              className="rounded-l-none"
            >
              <CircleXIcon size={16} aria-hidden="true" />
            </Button>
          ) : (
            <button
              disabled={isFetching}
              className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center space-x-2 rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isFetching ? (
                <>
                  <LoaderCircleIcon
                    className="-ms-1 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Waitting...</span>
                </>
              ) : (
                <>
                  <TicketPercent />
                  <span>Apply</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
      {isSuccessCoupon ? (
        <Alert variant="success" className="rounded-sm border-current/50">
          <AlertDescription>
            <div className="grid grid-cols-[calc(var(--spacing)*4)_1fr] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current">
              <CheckCircle2Icon />
              <div className="ml-2">
                <p className="text-sm font-medium">
                  Coupon applied successfully!
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="text-foreground w-full gap-1"
                  variant="ghost"
                >
                  <EyeIcon size={18} aria-hidden="true" /> View Coupon
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coupon Details? 🎉</DialogTitle>
                  <pre className="overflow-auto rounded-lg bg-gray-100 p-4 font-mono text-sm leading-relaxed">
                    {JSON.stringify(coupon, null, 4)}
                  </pre>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Okay</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </AlertDescription>
        </Alert>
      ) : (
        checkCouponMutation.isError && (
          <Alert variant="destructive" className="rounded-sm border-current/50">
            <AlertDescription>
              <div className="grid grid-cols-[calc(var(--spacing)*4)_1fr] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current">
                <CircleX />
                <div className="ml-2">
                  <h4>Fail to apply coupon!</h4>
                  <p>{getErrorMessage(checkCouponMutation.error)}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )
      )}
    </div>
  );
}

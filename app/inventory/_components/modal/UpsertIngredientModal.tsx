import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calculator,
  LoaderCircleIcon,
  Package,
  TriangleAlert,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUpsertIngredient } from "@/hooks/queries/useIngredient";
import IngredientType from "@/types/Ingredient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/error-handler";

const formSchema = z
  .object({
    name: z.string().nonempty({ message: "Tên không được bỏ trống!" }).trim(),
    unit: z
      .string()
      .nonempty({ message: "Đơn vị nhập kho không được bỏ trống!" })
      .trim()
      .toLowerCase(),
    conversion: z.object({
      unit: z.string().trim().toLowerCase(),
      rate: z.coerce.number().min(1, {
        message: "Hệ số quy đổi phải lớn hơn hoặc bằng 1",
      }),
      currentStock: z.coerce.number().min(0),
    }),
    minThreshold: z.coerce.number().min(0),
    criticalThreshold: z.coerce.number().min(0),
    notes: z.string().trim().optional(),
  })
  .refine(
    (data) => {
      if (data.minThreshold > 0 || data.criticalThreshold > 0) {
        return data.criticalThreshold < data.minThreshold;
      }
      return data.criticalThreshold >= data.minThreshold;
    },
    {
      message: "Phải nhỏ hơn số lượng cảnh báo sắp hết",
      path: ["criticalThreshold"],
    },
  );

export default function UpsertIngredientModal({
  mode,
  ingredientProp,
  onClose,
}: {
  mode: "update" | "insert";
  ingredientProp?: IngredientType;
  onClose: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ingredientProp?.name || "",
      unit: ingredientProp?.unit || "kg",
      conversion: ingredientProp?.conversion || {
        unit: "gram",
        currentStock: 0, // for input by 'unit' field, this will be transformed to the correct unit before submission
        rate: 1,
      },
      minThreshold: ingredientProp?.minThreshold || 0,
      criticalThreshold: ingredientProp?.criticalThreshold || 0,
      notes: ingredientProp?.notes || "",
    },
  });
  const [conversionType, setConversionType] = useState<
    "byUnit" | "byConversion"
  >(mode === "insert" ? "byUnit" : "byConversion");

  const unit = useWatch({
    control: form.control,
    name: "unit",
  });

  const upsertIngredientMutation = useUpsertIngredient(mode);
  const isLoading = upsertIngredientMutation.isPending;

  const quickSetThreshold = (
    field: "minThreshold" | "criticalThreshold",
    percent: number,
  ) => {
    let currentStock = form.watch("conversion.currentStock");
    if (conversionType === "byConversion") {
      currentStock = currentStock / form.watch("conversion.rate");
    }
    const newThreshold = Math.floor((currentStock * percent) / 100);
    form.setValue(field, newThreshold);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (conversionType === "byUnit") {
      // Convert current stock to the conversion unit
      const conversionRate = values.conversion.rate;
      values.conversion.currentStock =
        values.conversion.currentStock * conversionRate;
    }

    upsertIngredientMutation.mutate(
      {
        _id: ingredientProp?._id, // include _id for update mode
        ...values,
      },
      {
        onSettled(data, error) {
          if (error || !data?.data.success) {
            toast.error(error ? getErrorMessage(error) : data?.data.message);
            return;
          }
          toast.success(
            mode === "insert"
              ? "Thêm nguyên vật liệu thành công!"
              : "Cập nhật nguyên vật liệu thành công!",
          );
          onClose();
        },
      },
    );
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="min-w-4xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Thêm nguyên vật liệu mới</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên nguyên vật liệu
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <FormControl>
                        <Input
                          placeholder="Nhập tên nguyên vật liệu"
                          className="peer ps-9 [direction:inherit]"
                          {...field}
                        />
                      </FormControl>
                    </FormControl>
                    <div className="text-muted-foreground/90 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <Package size={16} aria-hidden="true" />
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-8">
              <div>
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Đơn vị nhập kho
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập đơn vị nhập kho" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="conversion.unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Đơn vị cơ sở<span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập đơn vị cơ sở" {...field} />
                      </FormControl>
                      <FormDescription>
                        (Đơn vị gốc để tính toán định mức)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="conversion.rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Hệ số quy đổi<span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            className="peer ps-9 [direction:inherit]"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <div className="text-muted-foreground/90 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                          <Calculator size={16} aria-hidden="true" />
                        </div>
                      </div>
                      <FormDescription>
                        {unit &&
                          `1 (${unit}) = ${form.watch().conversion?.rate} ${form.watch().conversion?.unit}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-8">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="conversion.currentStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Số lượng hiện tại
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="flex items-center gap-x-2">
                        <Select
                          value={conversionType}
                          onValueChange={(value) => {
                            setConversionType(
                              value as "byUnit" | "byConversion",
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select conversion type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="byUnit">
                              Theo đơn vị nhập kho ({unit || "Chưa nhập"})
                            </SelectItem>
                            <SelectItem value="byConversion">
                              Theo đơn vị cơ sở (
                              {form.watch().conversion?.unit || "Chưa nhập"})
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input
                            placeholder="Nhập số lượng hiện có"
                            className="peer [direction:inherit]"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-8">
              <div>
                <FormField
                  control={form.control}
                  name="minThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng cảnh báo Sắp hết</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="peer ps-9 [direction:inherit]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-amber-600 peer-disabled:opacity-50">
                            <TriangleAlert size={16} aria-hidden="true" />
                          </div>
                        </div>
                        {[30, 20, 15].map((percent) => (
                          <Button
                            key={`minThreshold-${percent}`}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() =>
                              quickSetThreshold("minThreshold", percent)
                            }
                          >
                            {percent}%
                          </Button>
                        ))}
                      </div>
                      <FormDescription className="text-pretty">
                        Ngưỡng cảnh báo khi số lượng tồn kho thấp{" "}
                        {unit && `(${unit})`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="criticalThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng cảnh báo Nguy cấp</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="peer ps-9 [direction:inherit]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-red-600 peer-disabled:opacity-50">
                            <AlertCircle size={16} aria-hidden="true" />
                          </div>
                        </div>

                        {[10, 5, 3].map((percent) => (
                          <Button
                            key={`critical-${percent}`}
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() =>
                              quickSetThreshold("criticalThreshold", percent)
                            }
                          >
                            {percent}%
                          </Button>
                        ))}
                      </div>

                      <FormDescription className="text-pretty">
                        Ngưỡng cảnh báo khi số lượng tồn kho nguy cấp{" "}
                        {unit && `(${unit})`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập ghi chú cho nguyên vật liệu (nếu có)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircleIcon
                    className="-animate-spin"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

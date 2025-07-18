import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import IngredientType from "@/types/Ingredient";
import { numberWithSeparator } from "@/utils";
import { format } from "date-fns";
import { Calculator, CircleAlert, TriangleAlert } from "lucide-react";
import React from "react";

export default function ViewIngredientModal({
  ingredientProp,
  onClose,
}: {
  ingredientProp: IngredientType;
  onClose: () => void;
}) {
  const conversionRateFormat = numberWithSeparator(
    ingredientProp.conversion.rate,
  );
  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="min-w-3xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Xem chi tiết nguyên vật liệu</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        <Card>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label className="text-sm text-gray-600">
                  Tên nguyên vật liệu
                </Label>
                <p className="mt-1 text-base font-medium">
                  {ingredientProp.name}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Số lượng hiện tại
                </Label>
                <p className="mt-1 text-base font-medium">
                  {ingredientProp.currentStockFormat}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Đơn vị tính</Label>
                <p className="mt-1 text-base font-medium">
                  {ingredientProp.unit}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Đơn vị cơ sở</Label>
                <p className="mt-1 text-base font-medium">
                  {ingredientProp.conversion.unit}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Thời gian tạo</Label>
                <p className="mt-1 text-base font-medium">
                  {format(ingredientProp.createdAt, "hh:mm dd/MM/yyyy")}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Lần thay đổi gần nhất
                </Label>
                <p className="mt-1 text-base font-medium">
                  {format(ingredientProp.updatedAt, "hh:mm dd/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6">
              <div>
                <Label className="text-sm text-gray-600">
                  Tỉ lệ chuyển đổi
                </Label>
                <div className="mt-1 text-base font-medium">
                  <div className="flex items-center gap-2 text-blue-500">
                    <Calculator size={18} />
                    <span>{conversionRateFormat}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {conversionRateFormat} {ingredientProp.conversion.unit} = 1{" "}
                    {ingredientProp.unit}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Mức cảnh báo Sắp hết
                </Label>
                <div className="mt-1 text-base font-medium">
                  <div className="flex items-center gap-2 text-amber-500">
                    <TriangleAlert size={18} />
                    <span>
                      {ingredientProp.minThreshold} {ingredientProp.unit}
                    </span>
                  </div>
                  {ingredientProp.minThreshold > 0 && (
                    <p className="text-muted-foreground">
                      ={" "}
                      {numberWithSeparator(
                        ingredientProp.minThreshold *
                          ingredientProp.conversion.rate,
                      )}{" "}
                      {ingredientProp.conversion.unit}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">
                  Mức cảnh báo Nguy kịch
                </Label>
                <div className="mt-1 text-base font-medium">
                  <div className="flex items-center gap-2 text-red-500">
                    <CircleAlert size={18} />
                    <span>
                      {ingredientProp.criticalThreshold} {ingredientProp.unit}
                    </span>
                  </div>
                  {ingredientProp.criticalThreshold > 0 && (
                    <p className="text-muted-foreground">
                      ={" "}
                      {numberWithSeparator(
                        ingredientProp.criticalThreshold *
                          ingredientProp.conversion.rate,
                      )}{" "}
                      {ingredientProp.conversion.unit}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {ingredientProp.notes && (
              <div className="mt-6">
                <Label className="text-sm text-gray-600">Ghi chú</Label>
                <p className="mt-1 text-base font-medium">
                  {ingredientProp.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

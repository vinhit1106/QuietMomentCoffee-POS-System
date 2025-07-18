import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IngredientType from "@/types/Ingredient";
import { Eye, MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import UpsertIngredientModal from "../_components/modal/UpsertIngredientModal";
import { useDeleteIngredient } from "@/hooks/queries/useIngredient";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/error-handler";
import ViewIngredientModal from "../_components/modal/ViewIngredientModal";

export default function MoreActionDropdown({
  ingredient,
}: {
  ingredient: IngredientType;
}) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const deleteIngredientMutation = useDeleteIngredient();

  const handleDeleteIngredient = () => {
    if (!confirm(`Xác nhận xóa ${ingredient.name} ?`)) return;
    deleteIngredientMutation.mutate(ingredient._id, {
      onSettled(data, error) {
        if (error) {
          toast.error(getErrorMessage(error));
          return;
        }
        if (data?.data.success) {
          toast.success(`Đã xóa nguyên vật liệu ${ingredient.name}`);
        }
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenViewModal(true)}>
            <Eye />
            <span>Xem chi tiết</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEditModal(true)}>
            <SquarePen />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDeleteIngredient}
          >
            <Trash2 />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {openEditModal && (
        <UpsertIngredientModal
          ingredientProp={ingredient}
          mode="update"
          onClose={() => setOpenEditModal(false)}
        />
      )}
      {openViewModal && (
        <ViewIngredientModal
          ingredientProp={ingredient}
          onClose={() => setOpenViewModal(false)}
        />
      )}
    </>
  );
}

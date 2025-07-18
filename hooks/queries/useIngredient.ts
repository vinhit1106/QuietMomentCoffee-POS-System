import {
  createIngredientService,
  deleteIngredientService,
  getIngredientsService,
  updateIngredientService,
} from "@/services/api/ingredientService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients", "list"],
    queryFn: getIngredientsService,
  });
};

export const useUpsertIngredient = (mode: "update" | "insert") => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationKey: ["ingredients", "create"],
    mutationFn: createIngredientService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["ingredients", "update"],
    mutationFn: updateIngredientService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });

  return mode === "insert" ? createMutation : updateMutation;
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["ingredients", "delete"],
    mutationFn: deleteIngredientService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
};

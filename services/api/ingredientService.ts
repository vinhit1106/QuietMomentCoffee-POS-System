import ApiRoutes from "@/constant/ApiRoutes.constant";
import axiosInstance from "@/services/api/config/axiosInstance";
import IBaseApiReponse from "@/types/BaseApiReponse";
import IngredientType from "@/types/Ingredient";

interface IGetIngredientResponse extends IBaseApiReponse {
  data: IngredientType[];
}

interface IUpsertIngredientResponse extends IBaseApiReponse {
  data: IngredientType;
} // for update and insert new Ingredient

interface IDeleteIngredientResponse extends IBaseApiReponse {
  data: boolean;
}

export const getIngredientsService = () => {
  return axiosInstance.get<IGetIngredientResponse>(
    ApiRoutes.INGREDIENT.GET_LIST,
  );
};

export const createIngredientService = (data: Partial<IngredientType>) => {
  return axiosInstance.post<IUpsertIngredientResponse>(
    ApiRoutes.INGREDIENT.CREATE,
    data,
  );
};

export const updateIngredientService = (data: Partial<IngredientType>) => {
  const { _id, ...others } = data;
  if (!_id) throw new Error("Ingredient Id is empty!");
  return axiosInstance.patch<IUpsertIngredientResponse>(
    ApiRoutes.INGREDIENT.UPDATE(_id),
    others,
  );
};
export const deleteIngredientService = (ingredientId: string) => {
  return axiosInstance.delete<IDeleteIngredientResponse>(
    ApiRoutes.INGREDIENT.DELETE(ingredientId),
  );
};

import ApiRoutes from "@/constant/ApiRoutes.constant";
import axiosInstance from "@/services/api/config/axiosInstance";
import IBaseApiReponse from "@/types/BaseApiReponse";
import CategoryType from "@/types/Category";

interface IGetCategoryResponse extends IBaseApiReponse {
  data: CategoryType[];
}

export const getCategoryService = async () => {
  return axiosInstance.get<IGetCategoryResponse>(ApiRoutes.CATEGORY.GET_LIST);
};

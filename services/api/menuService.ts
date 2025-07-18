import ApiRoutes from "@/constant/ApiRoutes.constant";
import axiosInstance from "@/services/api/config/axiosInstance";
import IBaseApiReponse from "@/types/BaseApiReponse";
import ProductType from "@/types/Product";

interface IGetMenuResponse extends IBaseApiReponse {
  data: ProductType[];
}

export const getMenuService = () => {
  return axiosInstance.get<IGetMenuResponse>(ApiRoutes.PRODUCT.GET_LIST);
};

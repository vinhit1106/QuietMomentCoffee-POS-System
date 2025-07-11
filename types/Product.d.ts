import CategoryType from "./Category";

export interface ISizeProduct {
  name: string;
  price: number;
  _id: string;
}
export interface IToppingsProduct {
  name: string;
  price: number;
  _id: string;
}

type ProductType = {
  _id: string;
  name: string;
  category: CategoryType;
  avatarUrl: string;
  basePrice: number;
  sizes?: ISizeProduct[];
  toppings?: IToppingsProduct[];
  isAvailable: boolean;
};

export default ProductType;

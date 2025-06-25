export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  productImg: string;
  price: number;
  model: string;
  rating?: number;
  description: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  stock: boolean;
};

export type TCartItem = {
  _id: string;
  product: TProduct;
  productId: TProduct;
  quantity: number;
  user: string;
  price: number;
  savedForLater?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type TSaveItems = {
  _id: string;
  product: TProduct;
  productId: TProduct;
  quantity: number;
  user: string;
  price: number;
  savedForLater?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TProduct = {
  _id: string;
  name: string;
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
};


export type TCartItem = {
  _id: string; 
  product: TProduct;
  quantity: number;
  user: string;
  createdAt?: string;
  updatedAt?: string;
};
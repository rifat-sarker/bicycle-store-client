export type TAllUser = {
  phone: string;
  address: string;
  city: string;
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  id: string;
  name: string;
  email: string;
  needsPasswordChange: boolean;
  role: "admin" | "customer";
  createdAt: string;
  updatedAt: string;
};


export type TUser = {
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  status?: string;
  _id?: string;
};
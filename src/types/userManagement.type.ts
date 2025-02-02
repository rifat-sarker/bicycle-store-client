export type TUser = {
  phone: string;
  address: string;
  city: string;
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  _id: string;
  name: string;
  email: string;
  needsPasswordChange: boolean;
  role: "admin" | "customer";
  createdAt: string;
  updatedAt: string;
};

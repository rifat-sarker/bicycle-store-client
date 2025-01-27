import { ReactNode } from "react";

export type TNavbarItem = {
  key: string;
  label: ReactNode;
  children?: TNavbarItem[];

};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];

};

export type TRoute = {
  path: string;
  element: ReactNode;
};

import { NavLink } from "react-router-dom";
import { TNavbarItem, TUserPath } from "../types/navbar.type";

export const navbarItemsGenerator = (items: TUserPath[]) => {
  const navbarItems = items.reduce((acc: TNavbarItem[], item) => {
    if (item.path && item.name) {
      // Handle the "/" route separately for the Home link
      const linkTo = item.path === "/" ? "/" : `/${item.path}`;

      acc.push({
        key: item.name,
        label: <NavLink to={linkTo}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          const linkTo = child.path === "/" ? "/" : `/${child.path}`;
          return {
            key: child.name,
            label: <NavLink to={linkTo}>{child.name}</NavLink>,
          };
        }),
      });
    }
    return acc;
  }, []);
  return navbarItems;
};

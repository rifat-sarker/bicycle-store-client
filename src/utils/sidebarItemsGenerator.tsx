import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.type";

export const sidebarItemsGenerator = (items: TUserPath[], role:string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon || null,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        icon: item.icon || null,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
          icon: child.icon || null,
        })),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};

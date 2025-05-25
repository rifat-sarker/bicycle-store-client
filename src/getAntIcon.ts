import * as Icons from "@ant-design/icons";
import { FC } from "react";

// Type guard for Ant Design icons (which are React.forwardRef components)
const isAntdIconComponent = (component: unknown): component is FC<any> => {
  return typeof component === "function" || typeof component === "object";
};

export const getAntIcon = (iconName: string): FC<any> | null => {
  const icon = (Icons as Record<string, unknown>)[iconName];

  if (isAntdIconComponent(icon)) {
    return icon as FC<any>;
  }

  console.warn(`Icon "${iconName}" not found or is not a valid component.`);
  return null;
};

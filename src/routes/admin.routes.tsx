import AdminDashboard from "../pages/admin/AdminDashboard";
import OrderDashboard from "../pages/order/OrderDashboard";
import CreateProdcut from "../pages/product/CreateProduct";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    name: "Products",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <CreateProdcut />,
      },
    ],
  },
  {
    name: "Orders",
    path: "orders",
    element: <OrderDashboard />,
    icon: <OrderedListOutlined />,
  },
];

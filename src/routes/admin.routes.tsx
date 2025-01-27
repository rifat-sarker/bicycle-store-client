import AdminDashboard from "../pages/admin/AdminDashboard";
import OrderDashboard from "../pages/order/OrderDashboard";
import ProductDashboard from "../pages/product/ProductDashboard";
import { DashboardOutlined, ShoppingCartOutlined, OrderedListOutlined } from "@ant-design/icons";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <DashboardOutlined />, 
  },
  {
    name: "Products",
    path: "products",
    element: <ProductDashboard />,
    icon: <ShoppingCartOutlined />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <OrderDashboard />,
    icon: <OrderedListOutlined />, 
  },
];
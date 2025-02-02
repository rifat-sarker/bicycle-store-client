import AdminDashboard from "../pages/admin/AdminDashboard";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
  UnorderedListOutlined
   
} from "@ant-design/icons";
import ProductsManagement from "../pages/admin/ProductsManagement";
import OrdersManagement from "../pages/admin/OrdersManagement";
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
        name: "Products Managements",
        path: "products",
        element: <ProductsManagement />,
        icon: <AppstoreOutlined />,
      },
    ],
  },
  {
    name: "Orders",
    icon: <OrderedListOutlined />,
    children: [
      {
        name: "Orders Managements",
        path: "orders",
        element: <OrdersManagement />,
        icon: <UnorderedListOutlined />
      },
    ],
  },
];

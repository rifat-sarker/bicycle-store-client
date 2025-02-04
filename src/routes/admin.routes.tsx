import AdminDashboard from "../pages/admin/AdminDashboard";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import ProductsManagement from "../pages/admin/ProductsManagement";
import OrdersManagement from "../pages/admin/OrdersManagement";
import UsersManagements from "../pages/admin/UsersManagements";
import AdminProfile from "../pages/admin/AdminProfile";
export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    name: "My Profile",
    path: "profile",
    element: <AdminProfile />,
    icon: <UserOutlined />,
  },
  {
    name: "Users",
    icon: <TeamOutlined />,
    children: [
      {
        name: "Users Managements",
        path: "users",
        element: <UsersManagements />,
        icon: <UserAddOutlined />,
      },
    ],
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
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

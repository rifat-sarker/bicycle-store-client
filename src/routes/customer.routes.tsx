import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerOrder from "../pages/customer/CustomerOrder";
import {
  UserOutlined,
  DashboardOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import CustomerProfile from "../pages/customer/CustomerProfile";

export const customerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <CustomerDashboard />,
    icon: <DashboardOutlined />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <CustomerProfile />,
    icon: <UserOutlined />,
  },
  {
    name: "My Orders",
    path: "my-order",
    element: <CustomerOrder />,
    icon: <OrderedListOutlined />,
  },
];

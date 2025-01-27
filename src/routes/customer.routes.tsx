import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerOrder from "../pages/customer/CustomerOrder";

export const customerPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <CustomerDashboard />,
  },
  {
    name: "My Orders",
    path: "my-order",
    element: <CustomerOrder />,
  },
];

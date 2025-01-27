import AdminDashboard from "../pages/admin/AdminDashboard";
import OrderDashboard from "../pages/order/OrderDashboard";
import ProductDashboard from "../pages/product/ProductDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  {
    name: "Products",
    path: "products",
    element: <ProductDashboard />,
  },
  {
    name: "Orders",
    path: "orders",
    element: <OrderDashboard />,
  },
];

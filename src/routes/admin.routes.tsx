import AdminDashboard from "../pages/admin/AdminDashboard";
import OrderDashboard from "../pages/order/OrderDashboard";
import CreateProdcut from "../pages/product/CreateProduct";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import UpdateProduct from "../pages/product/UpdateProduct";
import ProductsManagement from "../pages/product/ProductsManagement";

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
      {
        name: "Update Product",
        path: "update-product",
        element: <UpdateProduct />,
      },
      {
        name: "Products Managements",
        path: "product",
        element: <ProductsManagement />,
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

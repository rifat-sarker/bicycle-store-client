import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import { homePaths } from "./home.routes";
import SidebarLayout from "../components/layout/SidebarLayout";
import ProductDetails from "../pages/product/ProductDetails";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import VerificationOrder from "../pages/order/VerificationOrder";
import MainLayout from "../components/layout/MainLayout";
import BlogDetails from "../pages/blog/BlogDetails";
import CategoryProducts from "../pages/product/CategoryProducts";
import CartPage from "../pages/cart/cartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Apply Navbar once at the root
    children: [
      ...routesGenerator(homePaths),
      { path: "products/:id", element: <ProductDetails /> },
      { path: "blogs/:id", element: <BlogDetails /> },
      { path: "/products/category/:slug", element: <CategoryProducts /> },
      {
        path: "cart/",
        element: (
          <ProtectedRoute role="customer">
            <CartPage />
          </ProtectedRoute>
        ),
      },
      { path: "orders/verify", element: <VerificationOrder /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: (
      <ProtectedRoute role="customer">
        <SidebarLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(customerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // {
  //   path: "/product/:id",
  //   element: <ProductDetails />,
  // },
  // {
  //   path: "/product/checkout/:id",
  //   element: <CheckoutPage />,
  // },
  // {
  //   path: "/orders/verify",
  //   element: <VerificationOrder />,
  // },
]);

export default router;

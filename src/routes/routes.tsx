import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { customerPaths } from "./customer.routes";
import { homePaths } from "./home.routes";
import SidebarLayout from "../components/layout/SidebarLayout";
import ProductDetails from "../pages/product/ProductDetails";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(homePaths),
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
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
]);

export default router;

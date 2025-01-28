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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(homePaths),
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
  {
    path: "/admin",
    element: <SidebarLayout />,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/customer",
    element: <SidebarLayout />,
    children: routesGenerator(customerPaths),
  },
]);

export default router;

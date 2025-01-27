import About from "../pages/About";
import HomePage from "../pages/home/HomePage";
import MyCart from "../pages/MyCart";
import AllProduct from "../pages/product/AllProduct";

export const homePaths = [
  {
    name: "Home",
    path: "home",
    element: <HomePage />,
  },
  {
    name: "All Product",
    path: "all-product",
    element: <AllProduct />,
  },
  {
    name: "About",
    path: "about",
    element: <About />,
  },
  {
    name: "My cart",
    path: "my-cart",
    element: <MyCart />,
  },
];

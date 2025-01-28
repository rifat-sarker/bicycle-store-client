import About from "../pages/About";
import Contact from "../pages/Contact";
import HomePage from "../pages/home/HomePage";
import AllProduct from "../pages/product/AllProduct";
import ProductDetails from "../pages/product/ProductDetails";

export const homePaths = [
  {
    name: "Home",
    path: "/",
    element: <HomePage />,
  },
  {
    name: "All Product",
    path: "all-product",
    element: <AllProduct />,
  },
  {
    name: "All Product",
    path: "all-product/:id",
    element: <ProductDetails />,
  },
  {
    name: "About",
    path: "about",
    element: <About />,
  },
  {
    name: "Contact",
    path: "contact",
    element: <Contact />,
  },
];

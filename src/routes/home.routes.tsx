import About from "../pages/About";
import Contact from "../pages/Contact";
import HomePage from "../pages/home/HomePage";
import AllProduct from "../pages/product/AllProduct";

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

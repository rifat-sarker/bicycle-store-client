import About from "../pages/About";
import AllBlog from "../pages/blog/AllBlog";
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
    path: "products",
    element: <AllProduct />,
  },
  {
    name: "Blog",
    path: "blogs",
    element: <AllBlog />,
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

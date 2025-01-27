import AdminDashboard from "../pages/admin/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },

  {
    name: "Product",
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    name: "Add Product",
    path: "add-product",
    element: <AdminDashboard />,
  },
  {
    name: "Add Product",
    path: "add-product",
    element: <AdminDashboard />,
  },
  {
    name: "Add Product",
    path: "add-product",
    element: <AdminDashboard />,
  },
];

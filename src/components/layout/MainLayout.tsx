import { Breadcrumb, Button, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import Sidebar from "./Sidebar";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { customerPaths } from "../../routes/customer.routes";
import Login from "../../pages/Login";

import Navbar from "./Navbar";
const { Content, Footer } = Layout;

// const userRole = {
//   ADMIN: "admin",
//   CUSTOMER: "customer",
// };

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  return (
    <Layout>
      <Navbar />
      <Content style={{ height: "100vh" }}>
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;

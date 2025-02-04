import { Layout, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import Navbar from "./Navbar";

const { Content, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <Layout>
      <Navbar />
      <Content style={{ height: "100vh" }}>
        <div style={{ minHeight: 280, padding: 24 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
      </Footer>
    </Layout>
  );
};

export default MainLayout;

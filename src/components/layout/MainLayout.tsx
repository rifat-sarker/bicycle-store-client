import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const { Content, Footer } = Layout;

const MainLayout = () => {
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

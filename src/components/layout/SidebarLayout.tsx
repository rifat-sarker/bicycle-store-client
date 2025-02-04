import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const SidebarLayout = () => {
  

  return (
    <Layout  style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          <Outlet />
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;

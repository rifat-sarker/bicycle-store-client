import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "../../pages/home/Footer";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 0px', marginTop: "100px" }}>
        <div style={{ minHeight: 280, padding: 24 }}>
          <Outlet />
        </div>
      </Content>
      <div >
        <Footer />
      </div>
    </Layout>
  );
};

export default MainLayout;

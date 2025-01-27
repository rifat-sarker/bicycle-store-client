import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { createElement } from "react";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { routesGenerator } from "../../utils/routesGenerator";
import { homePaths } from "../../routes/home.routes";

const items = routesGenerator(homePaths);

const Navbar = () => {
  //       const user = useAppSelector(selectCurrentUser);
  //   let sidebarItems;

  //   switch (user?.role) {
  //     case userRole.ADMIN:
  //       sidebarItems = routesGenerator(adminPaths, userRole.ADMIN);
  //       break;
  //     case userRole.CUSTOMER:
  //       sidebarItems = routesGenerator(customerPaths, userRole.CUSTOMER);
  //       break;

  //     default:
  //       break;
  //   }

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
          Bicycle Store
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, justifyContent: "center", minWidth: 0 }}
        />

        {/* <Button onClick={handleLogout}>Logout</Button>{" "} */}
        <Button href="/register">Register</Button>
        <Button href="/login">Login</Button>
      </Header>
    </Layout>
  );
};

export default Navbar;

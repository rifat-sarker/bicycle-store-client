import { Button, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { homePaths } from "../../routes/home.routes";

const Navbar = () => {
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
        Cyclify
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={navbarItemsGenerator(homePaths)}
          style={{ flex: 1, justifyContent: "center", minWidth: 0 }}
        />
        <Button href="/register">Register</Button>
        <Button href="/login">Login</Button>
      </Header>
    </Layout>
  );
};

export default Navbar;

import { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { homePaths } from "../../routes/home.routes";
import Logo from "../../utils/Logo";

const { Header } = Layout;

// Define primary and secondary colors
const primaryColor = "#ffffff";
const secondaryColor = "#f4b400";

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: primaryColor,
          padding: "0 16px",
        }}
      >
        {/* Logo */}
        <Logo />

        <div className="desktop-menu">
          <Menu
            // theme="dark"
            mode="horizontal"
            items={navbarItemsGenerator(homePaths)}
            style={{
              backgroundColor: primaryColor,
              color: "#C2C2C2",
              borderBottom: "none",
            }}
          />
        </div>

        <div style={{ gap: "10px" }} className="desktop-buttons">
          <Button
            href="/register"
            style={{ backgroundColor: secondaryColor, color: "black" }}
          >
            Register
          </Button>
          <Button href="/login" type="primary">
            Login
          </Button>
        </div>

        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          className="mobile-menu-toggle"
        />
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          theme="light"
          mode="vertical"
          items={navbarItemsGenerator(homePaths)}
        />
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Button
            href="/register"
            style={{ backgroundColor: secondaryColor, color: "black" }}
          >
            Register
          </Button>
          <Button href="/login" type="primary">
            Login
          </Button>
        </div>
      </Drawer>

      <style jsx="true">{`
        /* Hide desktop menu and buttons on small screens */
        .desktop-menu,
        .desktop-buttons {
          display: none;
        }

        /* Adjust toggle button size and alignment */
        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px; /* Increase icon size */
          // color: white;
          background: none;
          border: none;
          cursor: pointer;
          width: 48px; /* Ensure button size is consistent */
          height: 48px;
          padding: 0;
          margin-left: auto;
        }

        /* Hover effect for toggle button */
        .mobile-menu-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

        /* Custom active menu item style */
        .ant-menu-item-selected {
          background: none !important;
          // border-bottom: 2px solid ${secondaryColor} !important; /* Add underline */
        }

        .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Responsive styles for larger screens */
        @media (min-width: 768px) {
          .desktop-menu,
          .desktop-buttons {
            display: flex;
          }
          .mobile-menu-toggle {
            display: none;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Navbar;

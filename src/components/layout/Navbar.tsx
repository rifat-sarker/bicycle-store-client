import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  LoginOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { homePaths } from "../../routes/home.routes";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { Avatar, Button, Drawer, Dropdown, Menu, Space, Tooltip } from "antd";
import Logo from "../../utils/Logo";

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);

  <Drawer
    title="Your Cart"
    placement="right"
    onClose={() => setCartDrawerVisible(false)}
    open={cartDrawerVisible}
  >
    {/* Your cart content goes here */}
    <p>Item 1</p>
    <p>Item 2</p>
    <Button type="primary" onClick={() => navigate("/cart")}>
      Go to Full Cart Page
    </Button>
  </Drawer>;

  const { user } = useAppSelector((state) => state.auth);
  // console.log(user);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const dashboardPath = user?.role === "admin" ? "/admin" : "/customer";

  return (
    <nav style={{ backgroundColor: "#000" }} className="navbar dark-bg">
      <div style={{ padding: "15px 50px" }} className="top-bar">
        <Link to="/">
          <Logo size={30} />
        </Link>

        {!isMobile && (
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <Button
              size="large"
              style={{ backgroundColor: "#f59e0b", color: "#000" }}
            >
              <SearchOutlined className="bg-primary" />
            </Button>
          </div>
        )}

        {!isMobile ? (
          <div className="auth-buttons">
            {user ? (
              <Space>
                <Tooltip title="Cart">
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}
                    shape="circle"
                    size="large"
                    onClick={() => setCartDrawerVisible(true)}
                    style={{
                      color: "#f59e0b",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  />
                </Tooltip>
                <Tooltip title="Dashboard">
                  <Button
                    icon={<AppstoreOutlined style={{ fontSize: 24 }} />}
                    shape="circle"
                    size="large"
                    onClick={() => navigate(dashboardPath)}
                    style={{
                      color: "#f59e0b",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  />
                </Tooltip>

                <Dropdown
                  placement="bottomRight"
                  trigger={["hover"]}
                  menu={{
                    items: [
                      {
                        key: "profile",
                        label: (
                          <div style={{ padding: "8px 12px" }}>
                            <div style={{ fontWeight: "bold" }}>
                              {user.name || "User"}
                            </div>
                            <div style={{ fontSize: "12px", color: "#888" }}>
                              {user.email}
                            </div>
                          </div>
                        ),
                        disabled: true,
                        icon: <UserOutlined />,
                      },
                      {
                        type: "divider",
                      },
                      {
                        key: "settings",
                        label: "Settings",
                        icon: <SettingOutlined />,
                        onClick: () => navigate("/settings"),
                      },
                      {
                        key: "logout",
                        label: "Logout",
                        icon: <LogoutOutlined />,
                        onClick: handleLogout,
                      },
                    ],
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "#f59e0b",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </Space>
            ) : (
              <Button
                className="primary-bg primary-color"
                style={{ color: "#000", border: "none" }}
                shape="round"
                size="large"
                href="/login"
              >
                Login <LoginOutlined />
              </Button>
            )}
          </div>
        ) : (
          <Button className="menu-toggle" onClick={toggleDrawer}>
            {drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        )}
      </div>

      {!isMobile && (
        <Menu
          className="dar-bg"
          mode="horizontal"
          items={navbarItemsGenerator(homePaths)}
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "none",
          }}
        />
      )}

      {isMobile && (
        <Drawer placement="right" onClose={toggleDrawer} open={drawerVisible}>
          <div className="drawer-search">
            <input type="text" placeholder="Search..." />
            <Button
              size="large"
              style={{ backgroundColor: "#f59e0b", color: "#000" }}
            >
              <SearchOutlined />
            </Button>
          </div>
          <Menu
            theme="light"
            mode="vertical"
            items={navbarItemsGenerator(homePaths)}
          />
          <div className="drawer-auth">
            {user ? (
              <>
                <div
                  style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {user.name || "User"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {user.email}
                  </div>
                </div>
                <Button
                  onClick={() => navigate(dashboardPath)}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000",
                    fontWeight: 500,
                    border: "none",
                  }}
                  icon={<AppstoreOutlined style={{ fontSize: 24 }} />}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={() => setCartDrawerVisible(true)}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000",
                    fontWeight: 500,
                    border: "none",
                  }}
                  icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}
                >
                  Cart
                </Button>
                <Button
                  onClick={() => navigate("/settings")}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000",
                    fontWeight: 500,
                    border: "none",
                  }}
                  icon={<SettingOutlined />}
                >
                  Settings
                </Button>
                <Button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#f59e0b",
                    color: "#000",
                    fontWeight: 500,
                    border: "none",
                  }}
                  icon={<LogoutOutlined />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                className="primary-bg primary-color"
                style={{ color: "#000", border: "none" }}
                shape="round"
                size="large"
                href="/login"
              >
                Login <LoginOutlined />
              </Button>
            )}
          </div>
        </Drawer>
      )}

      {/* ✅ Cart Drawer now inside JSX */}
      <Drawer
        title="Your Cart"
        placement="right"
        onClose={() => setCartDrawerVisible(false)}
        open={cartDrawerVisible}
      >
        {/* Your cart content goes here */}
        <p>Item 1</p>
        <p>Item 2</p>
        <Button type="primary" onClick={() => navigate("/cart")}>
          Go to Full Cart Page
        </Button>
      </Drawer>

      <style>{`
        .navbar {
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 999;
          background-color: #fff;
          border-bottom: 1px solid #eee;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          color: #000;
          text-decoration: none;
        }

        .search-bar {
          flex: 1;
          display: flex;
          justify-content: center;
          margin: 0 24px;
        }

        .search-bar input {
          width: 280px;
          padding: 8px;
          border: 1px solid #ccc;
          border-right: none;
          border-radius: 6px 0 0 6px;
        }

        .search-bar button {
          background: #000;
          color: #fff;
          padding: 8px 12px;
          border: none;
          border-radius: 0 6px 6px 0;
          cursor: pointer;
        }

        .auth-buttons {
          display: flex;
          gap: 10px;
        }

        .auth-buttons button {
          // padding: 8px 12px;
          // font-size: 14px;
          border: 1px solid #ddd;
          // background: #fff;
          // color: #000;
          // border-radius: 6px;
          cursor: pointer;
        }

        .auth-buttons button:hover {
          background: #f4f4f4;
        }

          .menu-toggle {
            background: none;
            border: none;
            font-size: 22px;
            cursor: pointer;
            color: #f59e0b;
          }

        .drawer-search {
          display: flex;
        }

        .drawer-search input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px 0 0 6px;
        }

                  .drawer-search button {
            padding: 8px 12px;
            background-color: #f59e0b;
            color: #000;
            border: none;
            border-radius: 0 6px 6px 0;
          }

          .drawer-search button:hover,
          .auth-buttons button:hover,
          .drawer-auth button:hover {
            opacity: 0.9;
          }

        .drawer-auth {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .search-bar, .auth-buttons {
            display: none;
          }
        }
     `}</style>
    </nav>
  );
};

export default Navbar;

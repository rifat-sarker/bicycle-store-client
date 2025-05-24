import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  DashboardOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { homePaths } from "../../routes/home.routes";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { Button, Drawer, Menu } from "antd";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

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
    <nav className="navbar">
      <div className="top-bar">
        <Link to="/" className="logo">
          Cyclify
        </Link>

        {!isMobile && (
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <Button color="default" variant="solid">
              <SearchOutlined />
            </Button>
          </div>
        )}

        {!isMobile ? (
          <div className="auth-buttons">
            {user ? (
              <>
                <Button
                  color="default"
                  variant="solid"
                  onClick={() => navigate(dashboardPath)}
                >
                  Dashboard <DashboardOutlined />
                </Button>
                <Button color="default" variant="solid" onClick={handleLogout}>
                  Logout <LogoutOutlined />
                </Button>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button color="default" variant="solid">
                    Register
                    <SiGnuprivacyguard />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button color="default" variant="solid">
                    Login <LoginOutlined />
                  </Button>
                </Link>
              </>
            )}
          </div>
        ) : (
          <Button className="menu-toggle" onClick={toggleDrawer}>
            {drawerVisible ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        )}
      </div>

      {/* Large Screen Menu (Centered) */}
      {!isMobile && (
        <Menu
          mode="horizontal"
          items={navbarItemsGenerator(homePaths)}
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#C2C2C2",
            borderBottom: "none",
          }}
        />
      )}

      {/* Mobile Drawer Menu */}
      {isMobile && (
        <Drawer placement="right" onClose={toggleDrawer} open={drawerVisible}>
          <div className="drawer-search">
            <input type="text" placeholder="Search..." />
            <Button color="default" variant="solid">
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
                <Button
                  color="default"
                  variant="solid"
                  onClick={() => navigate(dashboardPath)}
                >
                  Dashboard
                  <DashboardOutlined />
                </Button>
                <Button color="default" variant="solid" onClick={handleLogout}>
                  Logout
                  <LogoutOutlined />
                </Button>
              </>
            ) : (
              <>
                <Button color="default" variant="solid" href="/register">
                  Register <SiGnuprivacyguard />{" "}
                </Button>
                <Button color="default" variant="solid" href="/login">
                  Login <LoginOutlined />
                </Button>
              </>
            )}
          </div>
        </Drawer>
      )}

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
          background-color: #000;
          color: white;
          border: none;
          border-radius: 0 6px 6px 0;
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

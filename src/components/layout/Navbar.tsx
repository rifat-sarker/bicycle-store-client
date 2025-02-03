import { useEffect, useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { homePaths } from "../../routes/home.routes";
import Logo from "../../utils/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header } = Layout;

// Define primary and secondary colors
const primaryColor = "#ffffff";

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track if screen is mobile
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user data from Redux store
  const { user } = useAppSelector((state) => state.auth);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    // navigate("/login");
  };

  // Determine dashboard path based on role
  const dashboardPath = user?.role === "admin" ? "/admin" : "/customer";

  // Resize listener to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              items={navbarItemsGenerator(homePaths)}
              style={{
                backgroundColor: primaryColor,
                color: "#C2C2C2",
                borderBottom: "none",
              }}
            />
          </div>
        )}

        {/* Show Login/Register if not logged in, otherwise show Dashboard/Logout */}
        <div style={{ gap: "10px" }} className="desktop-buttons">
          {user ? (
            <>
              <Button
                color="default"
                variant="solid"
                onClick={() => navigate(dashboardPath)}
              >
                Dashboard
              </Button>
              <Button color="default" variant="solid" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="default" variant="solid" href="/register">
                Register
              </Button>
              <Button color="default" variant="solid" href="/login">
                Login
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle button */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            className="mobile-menu-toggle"
          />
        )}
      </Header>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer placement="right" onClose={toggleDrawer} open={drawerVisible}>
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
            {user ? (
              <>
                <Button
                  color="default"
                  variant="solid"
                  onClick={() => navigate(dashboardPath)}
                >
                  Dashboard
                </Button>
                <Button color="default" variant="solid" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="default" variant="solid" href="/register">
                  Register
                </Button>
                <Button color="default" variant="solid" href="/login">
                  Login
                </Button>
              </>
            )}
          </div>
        </Drawer>
      )}

      <style jsx="true">{`
        .desktop-menu,
        .desktop-buttons {
          display: none;
        }

        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
          width: 48px;
          height: 48px;
          padding: 0;
          margin-left: auto;
        }

        .mobile-menu-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
        }

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

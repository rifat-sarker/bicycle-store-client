import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { customerPaths } from "../../routes/customer.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import { Button, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "../../utils/Logo";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { verifyToken } from "../../utils/verifyToken";

const userRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleLogout = () => {
    const toastId = toast.loading("Logging out");
    dispatch(logout());
    toast.success("Logout success", { id: toastId, duration: 2000 });
    navigate("/");
  };

  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.CUSTOMER:
      sidebarItems = sidebarItemsGenerator(customerPaths, userRole.CUSTOMER);
      break;
    default:
      break;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSmallScreen(true);
        setCollapsed(true);
      } else {
        setIsSmallScreen(false);
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sider
      theme="light"
      collapsed={collapsed}
      width={250}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={sidebarItems}
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      />

      <div style={{ marginTop: "auto", padding: "1rem" }}>
        <Button
          color="default"
          variant="solid"
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            
          }}
          icon={<LogoutOutlined />}
        >
          {!collapsed && "Logout"}
        </Button>
      </div>

      {isSmallScreen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            margin: "150px 0px"
          }}
        >
          <Button
            icon={<RightOutlined />}
            color="default"
            variant="solid"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              // background: "#fff",
              border: "none",
              padding: "0.5rem",
              borderRadius: "50%",
              
            }}
          />
        </div>
      )}

      {/* Toggle Button at the Bottom of Sidebar
      {isSmallScreen && (
        <div
          style={{
            position: "absolute",
            bottom: "10px", // Bottom of the sidebar
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Button
            icon={<RightOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "#fff",
              border: "none",
              padding: "0.5rem",
              borderRadius: "50%",
            }}
          />
        </div>
      )} */}
    </Sider>
  );
};

export default Sidebar;

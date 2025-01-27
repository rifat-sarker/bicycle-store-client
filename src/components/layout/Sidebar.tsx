import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { customerPaths } from "../../routes/customer.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const userRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("Logging out");
    dispatch(logout());
    toast.success("Logout success", { id: toastId, duration: 2000 });
    navigate("/login");
  };

  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.CUSTOMER:
      sidebarItems = sidebarItemsGenerator(customerPaths, userRole.CUSTOMER);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
          Cyclify
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
      <Button onClick={handleLogout}>logout</Button>
    </Sider>
  );
};

export default Sidebar;

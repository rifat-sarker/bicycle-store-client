import { Tabs, Row, Button } from "antd";
import { useState } from "react";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import BSForm from "../components/form/BSForm";
import { verifyToken } from "../utils/verifyToken";
import BSInput from "../components/form/BSInput";
import { LoginOutlined, UserOutlined, CrownOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const { TabPane } = Tabs;

const CredentialTabs = () => {
  const { setValue } = useFormContext();
  const [activeTab, setActiveTab] = useState<string | null>(null); // initially no tab selected

  const handleTabClick = (key: string) => {
    setActiveTab(key); // manually set active tab

    if (key === "admin") {
      setValue("email", "rifatswd@gmail.com");
      setValue("password", "rifat1234");
    } else if (key === "user") {
      setValue("email", "rifat@gmail.com");
      setValue("password", "rifat1234");
    }
  };

  return (
    <Tabs
      activeKey={activeTab ?? ""}
      onTabClick={handleTabClick}
      centered
      style={{ marginBottom: "16px" }}
    >
      <TabPane
        tab={
          <span>
            <UserOutlined /> User
          </span>
        }
        key="user"
      />
      <TabPane
        tab={
          <span>
            <CrownOutlined /> Admin
          </span>
        }
        key="admin"
      />
    </Tabs>
  );
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful!", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Login failed!", { id: toastId });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: 400,
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 16, fontWeight: 600 }}>
          Login <UserOutlined />
        </h2>

        <BSForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginSchema)}
          defaultValues={{ email: "", password: "" }}
        >
          <CredentialTabs />

          <BSInput type="email" name="email" label="Email:" />
          <BSInput type="password" name="password" label="Password:" />

          <Button
            type="default"
            shape="round"
            size="large"
            icon={<LoginOutlined />}
            htmlType="submit"
            style={{
              width: "100%",
              color: "#000",
              backgroundColor: "#f59e0b",
              border: "none",
              fontWeight: 600,
              marginTop: 10,
            }}
          >
            Login
          </Button>

          <p style={{ textAlign: "center", margin: "14px 0 0" }}>
            Don&apos;t have an account?{" "}
            <Link style={{ color: "#10b981" }} to={"/register"}>
              Register
            </Link>
          </p>
        </BSForm>
      </div>
    </Row>
  );
};

export default Login;

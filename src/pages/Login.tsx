import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import BSForm from "../components/form/BSForm";
import { verifyToken } from "../utils/verifyToken";
import BSInput from "../components/form/BSInput";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login.schema";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  // console.log("data", data);
  // console.log("error", error);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
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
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "16px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Login <UserOutlined />
        </h2>
        <BSForm
          onSubmit={onSubmit}
          resolver={zodResolver(loginSchema)}
          // defaultValues={defaultValues}
        >
          <BSInput type="email" name="email" label="Email:" />
          <BSInput type="password" name="password" label="Password:" />
          <Button
            icon={<LoginOutlined />}
            color="default"
            variant="solid"
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "4px",
              fontWeight: "600",
              fontSize: "16px",
            }}
            htmlType="submit"
          >
            Login
          </Button>
          <p style={{ textAlign: "center", margin: "10px 0" }}>
            Don't have an account? Please <Link to={"/register"}>Register</Link>
          </p>
        </BSForm>
      </div>
    </Row>
  );
};

export default Login;

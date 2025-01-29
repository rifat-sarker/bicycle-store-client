import BSForm from "../components/form/BSForm";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import BSInput from "../components/form/BSInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/register.schema";
import { UserAddOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "../redux/features/customer/customerApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const toastId = toast.loading("Creating User..");

    try {
      const userInfo = {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      };
      const res = await register(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Register success", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.log(error);
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
          Register <UserAddOutlined />
        </h2>
        <BSForm onSubmit={onSubmit} resolver={zodResolver(registerSchema)}>
          <BSInput type="text" name="name" label="Name:" />
          <BSInput type="email" name="email" label="Email:" />
          <BSInput type="password" name="password" label="Password:" />
          <Button
            icon={<UserAddOutlined />}
            className="secondary-bg"
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "4px",
              fontWeight: "600",
              fontSize: "16px",
            }}
            htmlType="submit"
          >
            Register
          </Button>
          <p style={{ textAlign: "center", margin: "10px 0" }}>
            Already have an account? Please <Link to={"/login"}>Login</Link>
          </p>
        </BSForm>
      </div>
    </Row>
  );
};

export default Register;

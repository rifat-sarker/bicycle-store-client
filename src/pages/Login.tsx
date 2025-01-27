import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BSForm from "../components/form/BSForm";
import { verifyToken } from "../utils/verifyToken";
import BSInput from "../components/form/BSInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  // console.log("data", data);
  // console.log("error", error);

  const defaultValues = {
    userEmail: "rifatswd@gmail.com",
    password: "rifat1234",
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.userEmail,
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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <BSForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <BSInput type="text" name="userEmail" label="Email:" />
        <BSInput type="text" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </BSForm>
    </Row>
  );
};

export default Login;

import BSForm from "../components/form/BSForm";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BSInput from "../components/form/BSInput";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { UserAddOutlined } from "@ant-design/icons";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
        </BSForm>
      </div>
    </Row>
  );
};

export default Register;

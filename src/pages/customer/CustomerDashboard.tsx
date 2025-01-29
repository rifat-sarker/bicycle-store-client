import { Form, Input, Button, Card, Avatar, Typography } from "antd";
import { useUpdatePasswordMutation } from "../../redux/features/customer/customerApi";
import {  useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

const { Title, Text } = Typography;

const CustomerDashboard = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const [form] = Form.useForm();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  const handlePasswordChange = async (data: FieldValues) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.warning("New password and confirm password do not match.");
        return;
      }
  
      const userInfo = {
        email: user?.email,
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
  
      const res = await updatePassword(userInfo).unwrap();
      
  
      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
  
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };
  
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={
              "https://i.ibb.co.com/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
            }
            size={80}
          />
          <Title level={3} style={{ margin: "20px 0 10px" }}>
            {user.name}
          </Title>
          <Text type="secondary">{user.email}</Text>
        </div>
        <div style={{ marginTop: "30px", width: "100%" }}>
          <h1
            level={4}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Change Password
          </h1>
          <Form
            layout="vertical"
            onFinish={handlePasswordChange}
            form={form}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                { required: true, message: "Enter your current password" },
              ]}
            >
              <Input.Password placeholder="Current password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: "Enter a new password" }]}
            >
              <Input.Password placeholder="New password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              rules={[{ required: true, message: "Confirm your new password" }]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Button
              type="primary"
              className="secondary-bg"
              htmlType="submit"
              block
              style={{ fontSize: "16px", height: "40px" , color: "black"}}
            >
              Change Password
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default CustomerDashboard;

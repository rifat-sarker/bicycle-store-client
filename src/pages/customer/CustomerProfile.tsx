import { Form, Input, Button, Card, Avatar, Typography, Row, Col } from "antd";
import { useUpdatePasswordMutation } from "../../redux/features/customer/customerApi";
import { useAppSelector } from "../../redux/hooks";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Title, Text } = Typography;

const CustomerProfile = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const [form] = Form.useForm();
  const user = useAppSelector(selectCurrentUser);

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
        padding: "20px",
        backgroundColor: "#f0f2f5",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px", // Ensures max width for large screens
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "20px",
        }}
      >
        <Row gutter={[16, 24]} align="middle" justify="center">
          {/* Avatar Section */}
          <Col xs={24} style={{ textAlign: "center" }}>
            <Avatar
              src={
                "https://i.ibb.co/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
              }
              size={80}
              style={{ marginBottom: "15px" }}
            />
            <Title level={4}>{user.email}</Title>
            <Text type="secondary">{user.role}</Text>
          </Col>

          {/* Form Section */}
          <Col xs={24}>
            <Title
              level={4}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Change Password
            </Title>
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
                rules={[
                  { required: true, message: "Confirm your new password" },
                ]}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>
              <Button
                color="default"
                variant="solid"
                htmlType="submit"
                style={{
                  display: "flex",
                  margin: "0 auto",
                }}
              >
                Change Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CustomerProfile;

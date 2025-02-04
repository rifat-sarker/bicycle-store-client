import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  Row,
  Col,
  Typography,
  Button,
  Tabs,
  Input,
  Form,
  Alert,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const CustomerProfile = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState("1");
  const [profileData, setProfileData] = useState<TUser | null>(null);

  // Set profile data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        iat: currentUser.iat,
        exp: currentUser.exp,
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Alert
        message="Error"
        description="User is not logged in"
        type="error"
        showIcon
      />
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h1>My Profile</h1>
        </Header>

        <Content
          style={{
            padding: "24px",
            margin: "24px 0",
            background: "#fff",
            minHeight: 280,
          }}
        >
          <Row gutter={24}>
            <Col xs={24} sm={8} md={8} lg={6}>
              <Card
                hoverable
                cover={<Avatar size={64} icon={<UserOutlined />} />}
                style={{ textAlign: "center" }}
              >
                <Title level={4}>{profileData?.name}</Title>
                <Paragraph>{profileData?.email}</Paragraph>
                <Paragraph>{profileData?.role}</Paragraph>
                <Button type="primary" size="small">
                  Edit Profile
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={16} md={16} lg={18}>
              <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
                <TabPane tab="Profile Details" key="1">
                  <Card title="Profile Details" bordered={false}>
                    <Paragraph>
                      <strong>Username:</strong> {profileData?.name}
                    </Paragraph>
                    <Paragraph>
                      <strong>Email:</strong> {profileData?.email}
                    </Paragraph>
                    <Paragraph>
                      <strong>Role:</strong> {profileData?.role}
                    </Paragraph>
                    <Paragraph>
                      <strong>Bio:</strong> Customer of Cyclify
                    </Paragraph>
                  </Card>
                </TabPane>

                <TabPane tab="Settings" key="2">
                  <Card title="Account Settings" bordered={false}>
                    <Form layout="vertical">
                      <Form.Item label="Username">
                        <Input value={profileData?.name} />
                      </Form.Item>
                      <Form.Item label="Email">
                        <Input value={profileData?.email} />
                      </Form.Item>
                      {/* <Form.Item label="Bio">
                        <Input.TextArea value={profileData?.bio || ""} />
                      </Form.Item> */}
                      <Button type="primary" block>
                        Save Changes
                      </Button>
                    </Form>
                  </Card>
                </TabPane>

                <TabPane tab="Activity" key="3">
                  <Card title="Recent Activity" bordered={false}>
                    <ul>
                      <li>
                        Logged in on <strong>Issued At:</strong>{" "}
                        {profileData?.iat ?? "N/A"}
                      </li>
                      <li>
                        Token expires on <strong>Issued At:</strong>{" "}
                        {profileData?.exp ?? "N/A"}
                      </li>
                    </ul>
                  </Card>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomerProfile;

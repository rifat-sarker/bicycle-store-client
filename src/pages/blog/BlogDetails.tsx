import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Avatar,
  Spin,
  Row,
  Col,
  Button,
  Form,
  Input,
  List,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Blog } from "../../types/blog";
import { useGetBlogByIdQuery } from "../../redux/features/admin/blogApi";

const { Title, Paragraph, Text } = Typography;

// Define the expected API response shape
interface BlogResponse {
  data: Blog;
  success: boolean;
  message?: string;
}

// Custom comment component props
interface CustomCommentProps {
  author: string;
  avatar: string;
  content: string;
  datetime: string;
}

// Custom Comment Component
const CustomComment: React.FC<CustomCommentProps> = ({
  author,
  avatar,
  content,
  datetime,
}) => {
  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        padding: "12px",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar src={avatar} size={40} />
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text strong>{author}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {datetime}
            </Text>
          </div>
          <Paragraph
            style={{ marginBottom: 0, marginTop: 4, fontSize: "14px" }}
          >
            {content}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: blogResponse,
    isLoading,
    error,
  } = useGetBlogByIdQuery(id, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data as BlogResponse | undefined,
    }),
  });

  // Log the response for debugging
  React.useEffect(() => {
    console.log(blogResponse);
  }, [blogResponse]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !blogResponse?.data) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={3}>Blog Not Found</Title>
        <Button
          type="primary"
          href="/blogs"
          style={{ backgroundColor: "#f59e0b", borderColor: "#f59e0b" }}
        >
          Back to Blog
        </Button>
      </div>
    );
  }

  const blogData: Blog = blogResponse.data;

  // Dummy comments data
  const dummyComments = [
    {
      author: "Alice Johnson",
      avatar: "https://via.placeholder.com/40",
      content:
        "Great article! The tips on urban cycling really helped me improve my rides.",
      datetime: "May 26, 2025 10:30 PM",
    },
    {
      author: "Bob Smith",
      avatar: "https://via.placeholder.com/40",
      content:
        "Awesome insights! Looking forward to trying out those adventure bike routes.",
      datetime: "May 27, 2025 02:15 PM",
    },
    {
      author: "Clara Davis",
      avatar: "https://via.placeholder.com/40",
      content:
        "Very informative. The bike maintenance tips are a game-changer!",
      datetime: "May 27, 2025 06:00 PM",
    },
  ];

  return (
    <section style={{ padding: "50px 20px", backgroundColor: "#f8f9fa" }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={16}>
          {/* Back Button */}
          <Button
            type="link"
            href="/blogs"
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: 20, color: "#f59e0b" }}
          >
            Back to Blog
          </Button>

          {/* Blog Content */}
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Blog Image */}
            <img
              src={blogData.image || "https://via.placeholder.com/800x400"}
              alt={blogData.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />

            {/* Blog Details */}
            <div style={{ padding: "30px" }}>
              {/* Title */}
              <Title level={2} style={{ marginBottom: 20 }}>
                {blogData.title}
              </Title>

              {/* Author and Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  marginBottom: 20,
                }}
              >
                <Avatar
                  src={
                    "https://i.ibb.co/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
                  }
                  size={40}
                />
                <div>
                  <Text strong>Rifat Sarker</Text>
                  <br />
                </div>
              </div>

              {/* Content */}
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                {blogData.content}
              </Paragraph>
            </div>

            {/* Comment Section */}
            <div style={{ padding: "30px", borderTop: "1px solid #e8e8e8" }}>
              <Title level={4} style={{ marginBottom: 20 }}>
                Comments
              </Title>

              {/* Comment Form */}
              <Form
                style={{ marginBottom: 20 }}
                layout="vertical"
                onFinish={(values) => console.log(values)} // Placeholder for form submission
              >
                <Form.Item
                  name="comment"
                  rules={[
                    { required: true, message: "Please input your comment!" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Write a comment..."
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    style={{
                      backgroundColor: "#f59e0b",
                      borderColor: "#f59e0b",
                      borderRadius: 8,
                      color: "#000",
                    }}
                  >
                    Post Comment
                  </Button>
                </Form.Item>
              </Form>

              {/* Comment List */}
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={dummyComments}
                renderItem={(item) => (
                  <li>
                    <CustomComment
                      author={item.author}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.datetime}
                    />
                  </li>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default BlogDetails;

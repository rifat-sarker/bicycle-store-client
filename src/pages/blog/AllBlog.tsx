import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Avatar,
  Button,
  Pagination,
  Select,
  Spin,
  Input,
  Grid,
} from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetAllBlogsQuery } from "../../redux/features/admin/blogApi";
import { Blog } from "../../types/blog";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

const AllBlogs: React.FC = () => {
  const { data: blogResponse, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs: Blog[] = blogResponse?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Removed setPageSize
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const screens = useBreakpoint();

  const categories = [
    "All",
    "City",
    "Adventure",
    "Maintenance",
    "News",
    "Commuter",
    "Racing",
    "Electric",
    "Reviews",
    "Tips",
  ];

  const filteredBlogs = blogs
    .filter(
      (blog) => categoryFilter === null || blog.category === categoryFilter
    )
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section
      style={{
        padding: "40px 20px",
        backgroundColor: "#f0f4f8",
        minHeight: "100vh",
      }}
    >
      <Row justify="center">
        <Col xs={24} lg={22}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            href="/"
            style={{ marginBottom: 20, color: "#f59e0b", fontWeight: 500 }}
          >
            Back to Home
          </Button>

          <Title level={2}>All Blog Posts</Title>
          <Paragraph style={{ fontSize: "16px" }}>
            Explore the latest tips, guides, and news from the cycling world.
          </Paragraph>

          <div
            style={{
              display: "flex",
              flexDirection: screens.md ? "row" : "column",
              justifyContent: "space-between",
              marginTop: 30,
              gap: 24,
            }}
          >
            {/* Left Sidebar */}
            {screens.md && (
              <div
                style={{
                  width: 250,
                  position: "sticky",
                  top: 120,
                  height: "fit-content",
                  flexShrink: 0,
                }}
              >
                <Card style={{ marginBottom: 20, borderRadius: 12 }}>
                  <Input
                    placeholder="Search blogs..."
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </Card>

                <Card title="Filter by Category" style={{ borderRadius: 12 }}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setCategoryFilter(value === "All" ? null : value);
                      setCurrentPage(1);
                    }}
                    value={categoryFilter || "All"}
                  >
                    {categories.map((cat) => (
                      <Option key={cat} value={cat}>
                        {cat}
                      </Option>
                    ))}
                  </Select>
                </Card>
              </div>
            )}

            {/* Center Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {isLoading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Spin size="large" />
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <Title level={3} style={{ color: "#1a2a44" }}>
                    No blogs found
                  </Title>
                </div>
              ) : (
                <>
                  <Row gutter={[24, 24]}>
                    {paginatedBlogs.map((blog) => (
                      <Col xs={24} sm={24} md={24} key={blog._id}>
                        <Card
                          hoverable
                          style={{
                            borderRadius: 12,
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ height: 300, position: "relative" }}>
                            <img
                              src={
                                blog.image ||
                                "https://i.ibb.co/MkbyPSHB/360-F-229758328-7x8jw-Cwjt-BMm-C6rg-Fz-LFh-Zo-Ep-Lob-B6-L8.jpg"
                              }
                              alt={blog.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 20,
                                left: 20,
                                color: "#fff",
                                zIndex: 1,
                              }}
                            >
                              <Text
                                strong
                                style={{ fontSize: 24, color: "#fff" }}
                              >
                                {blog.title}
                              </Text>
                            </div>
                          </div>
                          <div style={{ padding: 20 }}>
                            <Paragraph ellipsis={{ rows: 2 }}>
                              {blog.content}
                            </Paragraph>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <Avatar
                                src={"https://via.placeholder.com/40"}
                                size={32}
                              />
                              <Text type="secondary">
                                Rifat Sarker ·{" "}
                                {new Date(
                                  blog.createdAt || Date.now()
                                ).toLocaleDateString()}
                              </Text>
                            </div>
                            <Button
                              type="primary"
                              href={`/blogs/${blog._id}`}
                              style={{
                                marginTop: 16,
                                backgroundColor: "#f59e0b",
                                borderColor: "#f59e0b",
                              }}
                            >
                              Read More
                            </Button>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredBlogs.length}
                    onChange={(page) => setCurrentPage(page)}
                    style={{ marginTop: 30, textAlign: "center" }}
                  />
                </>
              )}
            </div>

            {/* Right Banner */}
            {screens.md && (
              <div
                style={{
                  width: 250,
                  position: "sticky",
                  top: 120,
                  height: "fit-content",
                  flexShrink: 0,
                }}
              >
                <Card
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f59e0b",
                    color: "#000",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  <Title level={4} style={{ marginBottom: 16 }}>
                    Join Our Cycling Community!
                  </Title>
                  <Paragraph
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      marginBottom: 20,
                    }}
                  >
                    Get the latest updates, exclusive tips, and join events with
                    fellow cycling enthusiasts.
                  </Paragraph>
                  <Button
                    className="secondary-bg"
                    href="/register"
                    style={{
                      border: "none",
                      color: "#000",
                    }}
                  >
                    Sign Up Now
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default AllBlogs;

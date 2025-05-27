import React, { useRef } from "react";
import { Carousel, Card, Typography, Avatar, Button, Row, Col } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Blog } from "../../types/blog";
import { useGetAllBlogsQuery } from "../../redux/features/admin/blogApi";

const { Title, Paragraph, Text } = Typography;

const BlogSection: React.FC = () => {
  const { data: blogs } = useGetAllBlogsQuery(undefined);
  const carouselRef = useRef<any>(null);

  // console.log(blogs);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <section
      className=""
      style={{
        padding: "50px 20px",
      }}
    >
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 30 }}>
        <Col>
          <Title level={2}>From Our Blog</Title>
          <Paragraph style={{ fontSize: "16px" }}>
            Tips, guides & cycling news — all in one place.
          </Paragraph>
        </Col>

        <Col>
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrev}
            style={{
              marginRight: 10,
            }}
          />
          <Button icon={<RightOutlined />} onClick={handleNext} style={{}} />
        </Col>
      </Row>

      {/* Carousel with gap */}
      <Carousel
        ref={carouselRef}
        slidesToShow={3}
        dots={false}
        arrows={false}
        infinite={false}
        responsive={[
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {blogs?.data.map((blog: Blog) => (
          <div key={blog._id}>
            <div style={{ padding: "10px 8px", height: "100%" }}>
              <Card
                hoverable
                cover={
                  <img
                    src={blog.image || "https://via.placeholder.com/300"}
                    alt={blog.title}
                    style={{
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                }
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <Title level={4}>{blog.title}</Title>
                <Paragraph>{blog.content}</Paragraph>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar src={`blog.author.avatar || "AuthorImg"`} />
                    <Text>Rifat Sarker</Text>
                  </div>
                  <Button
                    type="link"
                    href={`/blogs/${blog._id}`}
                    className="secondary-color"
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default BlogSection;

import React, { useRef } from "react";
import { Carousel, Card, Typography, Avatar, Button, Row, Col } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const blogs = [
  {
    id: 1,
    title: "Top 10 Bicycle Accessories You Must Have",
    description:
      "Upgrade your ride with these must-have accessories for comfort, safety, and style.",
    image: "/blog/blog1.jpg",
    author: {
      name: "John Doe",
      avatar: "/authors/john.jpg",
    },
  },
  {
    id: 2,
    title: "How to Maintain Your Bike Like a Pro",
    description:
      "Regular maintenance tips that can extend your bike’s life and improve performance.",
    image: "/blog/blog2.jpg",
    author: {
      name: "Emily Clark",
      avatar: "/authors/emily.jpg",
    },
  },
  {
    id: 3,
    title: "Best Biking Trails in Bangladesh",
    description:
      "Explore scenic and thrilling bike trails across the country for all skill levels.",
    image: "/blog/blog3.jpg",
    author: {
      name: "Arif Hossain",
      avatar: "/authors/arif.jpg",
    },
  },
  {
    id: 4,
    title: "Choosing the Right Bike for Your Lifestyle",
    description:
      "Understand the key differences between road, mountain, and hybrid bikes.",
    image: "/blog/blog4.jpg",
    author: {
      name: "Nadia Rahman",
      avatar: "/authors/nadia.jpg",
    },
  },
];

const BlogSection: React.FC = () => {
  const carouselRef = useRef<any>(null);

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
        {blogs.map((blog) => (
          <div key={blog.id}>
            <div style={{ padding: "10px 8px", height: "100%" }}>
              <Card
                hoverable
                cover={
                  <img
                    src="https://res.cloudinary.com/dunfiptfi/image/upload/v1747829895/l1x8ixz7qfedw19fixj2.jpg"
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
                <Paragraph style={{ color: "#444" }}>
                  {blog.description}
                </Paragraph>
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
                    <Avatar src={blog.author.avatar} />
                    <Text>Rifat Sarker</Text>
                  </div>
                  <Button type="link" className="secondary-color">
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

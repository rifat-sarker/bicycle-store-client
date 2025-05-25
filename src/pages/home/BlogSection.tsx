import React, { useRef } from "react";
import { Card, Typography, Button, Carousel } from "antd";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const blogs = [
  {
    id: 1,
    title: "Top 10 Bicycle Accessories You Must Have",
    image: "/blog/blog1.jpg",
  },
  {
    id: 2,
    title: "How to Maintain Your Bike Like a Pro",
    image: "/blog/blog2.jpg",
  },
  {
    id: 3,
    title: "Best Biking Trails in Bangladesh",
    image: "/blog/blog3.jpg",
  },
  {
    id: 4,
    title: "Choosing the Perfect Bike for Your Lifestyle",
    image: "/blog/blog4.jpg",
  },
];

const BlogSection: React.FC = () => {
  const carouselRef = useRef<any>(null);

  return (
    <section
      style={{
        background: "#fff",
        padding: "60px 20px",
       
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Top section with title and navigation buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 40,
        }}
      >
        <div>
          <Title level={2} style={{ color: "#111", marginBottom: 8 }}>
            From Our Blog
          </Title>
          <Paragraph style={{ color: "#666", fontSize: 16, maxWidth: 500 }}>
            Explore tips, trails, and insights that help elevate your biking
            experience.
          </Paragraph>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => carouselRef.current?.prev()}
            style={{
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Button
            icon={<RightOutlined />}
            onClick={() => carouselRef.current?.next()}
            style={{
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>

      {/* Blog Cards Carousel */}
      <Carousel
        dots={false}
        ref={carouselRef}
        slidesToShow={3}
        swipeToSlide
        infinite
        responsive={[
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            style={{ padding: "0 12px", height: "100%" }}
          >
            <Card
              hoverable
              cover={
                <img
                  src={blog.image}
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
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
              }}
              bodyStyle={{ padding: 20, minHeight: 120 }}
            >
              <Title level={4} style={{ margin: 0, fontSize: 16 }}>
                {blog.title}
              </Title>
              <Button
                type="link"
                style={{ padding: 0, marginTop: 12 }}
                href={`/blog/${blog.id}`}
              >
                Read Full Blog →
              </Button>
            </Card>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
};

export default BlogSection;

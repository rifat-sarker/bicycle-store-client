import React, { useRef } from "react";
import { Carousel, Card, Avatar, Button, Typography, Row, Col } from "antd";
import { LeftOutlined, RightOutlined, StarFilled } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const testimonials = [
  {
    name: "Aarav Khan",
    role: "Cycling Enthusiast",
    image: "https://i.pravatar.cc/150?img=12",
    feedback:
      "Cyclify made my bicycle shopping super easy! Great selection, smooth checkout, and fast delivery.",
    rating: 5,
  },
  {
    name: "Maya Rahman",
    role: "Fitness Trainer",
    image: "https://i.pravatar.cc/150?img=45",
    feedback:
      "I recommend Cyclify to all my clients. Reliable service and awesome quality cycles!",
    rating: 4,
  },
  {
    name: "Tanvir Hasan",
    role: "Mountain Biker",
    image: "https://i.pravatar.cc/150?img=33",
    feedback:
      "Loved the gear options and customer support. Will definitely buy again!",
    rating: 5,
  },
  {
    name: "Zara Ahmed",
    role: "Urban Commuter",
    image: "https://i.pravatar.cc/150?img=31",
    feedback:
      "The perfect place to buy stylish and affordable bikes. Cyclify is now my go-to!",
    rating: 4,
  },
  {
    name: "Rahim Uddin",
    role: "Road Racer",
    image: "https://i.pravatar.cc/150?img=38",
    feedback:
      "Fast delivery and quality service. I love the community vibe Cyclify provides.",
    rating: 5,
  },
];

const chunkArray = (arr: any[], size: number) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Testimonials: React.FC = () => {
  const carouselRef = useRef<any>(null);

  const next = () => carouselRef.current?.next();
  const prev = () => carouselRef.current?.prev();

  const testimonialGroups = chunkArray(testimonials, 2); // 2 per slide

  return (
    <div style={{ padding: "50px 20px", }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            What Our Riders Say
          </Title>
          <Text style={{fontSize: "16px"}}>Real feedback from Cyclify customers</Text>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <Button icon={<LeftOutlined />} onClick={prev} />
          <Button icon={<RightOutlined />} onClick={next} />
        </div>
      </div>

      <Carousel ref={carouselRef} dots autoplay>
        {testimonialGroups.map((group, idx) => (
          <div key={idx}>
            <Row gutter={[24, 24]} justify="center">
              {group.map((testimonial, index) => (
                <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Card bordered={false} style={{ borderRadius: 12 }}>
                    <Paragraph style={{ fontStyle: "italic" }}>
                      “{testimonial.feedback}”
                    </Paragraph>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 24,
                      }}
                    >
                      <Avatar
                        size={64}
                        src={testimonial.image}
                        style={{ marginRight: 16 }}
                      />
                      <div>
                        <Text strong>{testimonial.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {testimonial.role}
                        </Text>
                      </div>
                      <div style={{ marginLeft: "auto", color: "#faad14" }}>
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <StarFilled key={i} />
                          )
                        )}
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;

import { Button, Card, Carousel, Flex } from "antd";
import { useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.ibb.co.com/sFks9GW/Michael-Brown.png",
    feedback:
      "This is the best bicycle I have ever purchased. It's smooth, stylish, and worth every penny!",
    position: "Cyclist",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.ibb.co.com/yYN8Pvk/Emily-Johnson-Profile.jpg",
    feedback:
      "Amazing quality and performance. Customer service was excellent. Highly recommended!",
    position: "Fitness Enthusiast",
  },
  {
    id: 3,
    name: "Alex Johnson",
    image: "https://i.ibb.co.com/bB1mLF9/brown-michael.jpg",
    feedback:
      "I love the durability and design of these bicycles. Perfect for city and off-road rides.",
    position: "Mountain Biker",
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "https://i.ibb.co/G9WyKbW/download.jpg",
    feedback:
      "Incredible experience! The bicycles are lightweight and easy to handle, perfect for long rides.",
    position: "Tourist",
  },
  {
    id: 5,
    name: "Mark Wilson",
    image: "https://i.ibb.co.com/jgvGKSJ/Sample-Male-Principal.jpg",
    feedback:
      "Superb quality and attention to detail. I'm happy with my purchase. Highly recommend this brand!",
    position: "Professional Cyclist",
  },
];

const Testimonials = () => {
  const carouselRef = useRef<any>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div style={{ padding: "50px 20px" }}>
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          margin: "0 auto 30px",
          padding: "0 15px",
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          What Our Customers Say
        </Title>
        <div>
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrev}
            style={{
              marginRight: 10,
            }}
          />
          <Button icon={<RightOutlined />} onClick={handleNext} />
        </div>
      </div>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          padding: "0 15px",
          
        }}
      >
        <Carousel
          ref={carouselRef}
          slidesToShow={3}
          slidesToScroll={1}
          dots={false}
          arrows={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                padding: "10 8px", 
                boxSizing: "border-box",
                display: Flex,
              }}
            >
              <Card
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  height: "320px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <h3 style={{ margin: "0 0 5px 0" }}>{testimonial.name}</h3>
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    {testimonial.position}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginTop: "15px",
                    padding: "0 10px",
                  }}
                >
                  "{testimonial.feedback}"
                </p>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;

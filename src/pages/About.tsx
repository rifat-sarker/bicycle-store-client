import { Card, Row, Col, } from "antd";

import { Carousel } from "antd";

const AboutPage = () => {
  const galleryImages1: string[] = [
    "https://i.ibb.co.com/0h38trz/alexander-fastovets-PXYFdw-NLB1-E-unsplash.jpg",
    "https://i.ibb.co.com/TLVz3Tp/irish83-Xk80-Mt-VJMfo-unsplash.jpg",
    "https://i.ibb.co.com/chNk5zy/robert-bye-t-G36rv-Ceqng-unsplash.jpg",
    "https://i.ibb.co.com/CVxyTBd/mikkel-bech-yj-AFnk-Lt-KY0-unsplash.jpg",
  ];
  const galleryImages2: string[] = [
    "https://i.ibb.co.com/TLVz3Tp/irish83-Xk80-Mt-VJMfo-unsplash.jpg",
    "https://i.ibb.co.com/0h38trz/alexander-fastovets-PXYFdw-NLB1-E-unsplash.jpg",
    "https://i.ibb.co.com/CVxyTBd/mikkel-bech-yj-AFnk-Lt-KY0-unsplash.jpg",
    "https://i.ibb.co.com/chNk5zy/robert-bye-t-G36rv-Ceqng-unsplash.jpg",
  ];

  return (
    <div style={{}}>
      <Card
        style={{
          borderRadius: "8px",
          fontFamily: "inherit",
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <img
              alt="shop_image"
              src="https://i.ibb.co.com/YJjtc88/DALL-E-2025-01-28-12-22-40-A-professional-banner-design-showcasing-a-sleek-black-and-blue-bicycle-wi.webp"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Col>
          <Col xs={24} md={12}>
            <h1>Welcome to Our Bicycle Shop!</h1>
            <h4 style={{ color: "gray" }}>
              At <strong>Your Bicycle Shop</strong>, we are passionate about
              helping you find the perfect bicycle for your adventures. Whether
              you are an experienced cyclist or just getting started, we offer a
              wide range of bikes and accessories tailored to meet your needs.
            </h4>
            <h4 style={{ color: "gray" }}>
              <strong>Our Mission:</strong> To inspire and empower every
              individual to explore the joy of cycling while promoting a
              healthier and more sustainable lifestyle.
            </h4>
          </Col>
        </Row>

        <Row style={{ marginTop: "24px", }}>
          <Col xs={24}>
            <h1>Why Choose Us?</h1>
            <ul style={{ paddingLeft: "20px",color: "gray" }}>
              <li>Wide range of premium bicycles and accessories.</li>
              <li>Friendly and knowledgeable staff ready to assist you.</li>
              <li>Commitment to sustainability and the environment.</li>
              <li>Community events and cycling workshops.</li>
            </ul>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12}>
            <Carousel autoplay autoplaySpeed={2000} effect="fade">
              {galleryImages1.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`gallery1-${index}`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>

          <Col xs={24} sm={12}>
            <Carousel autoplay autoplaySpeed={2000} effect="fade">
              {galleryImages2.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`gallery2-${index}`}
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>

        <Row style={{ marginTop: "24px" }}>
          <Col xs={24}>
            <h1>Visit Us Today!</h1>
            <h4 style={{ color: "#888", }}>
              Experience the difference at <strong>Your Bicycle Shop</strong>.
              Come visit us and take a test ride on your dream bike. We look
              forward to welcoming you to our cycling family!
            </h4>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AboutPage;

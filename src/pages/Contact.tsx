import { Form, Input, Button, Row, Col, Card } from "antd";

const ContactPage = () => {
  return (
    <div style={{ margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "16px" }}>Contact Us</h1>
      <p style={{ textAlign: "center", marginBottom: "24px" }}>
        Have any questions? Feel free to reach out!
      </p>

      <Card
        style={{
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <h2>Our Office</h2>
            <p>
              <strong>Address:</strong> 123 Bicycle Street, City, Country
            </p>
            <p>
              <strong>Email:</strong> contact@bicycleshop.com
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
          </Col>

          <Col xs={24} md={12}>
            <h3>Send a Message</h3>
            <Form layout="vertical">
              <Form.Item label="Your Name">
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item label="Your Email">
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item label="Your Message">
                <Input.TextArea rows={4} placeholder="Write your message..." />
              </Form.Item>
              <Button
                style={{ color: "black" }}
                className="secondary-bg"
                type="primary"
                block
              >
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>

      <h4 style={{ textAlign: "center", marginTop: "32px" }}>Follow Us</h4>
      <p style={{ textAlign: "center" }}>
        Stay updated with our latest products and offers!
      </p>
      <h5 style={{ textAlign: "center" }}>Facebook | Instagram | Twitter</h5>
      <h6 style={{ textAlign: "center", color: "gray" }}>
        &copy; 2025 Bicycle Shop. All rights reserved.
      </h6>
    </div>
  );
};

export default ContactPage;

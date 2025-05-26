import { Row, Col, Input, Button, message } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Logo from "../../utils/Logo";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      message.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success("Thank you for subscribing!");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        marginTop: "50px",
        backgroundColor: "#000",
        color: "#fff",
        width: "100%",
        padding: "40px 20px", // 👈 Added padding
        boxSizing: "border-box", // 👈 Ensure no overflow
        overflowX: "hidden", // 👈 Prevent horizontal scroll
      }}
    >
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <Logo />
          <p style={{ fontSize: "14px" }}>
            Premium Bicycles for Every Adventure
          </p>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ color: "white" }}>Important Links</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/all-product"
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                All Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={{
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "8px",
                  color: "gray",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{}}>Follow Us</h4>
          <div style={{ fontSize: "24px", display: "flex", gap: "15px" }}>
            <a
              href="https://www.facebook.com/rifatswd/"
              style={{ color: "gray" }}
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://www.x.com/rifatswd/"
              style={{ color: "gray" }}
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://www.instagram.com/rifatswd/"
              style={{ color: "gray" }}
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/rifatswd/"
              style={{ color: "gray" }}
            >
              <LinkedinOutlined />
            </a>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ color: "white" }}>Newsletter</h4>
          <p style={{ fontSize: "14px" }}>
            Subscribe for updates on new arrivals and discounts.
          </p>
          <div style={{ display: "flex", gap: "6px" }}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                maxWidth: 300,
                height: 40,
              }}
            />

            <Button
              shape="round"
              variant="outlined"
              size="large"
              className="primary-bg"
              style={{ color: "#000", border: "none" }}
              onClick={handleSubscribe}
              loading={loading}
            >
              Subscribe
            </Button>
          </div>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <p>
            © {new Date().getFullYear()} Bicycle Store. All rights reserved.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

import { Row, Col, Input } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Logo from "../../utils/Logo";

const Footer = () => {
  return (
    <div
      style={{
        marginTop: "50px",
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
            <a href="#" style={{}}>
              <FacebookOutlined />
            </a>
            <a href="#" style={{}}>
              <TwitterOutlined />
            </a>
            <a href="#" style={{}}>
              <InstagramOutlined />
            </a>
            <a href="#" style={{}}>
              <LinkedinOutlined />
            </a>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <h4 style={{ color: "white" }}>Newsletter</h4>
          <p style={{ fontSize: "14px" }}>
            Subscribe for updates on new arrivals and discounts.
          </p>
          <Input
            placeholder="Enter your email"
            style={{
              borderRadius: "4px",
              padding: "8px",
              marginTop: "10px",
            }}
          />
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

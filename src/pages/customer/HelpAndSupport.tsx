import React, { useState } from "react";
import {
  Input,
  Button,
  Collapse,
  Tabs,
  Row,
  Col,
  Typography,
  Form,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const HelpAndSupport = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const faqData = [
    {
      question: "How can I reset my password?",
      answer: "Go to Settings > Account > Reset Password.",
    },
    {
      question: "Where can I view my order history?",
      answer:
        "Visit the Orders section in the dashboard to view your past orders.",
    },
    {
      question: "How do I update my payment method?",
      answer: "Go to Settings > Payment Information to update your method.",
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

 

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Help & Support</Title>

      {/* Search Bar */}
      <Row gutter={[16, 16]} justify="center" style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Input
            placeholder="Search support articles"
            value={searchQuery}
            onChange={handleSearchChange}
            suffix={<SearchOutlined />}
            size="large"
            
          />
        </Col>
        <Col>
          <Button color="default" variant="solid">
            Search
          </Button>
        </Col>
      </Row>

      {/* Tabs for different sections */}
      <Tabs defaultActiveKey="1" style={{ marginBottom: "20px" }}>
        <TabPane tab="Support Articles" key="1">
          <Paragraph>
            Here are some useful articles to help you get started with our
            platform.
          </Paragraph>
          <Collapse>
            {faqData.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <Paragraph>{faq.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </TabPane>

        <TabPane tab="Contact Support" key="2">
          <Title level={4}>Contact our Support Team</Title>
          <Form
            layout="vertical"
            onFinish={(values) => console.log(values)}
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Describe your issue or question"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="FAQs" key="3">
          <Collapse>
            {faqData.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <Paragraph>{faq.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HelpAndSupport;

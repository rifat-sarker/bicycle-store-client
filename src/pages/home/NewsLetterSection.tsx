import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

const NewsletterSection: React.FC = () => {
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

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  return (
    <section
      className="dark-bg"
      style={{
        padding: "50px 20px",
        textAlign: "center",
        color: "#fff",
        margin:"50px 20px"
      }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", color: "#fff" }}>
          <Title
            level={2}
            className=""
            style={{ marginBottom: 8, color: "#fff" }}
          >
            Join Our Newsletter
          </Title>
          <Paragraph
            className="light-gray"
            style={{ fontSize: 16, marginBottom: 24, color: "#fff" }}
          >
            Stay updated with the latest bike deals, cycling tips, and exclusive
            offers!
          </Paragraph>

          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
            <motion.div variants={buttonVariants}>
              <Button
                shape="round"
                variant="outlined"
                size="large"
                className="secondary-color"
                style={{ color: "#000", border: "none" }}
                onClick={handleSubscribe}
                loading={loading}
              >
                Subscribe
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;

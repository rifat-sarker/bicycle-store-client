import { Carousel, Button, Typography } from "antd";
import { easeOut, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import "antd/dist/reset.css";

// import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner4.jpg";
import banner1 from "../../assets/images/banner3.jpg";

const { Title, Paragraph } = Typography;

const Banner = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentStyle: React.CSSProperties = {
    height: "70vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#000",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(135deg, rgba(0, 51, 102, 0.6), rgba(0, 153, 51, 0.4))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#fff",
    padding: windowWidth <= 576 ? "20px 30px" : "50px 80px", // Responsive padding
    zIndex: 2,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "65vh",
    objectFit: "cover",
    objectPosition: "center",
    top: "-5%",
    left: "-15%",
  };

  const titleStyle: React.CSSProperties = {
    color: "#fff",
    fontSize:
      windowWidth <= 576 ? "32px" : windowWidth <= 768 ? "48px" : "64px", // Responsive font size
    fontWeight: 700,
    marginBottom: "20px",
    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
    letterSpacing: "1.5px",
  };

  const paragraphStyle: React.CSSProperties = {
    color: "#fff",
    fontSize:
      windowWidth <= 576 ? "14px" : windowWidth <= 768 ? "16px" : "20px",
    marginBottom: "40px",
    maxWidth: "550px",
    lineHeight: "1.6",
  };

  const buttonStyle: React.CSSProperties = {
    borderRadius: "10px",
    padding: windowWidth <= 576 ? "8px 20px" : "12px 40px",
    height: "auto",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
    color: "#000",
  };

  // Animation variants for text and button
  const textVariants: Variants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: easeOut },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.6, type: "spring" },
    },
  };

  // Enhanced parallax effect for images
  const imageVariants: Variants = {
    initial: { scale: 1.1, x: 0, y: 0 },
    animate: {
      scale: 1.3,
      x: "-15%",
      y: "-5%",
      transition: {
        duration: 6,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div style={{ margin: "0px 20px" }}>
      <Carousel
        autoplay
        autoplaySpeed={4000}
        draggable
        effect="fade"
        style={{
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
          width: "100%",
        }}
      >
        {/* Slide 1 */}
        <div style={contentStyle}>
          <motion.img
            src={banner1}
            alt="Cyclist in urban setting"
            style={imageStyle}
            variants={imageVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            style={overlayStyle}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.div variants={textVariants}>
              <Title level={1} style={titleStyle}>
                Cycle Your City
              </Title>
            </motion.div>
            <motion.div variants={textVariants}>
              <Paragraph style={paragraphStyle}>
                Transform your urban rides with our sleek, high-performance city
                bikes built for style and speed.
              </Paragraph>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                type="primary"
                color="default"
                variant="solid"
                size="large"
                style={buttonStyle}
                href="/all-product"
              >
                Shop City Bikes
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide 2 */}
        <div style={contentStyle}>
          <motion.img
            src={banner2}
            alt="Mountain bike on scenic trail"
            style={imageStyle}
            variants={imageVariants}
            initial="initial"
            animate="animate"
          />
          <motion.div
            style={overlayStyle}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.div variants={textVariants}>
              <Title level={1} style={titleStyle}>
                Blaze New Trails
              </Title>
            </motion.div>
            <motion.div variants={textVariants}>
              <Paragraph style={paragraphStyle}>
                Conquer rugged terrains with our durable mountain bikes, crafted
                for epic adventures.
              </Paragraph>
            </motion.div>
            <motion.div>
              <Button
                type="primary"
                color="default"
                variant="solid"
                size="large"
                style={buttonStyle}
                href="/all-product"
              >
                Shop Sports Bikes
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

import { Card, Col, Row, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { easeInOut, easeOut, motion } from "framer-motion";
import "antd/dist/reset.css"; // Ant Design styles
import { GoArrowRight } from "react-icons/go";

const { Title: AntTitle, Text } = Typography;

const OfferSection = () => {
  // Sample offer data (replace with API call if needed)
  const offers = [
    {
      id: "1",
      title: "Summer Sale",
      discount: "20%",
      description: "Get 20% off on all outdoor bikes!",
      link: "/offers/summer-sale",
    },
    {
      id: "2",
      title: "Electric Bike Deal",
      discount: "15%",
      description: "Save 15% on electric bicycles!",
      link: "/offers/electric-deal",
    },
    {
      id: "3",
      title: "Kids Bike Promo",
      discount: "25%",
      description: "25% off on kids' bikes this month!",
      link: "/offers/kids-promo",
    },
    {
      id: "4",
      title: "Adventure Gear Bundle",
      discount: "30%",
      description: "30% off adventure bike bundles!",
      link: "/offers/adventure-bundle",
    },
  ];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: easeInOut },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
  };

  return (
    <div
      className="site-layout"
      style={{
        padding: "50px 20px",
      }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div style={{ marginBottom: "40px" }}>
          <AntTitle level={2}>Special Offers</AntTitle>
          <Text style={{ fontSize: 16 }}>
            Grab these limited-time deals on your favorite bikes!
          </Text>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {offers.map((offer) => (
            <Col key={offer.id} xs={24} sm={12} md={12} lg={6}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card
                  bordered={false}
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  bodyStyle={{
                    padding: "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <AntTitle
                      level={4}
                      style={{ color: "#000000", marginBottom: 10 }}
                    >
                      {offer.title}
                    </AntTitle>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#f59e0b",
                        marginBottom: 15,
                      }}
                    >
                      {offer.discount} OFF
                    </Text>
                    <Text
                      style={{
                        color: "#666",
                        lineHeight: "1.5",
                        flex: 1,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {offer.description}
                    </Text>
                  </div>
                  <Link to={offer.link}>
                    <Button
                      color="default"
                      variant="solid"
                      size="small"
                      style={{
                        borderRadius: "8px",
                        color: "#000",
                        backgroundColor: "#10b981",
                        margin: "10px 0",
                      }}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <motion.div variants={buttonVariants}>
            <Link to="/all-offers">
              <Button color="default" variant="link" size="large">
                <GoArrowRight /> View All Offers
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferSection;

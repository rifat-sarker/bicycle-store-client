import { Card, Col, Row, Button, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { motion } from "framer-motion"; // For animations
import "antd/dist/reset.css"; // Ant Design styles
import Title from "antd/es/typography/Title";

const { Title: AntTitle, Text } = Typography;

const FeaturedBicycles = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  // Animation variants for section and cards
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeInOut" },
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
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <AntTitle level={2} style={{ color: "#000000", fontWeight: 700 }}>
            Featured Bicycles
          </AntTitle>
          <Text style={{ fontSize: 16 }}>
            Discover our top picks for your next ride
          </Text>
        </div>

        {isLoading ? (
          <Row gutter={[24, 24]} justify="center">
            {Array.from({ length: 6 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  bordered={false}
                  style={{
                    minHeight: "450px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Skeleton.Image
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "10px 10px 0 0",
                    }}
                    active
                  />
                  <Skeleton
                    active
                    title={{ width: "60%" }}
                    paragraph={{ rows: 2, width: ["70%", "80%"] }}
                    style={{ padding: "16px" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[24, 24]} justify="center">
            {products?.data?.slice(0, 8).map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  whileTap="hover"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card
                    title={
                      <AntTitle
                        level={4}
                        style={{
                          margin: 0,
                          color: "#000000",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.name}
                      </AntTitle>
                    }
                    bordered={false}
                    style={{
                      minHeight: "450px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#fff",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                      border: "1px solid #e0e0e0",
                    }}
                    styles={{
                      body: {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "20px",
                        flex: 1,
                      },
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                        transition: "transform 0.3s ease",
                      }}
                      src={product.productImg}
                      alt={product.name}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        flex: 1,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.5em",
                        maxHeight: "4.5em",
                      }}
                    >
                      {product.description}
                    </Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Title level={3}>${product.price}</Title>
                      <Link to={`/product/${product._id}`}>
                        <Button color="default" variant="solid">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to={"/all-product"}>
            <Button color="default" variant="solid" size="large">
              View All Bicycles
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedBicycles;

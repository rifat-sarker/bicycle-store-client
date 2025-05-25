import { Card, Col, Row, Button, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { motion } from "framer-motion"; // For animations
import "antd/dist/reset.css"; // Ant Design styles
import Title from "antd/es/typography/Title";

const { Title: AntTitle, Paragraph, Text } = Typography;

const FeaturedBicycles = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  // Animation variants for fade-in and hover effects
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        marginTop: "60px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <AntTitle level={2} style={{ color: "#000000", fontWeight: 700 }}>
          Featured Bicycles
        </AntTitle>
        <Text type="secondary" style={{ fontSize: "16px", color: "#888888" }}>
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
                  height: "100%",
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
          {products?.data?.slice(0, 6).map((product) => (
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
                    <AntTitle level={4} style={{ margin: 0, color: "#000000" }}>
                      {product.name}
                    </AntTitle>
                  }
                  bordered={false}
                  style={{
                    height: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e0e0e0",
                  }}
                  bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
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
                  <Text style={{marginTop: 10, marginBottom: 10}}>
                    {product.description.length > 150
                      ? `${product.description.substring(0, 150)}...`
                      : product.description}
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
    </div>
  );
};

export default FeaturedBicycles;

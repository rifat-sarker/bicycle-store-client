import { Card, Col, Row, Button, Typography, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/features/admin/productManagementApi";
import { easeInOut, easeOut, motion } from "framer-motion"; // For animations
import "antd/dist/reset.css"; // Ant Design styles
import { getAntIcon } from "../../getAntIcon";

const { Title: AntTitle, Text } = Typography;

const CategorySection = () => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  // Animation variants for fade-in and hover effects
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: easeInOut },
    },
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text style={{ color: "#888888" }}>No categories available</Text>
      </div>
    );
  }

  return (
    <div
      className="site-layout"
      style={{
        padding: "50px 20px",
      }}
    >
      <div style={{ marginBottom: "40px" }}>
        <AntTitle level={2}>Explore Categories</AntTitle>
        <Text style={{ fontSize: 16 }}>
          Find the perfect bike for your journey
        </Text>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {categories.map((category) => {
          const IconComponent = getAntIcon(category.icon);
          return (
            <Col
              key={category._id || category.name}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="hover"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card
                  bordered={false}
                  style={{
                    height: "200px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {/* New div to replace bodyStyle */}
                  <div
                    style={{
                      padding: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginBottom: "16px" }}>
                      {IconComponent && (
                        <IconComponent
                          style={{ fontSize: "40px", color: "#000000" }}
                        />
                      )}
                    </div>
                    <AntTitle
                      level={4}
                      style={{ color: "#000000", marginBottom: "16px" }}
                    >
                      {category.name}
                    </AntTitle>
                    <Link to={`/products/category/${category.slug}`}>
                      <Button
                        style={{
                          color: "#10b981",
                        }}
                      >
                        Explore
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CategorySection;

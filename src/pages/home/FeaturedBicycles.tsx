"use client";

import { Card, Col, Row, Button, Skeleton, Typography, Rate } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { GoArrowRight } from "react-icons/go";

const { Title: AntTitle, Text } = Typography;

interface Product {
  _id: string;
  name: string;
  productImg: string;
  description: string;
  price: number;
  rating?: number;
}

const FeaturedBicycles = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
  };

  // Simulate adding to cart (replace with actual cart logic)
  const handleAddToCart = (product: Product) => {
    console.log(`${product.name} added to cart!`);
    // Add your cart logic here (e.g., dispatch to Redux store)
  };

  return (
    <div
      className="site-layout"
      style={{
        padding: "50px 24px",
      }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header Section - Centered */}
        <div style={{ marginBottom: "50px" }}>
          <AntTitle level={2}>Featured Bicycles</AntTitle>
          <Text
            style={{
              fontSize: "16px",
            }}
          >
            Discover our top picks for your next ride
          </Text>
        </div>

        {isLoading ? (
          <Row gutter={[24, 32]} justify="center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4.8}>
                <Card
                  bordered={false}
                  style={{
                    height: "420px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e8e8e8",
                  }}
                >
                  <Skeleton.Image
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "12px",
                    }}
                    active
                  />
                  <Skeleton
                    active
                    title={{ width: "80%" }}
                    paragraph={{ rows: 2, width: ["70%", "90%"] }}
                    style={{ padding: "20px 0" }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[24, 32]} justify="center">
            {products?.data?.slice(0, 8).map((product: Product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={4.8}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  onHoverStart={() => setHoveredCard(product._id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card
                    bordered={false}
                    style={{
                      height: "420px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#ffffff",
                      boxShadow:
                        hoveredCard === product._id
                          ? "0 8px 32px rgba(0, 0, 0, 0.12)"
                          : "0 4px 20px rgba(0, 0, 0, 0.08)",
                      border: "1px solid #e8e8e8",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    bodyStyle={{
                      padding: 0,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image Container with Padding */}
                    <div
                      style={{
                        position: "relative",
                        height: "260px",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          // objectFit: "contain",
                          borderRadius: "12px",
                          transition: "transform 0.3s ease",
                        }}
                        src={product.productImg || "/placeholder.svg"}
                        alt={product.name}
                      />

                      {/* Hidden Hover Buttons */}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredCard === product._id ? 1 : 0,
                          y: hoveredCard === product._id ? 0 : 20,
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          top: 265,
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "12px",
                          pointerEvents:
                            hoveredCard === product._id ? "auto" : "none",
                          zIndex: 10,
                        }}
                      >
                        <Button
                          type="link"
                          variant="solid"
                          icon={<EyeOutlined style={{ fontSize: "20px" }} />}
                          size="middle"
                          style={{
                            borderRadius: "8px",
                            color: "#000",
                            backgroundColor: "#10b981",
                            // borderColor: "#1677ff",
                            boxShadow: "0 4px 12px rgba(22, 119, 255, 0.3)",
                            fontWeight: "500",
                          }}
                          href={`/product/${product._id}`}
                        >
                          Details
                        </Button>
                        <Button
                          type="link"
                          variant="solid"
                          icon={
                            <ShoppingCartOutlined
                              style={{ fontSize: "20px" }}
                            />
                          }
                          size="middle"
                          style={{
                            backgroundColor: "#f59e0b",
                            // borderColor: "#f59e0b",
                            color: "#000",
                            fontWeight: "500",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Cart
                        </Button>
                      </motion.div>
                    </div>

                    {/* Product Info - All Centered */}
                    <div
                      style={{
                        padding: "20px",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "12px",
                      }}
                    >
                      {/* Product Name */}
                      <AntTitle level={5}>{product.name}</AntTitle>

                      {/* Rating - Centered */}
                      <Rate
                        disabled
                        allowHalf
                        value={product.rating || 4.5}
                        style={{
                          fontSize: "14px",
                          color: "#f59e0b",
                        }}
                      />

                      {/* Price - Centered */}
                      <AntTitle
                        level={4}
                        style={{
                          color: "#f59e0b",
                          fontWeight: 700,
                        }}
                      >
                        ${product.price}
                      </AntTitle>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {/* View All Button - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <Button color="default" variant="link" href="/all-product">
           <GoArrowRight />  View All Bicycles
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeaturedBicycles;

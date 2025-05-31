import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Select,
  Skeleton,
  Pagination,
  Slider,
  Typography,
  Rate,
} from "antd";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";
import { TQueryParam } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";

const { Option } = Select;
const { Title: AntTitle } = Typography;

const AllProduct = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const { data: categories = [] } = useGetCategoriesQuery();

  const queryParams: TQueryParam[] = [
    { name: "limit", value: "9" },
    { name: "page", value: page.toString() },
    ...(searchQuery ? [{ name: "searchTerm", value: searchQuery }] : []),
    ...(selectedCategory
      ? [{ name: "category", value: selectedCategory }]
      : []),
    ...(priceRange[0] > 0
      ? [{ name: "minPrice", value: priceRange[0].toString() }]
      : []),
    ...(priceRange[1] < 1000
      ? [{ name: "maxPrice", value: priceRange[1].toString() }]
      : []),
  ];

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(queryParams);

  const products = productData?.data?.map(
    ({
      _id,
      name,
      brand,
      model,
      price,
      description,
      category,
      productImg,
      rating,
    }: TProduct) => ({
      key: _id,
      name,
      brand,
      model,
      price,
      description,
      category,
      productImg,
      rating,
    })
  );

  const metaData = productData?.meta;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setPage(1);
    setSelectedCategory(value);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPage(1);
    setPriceRange([value[0], value[1]]);
  };

  const handleAddToCart = (product: any) => {
    console.log(`${product.name} added to cart!`);
    // Add your cart logic here
  };

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <Row gutter={[24, 32]} justify="center">
        {Array.from({ length: 8 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4.8}>
            <Card
              bordered={false}
              style={{
                height: "360px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
                border: "1px solid #e8e8e8",
              }}
            >
              <Skeleton.Image
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "10px",
                }}
                active
              />
              <Skeleton
                active
                title={{ width: "80%" }}
                paragraph={{ rows: 2, width: ["70%", "90%"] }}
                style={{ padding: "16px 0" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={24} style={{ marginTop: 50, padding: "0 24px" }}>
      {/* Left Filter Section */}
      <Col xs={24} sm={24} md={6}>
        <Card
          style={{
            padding: 16,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ padding: 16 }}>
            <h3 style={{ marginBottom: 12 }}>Search Products</h3>
            <Input
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
              allowClear
            />
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            <h3 style={{ marginBottom: 12 }}>Filter by Category</h3>
            <Select
              style={{ width: "100%" }}
              placeholder="Select a category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              allowClear
            >
              {categories?.map((cat: any) => (
                <Option key={cat._id || cat.name} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>

          <div style={{ padding: "0 16px 16px" }}>
            <h3 style={{ marginBottom: 12 }}>Price Range</h3>
            <Slider
              range
              min={0}
              max={1000}
              value={priceRange}
              onChange={handlePriceRangeChange}
              tooltip={{ formatter: (value) => `$${value}` }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                marginTop: 8,
              }}
            >
              <span>Min: ${priceRange[0]}</span>
              <span>Max: ${priceRange[1]}</span>
            </div>
          </div>
        </Card>
      </Col>

      {/* Right Product Display Section */}
      <Col xs={24} sm={24} md={18}>
        <Row gutter={[24, 32]} justify="center">
          {products?.map((product) => (
            <Col key={product.key} xs={24} sm={12} md={8} lg={6} xl={4.8}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                onHoverStart={() => setHoveredCard(product.key)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  bordered={false}
                  style={{
                    height: "360px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#ffffff",
                    boxShadow:
                      hoveredCard === product.key
                        ? "0 6px 24px rgba(0, 0, 0, 0.1)"
                        : "0 2px 12px rgba(0, 0, 0, 0.06)",
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
                      height: "200px",
                      padding: "16px",
                      backgroundColor: "#f8f9fa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isFetching ? (
                      <Skeleton.Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                        active
                      />
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "10px",
                          transition: "transform 0.3s ease",
                        }}
                        src={product.productImg || "/placeholder.svg"}
                        alt={product.name}
                      />
                    )}

                    {/* Hover Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredCard === product.key ? 1 : 0,
                        y: hoveredCard === product.key ? 0 : 20,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        top: 205,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        pointerEvents:
                          hoveredCard === product.key ? "auto" : "none",
                        zIndex: 10,
                      }}
                    >
                      <Button
                        type="link"
                        variant="solid"
                        icon={<EyeOutlined style={{ fontSize: "18px" }} />}
                        size="small"
                        style={{
                          borderRadius: "6px",
                          color: "#fff",
                          backgroundColor: "#10b981",
                          boxShadow: "0 2px 8px rgba(22, 119, 255, 0.2)",
                          fontWeight: "500",
                          padding: "4px 12px",
                        }}
                      >
                        <Link to={`/product/${product.key}`}>Details</Link>
                      </Button>
                      <Button
                        type="link"
                        variant="solid"
                        icon={
                          <ShoppingCartOutlined style={{ fontSize: "18px" }} />
                        }
                        size="small"
                        style={{
                          borderRadius: "6px",
                          backgroundColor: "#f59e0b",
                          color: "#fff",
                          fontWeight: "500",
                          padding: "4px 12px",
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

                  {/* Product Info - Centered */}
                  <div
                    style={{
                      padding: "16px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "8px",
                    }}
                  >
                    {/* Product Name */}
                    <AntTitle
                      level={5}
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        lineHeight: "1.4",
                      }}
                    >
                      {product.name}
                    </AntTitle>

                    {/* Rating - Centered */}
                    <Rate
                      disabled
                      allowHalf
                      value={product.rating || 4.5}
                      style={{
                        fontSize: "12px",
                        color: "#f59e0b",
                      }}
                    />

                    {/* Price - Centered */}
                    <AntTitle
                      level={4}
                      style={{
                        color: "#f59e0b",
                        fontWeight: 600,
                        fontSize: "18px",
                        margin: 0,
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

        <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
          <Pagination
            current={page}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default AllProduct;

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
import { motion } from "framer-motion";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../../redux/features/admin/productManagementApi";
import { TProduct } from "../../types/productManagement.type";
import { TQueryParam } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";
import { useAddToCartHandler } from "../../hooks/useAddToCartHandler";

const { Option } = Select;
const { Title: AntTitle } = Typography;

const AllProduct = () => {
  const { handleAddToCart } = useAddToCartHandler();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { data: categories = [] } = useGetCategoriesQuery();

  const queryParams: TQueryParam[] = [
    { name: "limit", value: "12" },
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

  const products = productData?.data?.map((product: TProduct) => ({
    key: product._id,
    name: product.name,
    brand: product.brand,
    model: product.model,
    price: product.price,
    description: product.description,
    category: product.category,
    productImg: product.productImg,
    fullProduct: product,
  }));
  

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
                  height: "320px",
                  borderRadius: "10px 10px 0 0",
                }}
                active
              />
              <Skeleton
                active
                title={{ width: "80%" }}
                paragraph={{ rows: 1, width: ["70%"] }}
                style={{ padding: "4px 8px" }}
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
                <Option key={cat._id} value={cat._id}>
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
              >
                <Card
                  bordered={false}
                  style={{
                    height: "350px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                    border: "1px solid #f0f0f0",
                    transition: "box-shadow 0.3s ease",
                    overflow: "hidden",
                    background: "#fff",
                  }}
                  bodyStyle={{
                    padding: 0,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      height: "220px",
                      backgroundColor: "#f9fafb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                      overflow: "hidden", // Prevent overflow if image is larger
                    }}
                  >
                    {isFetching ? (
                      <Skeleton.Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px 10px 0 0",
                        }}
                        active
                      />
                    ) : (
                      <Link
                        to={`/product/${product.key}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={product.productImg || "/placeholder.svg"}
                          alt={product.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            borderRadius: "10px 10px 0 0",
                            display: "block",
                          }}
                        />
                      </Link>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: "12px" }}>
                    <AntTitle
                      level={5}
                      style={{
                        margin: 0,
                        // fontSize: "14px",
                        lineHeight: "1.2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Link
                        to={`/product/${product.key}`}
                        style={{ color: "#000" }}
                      >
                        {product.name}
                      </Link>
                    </AntTitle>

                    <div style={{ fontSize: "12px", margin: "6px 0" }}>
                      <Rate
                        disabled
                        allowHalf
                        value={4.5}
                        style={{ fontSize: "12px", color: "#f59e0b" }}
                      />
                    </div>

                    <div
                      style={{
                        fontSize: "30px",
                        // fontWeight: 600,
                        color: "#000",
                      }}
                    >
                      ${product.price}
                    </div>

                    {/* Buttons */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "12px",
                      }}
                    >
                      <Button
                        type="primary"
                        shape="round"
                        style={{
                          backgroundColor: "#f59e0b",
                          borderColor: "#f59e0b",
                          color: "#000",
                          fontSize: "12px",
                        }}
                        onClick={() => handleAddToCart(product.fullProduct)}
                      >
                        Add to Cart
                      </Button>

                      <Link to={`/products/${product.key}`}>
                        <MoreOutlined
                          style={{ fontSize: "20px", color: "#666" }}
                        />
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
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

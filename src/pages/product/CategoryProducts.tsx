import {
  Card,
  Col,
  Row,
  Skeleton,
  Typography,
  Rate,
  Button,
  Pagination,
} from "antd";
import { easeOut, motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetCategoriesQuery,
} from "../../redux/features/admin/productManagementApi";
import { TQueryParam } from "../../types";
import { useState } from "react";
import { TProduct } from "../../types/productManagement.type";
import { MoreOutlined } from "@ant-design/icons";
import { useAddToCartHandler } from "../../hooks/useAddToCartHandler";

const { Title: AntTitle } = Typography;

const CategoryProducts = () => {
  const { handleAddToCart } = useAddToCartHandler();
  const { slug } = useParams();
  const [page, setPage] = useState(1);

  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery();

  // console.log("params", useParams());
  // console.log("All categories:", categoryData);
  // console.log("categoryName from URL:", slug);

  // Find category by name to get the _id
  const matchedCategory = categoryData?.find((cat) => cat.slug === slug);
  console.log("Matched category:", matchedCategory);
  const categoryId = matchedCategory?._id;

  const queryParams: TQueryParam[] = [
    { name: "limit", value: "12" },
    { name: "page", value: page.toString() },
  ];

  if (categoryId) {
    queryParams.push({ name: "category", value: categoryId });
  }

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(queryParams);

  const rawProducts = productData?.data || [];

  console.log(productData);

  const products = rawProducts.length
    ? rawProducts.map((product: TProduct) => ({
        key: product._id,
        name: product.name,
        brand: product.brand,
        model: product.model,
        price: product.price,
        description: product.description,
        category: product.category,
        productImg: product.productImg,
        fullProduct: product,
      }))
    : [];

  console.log(products);
  // console.log(categoryName);
  const metaData = productData?.meta;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  if (categoryLoading) {
    return <div>Loading...</div>;
  }

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
    <div style={{ padding: "0 24px", marginTop: 40 }}>
      <AntTitle level={3} style={{ textAlign: "center", marginBottom: 32 }}>
        Products in <span style={{ color: "#f59e0b" }}>{slug}</span> Category
      </AntTitle>

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
                  overflow: "hidden",
                  background: "#fff",
                  transition: "box-shadow 0.3s ease",
                }}
                bodyStyle={{
                  padding: 0,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: "220px",
                    backgroundColor: "#f9fafb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    overflow: "hidden",
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
                      to={`/products/${product.key}`}
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

                {/* Info */}
                <div style={{ padding: "12px" }}>
                  <AntTitle
                    level={5}
                    style={{
                      margin: 0,
                      lineHeight: "1.2",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Link
                      to={`/products/${product.key}`}
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

                  <div style={{ fontSize: "30px", color: "#000" }}>
                    ${product.price}
                  </div>

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

      {/* Fallback if no product found */}
      {!isFetching && products.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <AntTitle level={4}>No products found in this category.</AntTitle>
        </div>
      )}

      {/* Pagination */}
      <Row justify="center" style={{ marginTop: 24, marginBottom: 24 }}>
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </Row>
    </div>
  );
};

export default CategoryProducts;

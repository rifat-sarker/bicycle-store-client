import { Card, Col, Row, Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";

const FeaturedBicycles = () => {
  const { data: products, isLoading } = useGetAllProductsQuery(undefined);

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>Featured Bicycles</h1>
      </div>

      {isLoading ? (
        <Row gutter={[16, 16]} justify="center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card style={{ height: "100%" }}>
                <Skeleton.Image
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                  }}
                  active
                />
                <Skeleton
                  active
                  title={{ width: "70%" }}
                  paragraph={{ rows: 2, width: ["80%", "90%"] }}
                  style={{ marginTop: "16px" }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {products?.data?.slice(0, 6).map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8}>
              <Card
                title={product.name}
                bordered={false}
                style={{ height: "100%" }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    marginBottom: "8px",
                  }}
                  src={product.productImg}
                  alt={product.productImg}
                />
                <p style={{ flexGrow: 1, fontSize: "14px", color: "#666" }}>
                  {product.description.length > 200
                    ? `${product.description.substring(0, 200)}...`
                    : product.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    ${product.price}
                  </span>
                  <Link to={`/product/${product._id}`}>
                    <Button type="link">View Details...</Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link to={"/all-product"}>
          <Button color="default" variant="solid">
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBicycles;

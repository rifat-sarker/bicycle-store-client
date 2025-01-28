import { Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../redux/features/admin/productManagementApi";

const FeaturedBicycles = () => {
  const { data: products } = useGetAllProductsQuery(undefined);
  console.log(products);

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>Featured Bicycles</h1>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {products?.data?.slice(0, 6).map((product) => (
          <Col key={product._id} xs={24} sm={12} md={8}>
            <Card title={product.name} bordered={false}>
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
              <p>{product.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link to={"/all-product"}>
          <Button className="secondary-bg">View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBicycles;

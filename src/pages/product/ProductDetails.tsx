import { useParams, useNavigate } from "react-router-dom";
import { Card, Skeleton, Row, Col, Button, Divider } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  const handlePlaceOrder = () => {
    navigate(`/product/checkout/${id}`);
  };

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <Card style={{ width: "100%", marginTop: "16px" }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <img
            alt="bicycle_img"
            src={product?.data?.productImg}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <div style={{ paddingLeft: "20px" }}>
            <h1>{product?.data?.name}</h1>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              ${product?.data?.price}
            </p>
            <p>
              <strong>Reviews: ⭐⭐⭐⭐☆ (4/5)</strong>
            </p>
            <p>
              <strong>Brand:</strong> {product?.data?.brand}
            </p>
            <p>
              <strong>Model:</strong> {product?.data?.model}
            </p>
            <p>
              <strong>Category:</strong> {product?.data?.category}
            </p>
            <p>
              <strong>Status:</strong>
              {product?.data?.stock ? (
                <span style={{ color: "green" }}>In Stock</span>
              ) : (
                <span style={{ color: "red" }}>Out of Stock</span>
              )}
            </p>
            <Divider />

            <p>
              <strong>Description:</strong>
            </p>
            <p>{product?.data?.description}</p>

            <Divider />

            <Button
              color="default" variant="solid"
              style={{ width: "50%", margin: "20px 0px" }}
              onClick={handlePlaceOrder}
            >
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetails;

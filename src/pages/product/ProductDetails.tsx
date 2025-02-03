import { useParams, useNavigate } from "react-router-dom";
import { Card, Skeleton, Row, Col, Button, Typography, Divider } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";

const { Title, Text } = Typography;

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
            <Text strong>Brand:</Text> {product?.data?.brand}
            <br />
            <Text strong>Model:</Text> {product?.data?.model}
            <br />
            <Text strong>Price:</Text> ${product?.data?.price}
            <br />
            <Text strong>Category:</Text> {product?.data?.category}
            <br />
            <Text strong>
              Status:
              {product?.data?.stock === true ? (
                <Text type="success">In Stock </Text>
              ) : (
                <Text type="danger"> Out of stock</Text>
              )}{" "}
            </Text>{" "}
            <Divider />
            <Text strong>Description:</Text>
            <p>{product?.data?.description}</p>
            <Button
              color="default"
              variant="solid"
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

import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, Skeleton, Row, Col, Button, Typography, Divider } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";
import { useCreateOrderMutation } from "../../redux/features/customer/customerOrderApi";
import { useEffect } from "react";
import { toast } from "sonner";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product } = useGetProductByIdQuery(id);
  const [createOrder, { isSuccess, isLoading, data, isError, error }] =
    useCreateOrderMutation();

  // console.log(product.data);
  const handlePlaceOrder = async () => {
    // await createOrder({ products: [product?.data] });

    navigate(`/product/checkout/${id}`);
  };
  // const toastId = "cart";
  // useEffect(() => {
  //   if (isLoading) toast.loading("Processing....", { id: toastId });
  //   if (isSuccess) {
  //     toast.success(data?.message, { id: toastId });
  //     if (data?.data) {
  //       window.location.href = data.data;
  //     }
  //   }
  //   if (isError) toast.error(JSON.stringify(error), { id: toastId });
  // }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

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
            <Title level={2}>{product?.data?.name}</Title>
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
              className="secondary-bg"
              type="primary"
              size="large"
              style={{ width: "100%", color: "black" }}
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

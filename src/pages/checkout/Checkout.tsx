import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  InputNumber,
  Button,
  Typography,
  Skeleton,
  Row,
  Col,
  Divider,
} from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";
import { useCreateOrderMutation } from "../../redux/features/customer/customerOrderApi";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Checkout = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [
    createOrder,
    { isSuccess, isLoading: orderLoading, data, isError, error },
  ] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({
      products: [{ product: id, quantity }],
    });
  };

  const toastId = "order";
  if (orderLoading) toast.loading("Processing your order...", { id: toastId });
  if (isSuccess) {
    toast.success(data?.message, { id: toastId });
    if (data?.data) {
      setTimeout(() => {
        window.location.href = data.data;
      }, 1000);
    }
  }
  if (isError) {
    const errorMessage =
      (error as any)?.data?.message ||
      "Something went wrong! Please try again.";
    toast.error(errorMessage, { id: toastId });
  }

  if (isLoading) return <Skeleton active />;

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col xs={24} sm={18} md={16} lg={12}>
        <Card
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginBottom: "10px" }}>Checkout</h1>
          <Divider />
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <img
                src={product?.data?.productImg}
                alt="Product"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  objectFit: "cover",
                }}
              />
            </Col>
            <Col xs={24} md={12} style={{ textAlign: "left" }}>
              <Title level={4}>{product?.data?.name}</Title>
              <Text strong>Price: </Text> ${product?.data?.price}
              <br />
              <Text strong>Quantity:</Text>
              <InputNumber
                min={1}
                max={10}
                value={quantity}
                onChange={(value) => setQuantity(value ?? 1)}
                style={{
                  marginLeft: "10px",
                  width: "80px",
                  borderRadius: "8px",
                  padding: "5px",
                }}
              />
              <Divider />
              <Button
                type="primary"
                size="large"
                onClick={handlePlaceOrder}
                style={{
                  width: "100%",
                  backgroundColor: "#1890ff",
                  border: "none",
                  borderRadius: "8px",
                }}
                loading={orderLoading}
              >
                Order Now
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;

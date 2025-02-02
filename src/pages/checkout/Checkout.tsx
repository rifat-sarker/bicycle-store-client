import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, InputNumber, Button, Typography, Skeleton, message } from "antd";
import { useGetProductByIdQuery } from "../../redux/features/admin/productManagementApi";
import { useCreateOrderMutation } from "../../redux/features/customer/customerOrderApi";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  if (isError) toast.error(JSON.stringify(error), { id: toastId });

  if (isLoading) return <Skeleton active />;

  return (
    <Card style={{ width: "100%", marginTop: "16px" }}>
      <Title level={2}>Checkout</Title>
      <Text strong>Product:</Text> {product?.data?.name}
      <br />
      <Text strong>Price:</Text> ${product?.data?.price}
      <br />
      <img style={{ width: "50%" }} src={product?.data?.productImg} alt="" />
      <br />
      <Text strong>Quantity:</Text>
      <InputNumber
        min={1}
        max={10}
        value={quantity}
        onChange={(value) => setQuantity(value)}
        style={{ marginLeft: "10px" }}
      />
      <br />
      <br />
      <Button
        type="primary"
        size="large"
        onClick={handlePlaceOrder}
        style={{ width: "100%" }}
        loading={orderLoading}
      >
        Place Order
      </Button>
    </Card>
  );
};

export default Checkout;

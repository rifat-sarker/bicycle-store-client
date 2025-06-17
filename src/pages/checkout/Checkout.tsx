import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Typography, message } from "antd";
import { useCreateOrderMutation } from "../../redux/features/customer/customerOrderApi";

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalPrice, items } = location.state || {};
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  console.log(totalPrice, items);

  const handlePlaceOrder = async () => {
    try {
      const orderItems = items.map((item: any) => ({
        product: item.productId._id,
        quantity: item.quantity,
      }));

      const payload = {
        products: orderItems.map((item) => ({
          product: item.productId._id,
          quantity: item.quantity,
        })),
      };
      
      await createOrder(payload).unwrap();
      message.success("Order placed successfully!");
      navigate("/"); // or navigate to order confirmation page
    } catch (error) {
      console.error(error);
      message.error("Failed to place order");
    }
  };

  if (!items || !totalPrice) {
    return (
      <Card>
        <Title level={4}>No checkout data found.</Title>
        <Button onClick={() => navigate("/cart")}>Go back to cart</Button>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Card title="Confirm Your Order">
        <Text strong>Total: ${totalPrice.toFixed(2)}</Text>
        <div style={{ marginTop: 24 }}>
          <Button
            type="primary"
            block
            loading={isLoading}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutPage;

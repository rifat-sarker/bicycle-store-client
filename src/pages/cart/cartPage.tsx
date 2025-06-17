import { Link} from "react-router-dom";
import {
  Button,
  Divider,
  InputNumber,
  message,
  Row,
  Col,
  Card,
  Space,
  Checkbox,
  Typography,
  Image,
  List,
  Skeleton,
} from "antd";
import {
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useGetCartQuery } from "../../redux/features/cart/cartApi";
import {
  useUpdateCartItemQuantityMutation,
  useToggleSaveCartItemMutation,
  useDeleteCartItemMutation,
} from "../../redux/features/cart/cartApi";
import { TCartItem, TSaveItems } from "../../types";
import { useCreateOrderMutation } from "../../redux/features/customer/customerOrderApi";
import { toast } from "sonner";

const { Title, Text } = Typography;

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const [updateQuantity] = useUpdateCartItemQuantityMutation();
  const [toggleSave] = useToggleSaveCartItemMutation();
  const [deleteItem] = useDeleteCartItemMutation();

  const [
    createOrder,

    { isSuccess, isLoading: orderLoading, data, isError, error },
  ] = useCreateOrderMutation();

  const cartItems: TCartItem[] = Array.isArray(cartData?.data?.cartItems)
    ? cartData.data.cartItems
    : [];

  const savedItems: TSaveItems[] = Array.isArray(cartData?.data?.savedItems)
    ? cartData.data.savedItems
    : [];

  const validCartItems = cartItems.filter((item) => item.productId);
  const activeCartItems = validCartItems.filter((item) => !item.savedForLater);

  const totalPrice = activeCartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    try {
      await updateQuantity({ cartItemId, quantity: newQuantity }).unwrap();
      message.success("Quantity updated");
    } catch (err) {
      message.error("Failed to update quantity");
    }
  };

  const handleToggleSave = async (cartItemId: string) => {
    try {
      await toggleSave(cartItemId).unwrap();
      message.success("Item status updated");
    } catch (err) {
      message.error("Failed to update item status");
    }
  };

  const handleDelete = async (cartItemId: string) => {
    try {
      await deleteItem(cartItemId).unwrap();
      message.success("Item removed");
    } catch (err) {
      message.error("Failed to remove item");
    }
  };

  // This function handles the checkout process
  const handlePlaceOrder = async () => {
    try {
      const orderItems = activeCartItems.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
      }));

      const payload = {
        products: orderItems,
      };

      await createOrder(payload).unwrap();
    } catch (error) {
      console.error(error);
      message.error("Failed to place order");
    }
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
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <Title level={2} style={{ marginBottom: 24 }}>
        Shopping Cart
      </Title>

      <Row gutter={[24, 24]}>
        {/* Cart Items */}
        <Col xs={24} md={18} style={{ width: "100%" }}>
          {isLoading ? (
            <Card>
              <Skeleton active />
            </Card>
          ) : (
            <>
              {activeCartItems.length === 0 ? (
                <Card style={{ textAlign: "center", marginBottom: 24 }}>
                  <Title
                    level={4}
                    type="secondary"
                    style={{ marginBottom: 16 }}
                  >
                    Your Cart is empty
                  </Title>
                  <Link to="/products">
                    <Button type="primary">Shop products</Button>
                  </Link>
                </Card>
              ) : (
                <Card
                  title={`${activeCartItems.length} items in your cart`}
                  style={{ marginBottom: 24 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={activeCartItems}
                    renderItem={(item) => (
                      <List.Item
                        key={item._id}
                        style={{
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: 12,
                        }}
                        actions={[
                          <Space>
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </Button>
                            <Button
                              type="text"
                              icon={
                                item.savedForLater ? (
                                  <HeartFilled />
                                ) : (
                                  <HeartOutlined />
                                )
                              }
                              onClick={() => handleToggleSave(item._id)}
                            >
                              Save for later
                            </Button>
                          </Space>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Image
                              width={120}
                              height={120}
                              src={item.productId.productImg}
                              alt={item.productId.name}
                              style={{ objectFit: "contain" }}
                            />
                          }
                          title={
                            <Link to={`/products/${item.productId._id}`}>
                              {item.productId.name}
                            </Link>
                          }
                          description={
                            <>
                              <Text type="secondary">
                                {item.productId.brand}
                              </Text>
                              <br />
                              <Text
                                type={
                                  item.productId.stock ? "success" : "danger"
                                }
                              >
                                {item.productId.stock
                                  ? "In Stock"
                                  : "Out of Stock"}
                              </Text>
                            </>
                          }
                        />
                        <div style={{ textAlign: "right", minWidth: 120 }}>
                          <div style={{ marginBottom: 16 }}>
                            <Text strong style={{ fontSize: 16 }}>
                              $
                              {(item.productId.price * item.quantity).toFixed(
                                2
                              )}
                            </Text>
                          </div>
                          <Space>
                            <Text>Qty:</Text>
                            <InputNumber
                              min={1}
                              max={item.productId.quantity}
                              value={item.quantity}
                              onChange={(value) =>
                                handleQuantityChange(item._id, value as number)
                              }
                              size="small"
                              disabled={!item.productId.stock}
                            />
                          </Space>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              )}

              {/* Saved for Later */}
              {savedItems.length > 0 && (
                <Card
                  title={`Saved for later (${savedItems.length} items)`}
                  style={{ marginTop: 24 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={savedItems}
                    renderItem={(item) => (
                      <List.Item
                        key={item._id}
                        style={{ flexWrap: "wrap", gap: 12 }}
                        actions={[
                          <Space>
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </Button>
                            <Button
                              type="text"
                              icon={<ShoppingCartOutlined />}
                              onClick={() => handleToggleSave(item._id)}
                            >
                              Move to cart
                            </Button>
                          </Space>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Image
                              width={80}
                              height={80}
                              src={item.productId.productImg}
                              alt={item.productId.name}
                              style={{ objectFit: "contain" }}
                            />
                          }
                          title={
                            <Link to={`/products/${item.productId._id}`}>
                              {item.productId.name}
                            </Link>
                          }
                          description={
                            <>
                              <Text type="secondary">
                                {item.productId.brand}
                              </Text>
                              <br />
                              <Text strong style={{ fontSize: 16 }}>
                                ${item.productId.price.toFixed(2)}
                              </Text>
                            </>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              )}
            </>
          )}
        </Col>

        {/* Order Summary */}
        <Col xs={24} md={6} style={{ width: "100%" }}>
          <Card
            title="Order Summary"
            style={{
              position: "sticky",
              top: 120,
              width: "100%",
            }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text type="success">
                <GiftOutlined /> Your order qualifies for FREE Shipping
              </Text>
              <Divider />
              <Text style={{ textAlign: "right" }}>
                Subtotal ({activeCartItems.length} items):{" "}
                <Text strong>${totalPrice.toFixed(2)}</Text>
              </Text>
              <Checkbox>This order contains a gift</Checkbox>

              <Button
                type="primary"
                block
                style={{
                  backgroundColor: "#f59e0b",
                  color: "#000",
                  fontWeight: 500,
                  marginTop: 12,
                }}
                disabled={activeCartItems.length === 0}
                onClick={handlePlaceOrder}
                loading={orderLoading}
              >
                Proceed to checkout
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;

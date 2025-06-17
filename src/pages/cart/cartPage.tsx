import { Link } from "react-router-dom";
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

const { Title, Text } = Typography;

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const [updateQuantity] = useUpdateCartItemQuantityMutation();
  const [toggleSave] = useToggleSaveCartItemMutation();
  const [deleteItem] = useDeleteCartItemMutation();

  // console.log(cartData);

  const cartItems: TCartItem[] = Array.isArray(cartData?.data?.cartItems)
    ? cartData.data.cartItems
    : [];

  console.log(cartItems);

  const saveItems: TSaveItems = Array.isArray(cartData?.data?.saveItems)
    ? cartData.data.saveItems
    : [];
  console.log(saveItems);

  const validCartItems = cartItems.filter((item) => item.productId);

  // Separate items into active cart and saved for later
  const activeCartItems = validCartItems.filter((item) => !item.savedForLater);
  const savedForLaterItems = ""

  console.log(savedForLaterItems);

  // Correct price calculation using productId.price
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
      message.success(
        savedForLaterItems.some((item) => item._id === cartItemId)
          ? "Item moved to cart"
          : "Item saved for later"
      );
    } catch (err) {
      message.error("Failed to update item status");
    }
  };

  const handleDelete = async (cartItemId: string) => {
    try {
      await deleteItem(cartItemId).unwrap();
      message.success("Item removed from cart");
    } catch (err) {
      message.error("Failed to remove item");
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Shopping Cart
      </Title>

      <Row gutter={24}>
        {/* Left: Cart Items (80% width) */}
        <Col xs={24} md={18}>
          {isLoading ? (
            <Card>
              <Skeleton active />
            </Card>
          ) : activeCartItems.length === 0 ? (
            <Card style={{ textAlign: "center" }}>
              <Title level={4} type="secondary" style={{ marginBottom: 16 }}>
                Your Cart is empty
              </Title>
              <Link to="/products">
                <Button type="primary">Shop products</Button>
              </Link>
            </Card>
          ) : (
            <>
              {/* Active Cart Items */}
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
                            <Text type="secondary">{item.productId.brand}</Text>
                            <br />
                            <Text
                              type={item.productId.stock ? "success" : "danger"}
                            >
                              {item.productId.stock
                                ? "In Stock"
                                : "Out of Stock"}
                            </Text>
                          </>
                        }
                      />
                      <div style={{ textAlign: "right" }}>
                        <div style={{ marginBottom: 16 }}>
                          <Text strong style={{ fontSize: 16 }}>
                            ${(item.productId.price * item.quantity).toFixed(2)}
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

              {/* Saved for Later Section - Below Cart Items */}
              {savedForLaterItems.length > 0 && (
                <Card
                  title={`Saved for later (${savedForLaterItems.length} items)`}
                  style={{ marginTop: 24 }}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={savedForLaterItems}
                    renderItem={(item) => (
                      <List.Item
                        key={item._id}
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

        {/* Right: Checkout Summary (20% width) */}
        <Col xs={24} md={6}>
          <Card title="Order Summary" style={{ position: "sticky", top: 24 }}>
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
              <Link to="/checkout">
                <Button
                  type="primary"
                  block
                  style={{
                    backgroundColor: "#FFD814",
                    borderColor: "#FCD200",
                    color: "#0F1111",
                    fontWeight: 500,
                  }}
                  disabled={activeCartItems.length === 0}
                >
                  Proceed to checkout
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;

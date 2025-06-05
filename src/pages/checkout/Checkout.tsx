import { Drawer, Button, Divider, InputNumber, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/features/cart/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: string, value: number) => {
    dispatch(updateQuantity({ productId, quantity: value }));
  };

  const handleRemove = (id: string) => dispatch(removeFromCart(id));
  const handleClear = () => dispatch(clearCart());

  return (
    <>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => setOpen(true)}
      >
        Cart ({cartItems.length})
      </Button>
      <Drawer
        title="Your Cart"
        placement="right"
        closable
        onClose={() => setOpen(false)}
        open={open}
        width={400}
      >
        {cartItems.length === 0 ? (
          <Empty description="Cart is empty" />
        ) : (
          <>
            <div
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
                paddingRight: 8,
              }}
            >
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    marginBottom: "16px",
                    borderBottom: "1px solid #f0f0f0",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={item.productImg}
                    alt={item.name}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      marginRight: 16,
                      borderRadius: 8,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ fontWeight: "bold", color: "#1677ff" }}
                    >
                      {item.name}
                    </Link>
                    <p style={{ margin: "4px 0" }}>${item.price}</p>
                    <InputNumber
                      min={1}
                      max={item.availableQty}
                      value={item.quantity}
                      onChange={(value) =>
                        handleQuantityChange(item._id, value ?? 1)
                      }
                      style={{ width: 100 }}
                    />
                    {item.availableQty <= 10 && (
                      <p
                        style={{ fontSize: 12, color: "#fa8c16", marginTop: 4 }}
                      >
                        Only {item.availableQty} left
                      </p>
                    )}
                    <Button
                      type="link"
                      danger
                      onClick={() => handleRemove(item._id)}
                      style={{ paddingLeft: 0 }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Footer */}
            <div
              style={{
                position: "sticky",
                bottom: 0,
                background: "#fff",
                paddingTop: 12,
                paddingBottom: 16,
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <strong>Total:</strong>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={handleClear} danger block>
                  Clear Cart
                </Button>
                <Link to="/checkout" style={{ flex: 1 }}>
                  <Button type="primary" block>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Cart;

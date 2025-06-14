import { useSelector } from "react-redux";

import { Button, Divider, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  moveToCartFromSaved,
  removeFromCart,
  saveForLater,
} from "../../redux/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const savedItems = useSelector((state: any) => state.cart.saved);

  const cartItems = useAppSelector((state) => state.cart.items || []);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems?.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 border-b py-4">
              <img
                src={item.productImg}
                alt={item.name}
                className="w-28 h-28 object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                {/* <p className="text-sm text-gray-500">Style: {item.style}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p> */}
                <div className="flex items-center gap-2 mt-2">
                  <Button onClick={() => dispatch(decreaseQuantity(item._id))}>
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button onClick={() => dispatch(increaseQuantity(item._id))}>
                    +
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <Button
                    type="link"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Delete
                  </Button>
                  <Button
                    type="link"
                    onClick={() => dispatch(saveForLater(item._id))}
                  >
                    Save for later
                  </Button>
                </div>
              </div>
              <div className="text-lg font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}

        {/* Saved for Later Section */}
        {savedItems?.length > 0 && (
          <>
            <Divider />
            <h3 className="text-xl font-semibold mt-6 mb-4">Saved for later</h3>
            {savedItems.map((item: any) => (
              <div key={item._id} className="flex gap-4 border-b py-4">
                <img
                  src={item.productImg}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <Button
                    type="link"
                    onClick={() => dispatch(moveToCartFromSaved(item))}
                  >
                    Move to cart
                  </Button>
                </div>
                <div className="text-base font-bold">${item.price}</div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 border p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">
          Subtotal ({cartItems.length} items): ${subtotal.toFixed(2)}
        </h3>
        <Checkbox>This order contains a gift</Checkbox>
        <Button type="primary" block className="mt-4">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
}

import { Button, Divider, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  moveToCartFromSaved,
  removeFromCart,
  saveForLater,
  removeFromSaved,
} from "../../redux/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items || []);
  const savedItems = useAppSelector((state) => state.cart.savedItems || []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b py-4"
              >
                <img
                  src={item.productImg}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      size="small"
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                    >
                      -
                    </Button>
                    <span className="px-2">{item.quantity}</span>
                    <Button
                      size="small"
                      onClick={() => dispatch(increaseQuantity(item._id))}
                    >
                      +
                    </Button>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 space-x-2">
                    <Button
                      type="link"
                      size="small"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Delete
                    </Button>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => dispatch(saveForLater(item._id))}
                    >
                      Save for later
                    </Button>
                  </div>
                </div>
                <div className="text-base font-semibold text-right min-w-[60px]">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))
          )}

          {/* Saved for Later Section */}
          {savedItems.length > 0 && (
            <>
              <Divider className="my-6" />
              <h3 className="text-lg font-semibold">Saved for Later</h3>
              {savedItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b py-4"
                >
                  <img
                    src={item.productImg}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="mt-2 text-sm text-gray-600 space-x-2">
                      <Button
                        type="link"
                        size="small"
                        onClick={() => dispatch(moveToCartFromSaved(item._id))}
                      >
                        Move to cart
                      </Button>
                      <Button
                        type="link"
                        size="small"
                        onClick={() => dispatch(removeFromSaved(item._id))}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-right min-w-[60px]">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:w-[350px] fixed top-16 right-4 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-base font-semibold mb-2">
            Subtotal ({cartItems.length} item
            {cartItems.length !== 1 && "s"}):
          </h3>
          <p className="text-xl font-bold text-orange-600 mb-3">
            ${subtotal.toFixed(2)}
          </p>
          <Checkbox className="text-sm mb-4">
            This order contains a gift
          </Checkbox>
          <Button type="primary" block className="mt-4 w-full">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

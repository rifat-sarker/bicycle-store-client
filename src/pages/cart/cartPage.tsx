"use client";

import { toast } from "sonner";
import { Button, Spin } from "antd";
import {
  useDeleteCartItemMutation,
  useGetCartQuery,
  useToggleSaveCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from "../../redux/features/cart/cartApi";

export default function CartPage() {
  const { data: cart, isLoading, isError } = useGetCartQuery({});
  const [updateQuantity, { isLoading: isUpdating }] =
    useUpdateCartItemQuantityMutation();
  const [deleteItem, { isLoading: isDeleting }] = useDeleteCartItemMutation();
  const [toggleSave, { isLoading: isSaving }] = useToggleSaveCartItemMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Spin size="large" />
      </div>
    );
  if (isError || !cart)
    return <p className="text-red-500 text-center">Failed to load cart.</p>;

  const cartItems = cart.data.cartItems || [];
  const savedItems = cart.data.savedItems || [];

  console.log(cartItems,"rifat");
  // Fix NaN issue
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Section: Cart + Saved Items */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">My Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => {
              const product = item.productId;
              console.log(product);
              const price = product?.price || 0;
              const image = product?.productImg || "https://via.placeholder.com/100";

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 border rounded-md shadow-sm"
                >
                  <img
                    src={image}
                    alt={product?.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{product?.name}</h2>
                    <p className="text-sm text-gray-600">
                      ${price} × {item.quantity} = ${price * item.quantity}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="small"
                        onClick={() =>
                          updateQuantity({
                            cartItemId: item._id,
                            quantity: item.quantity + 1,
                          })
                        }
                        disabled={isUpdating}
                      >
                        +
                      </Button>
                      <Button
                        size="small"
                        onClick={() =>
                          item.quantity > 1 &&
                          updateQuantity({
                            cartItemId: item._id,
                            quantity: item.quantity - 1,
                          })
                        }
                        disabled={isUpdating || item.quantity <= 1}
                      >
                        -
                      </Button>
                      <Button
                        danger
                        size="small"
                        onClick={() => deleteItem(item._id)}
                        loading={isDeleting}
                      >
                        Remove
                      </Button>
                      <Button
                        size="small"
                        onClick={() => toggleSave(item._id)}
                        loading={isSaving}
                      >
                        Save for Later
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Saved Items */}
        {savedItems.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Saved for Later</h2>
            {savedItems.map((item) => {
              const product = item.product;
              const price = product?.price || 0;
              const image = product?.image || "https://via.placeholder.com/100";

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 border rounded-md shadow-sm"
                >
                  <img
                    src={image}
                    alt={product?.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{product?.name}</h2>
                    <p className="text-sm text-gray-600">${price}</p>
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="small"
                        onClick={() => toggleSave(item._id)}
                        loading={isSaving}
                      >
                        Move to Cart
                      </Button>
                      <Button
                        danger
                        size="small"
                        onClick={() => deleteItem(item._id)}
                        loading={isDeleting}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Section: Checkout Box */}
      <div className="border rounded-lg shadow-md p-6 h-fit sticky top-24 bg-white">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex justify-between font-medium text-lg">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Button
          type="primary"
          className="mt-6 w-full"
          size="large"
          disabled={cartItems.length === 0}
          onClick={() => toast.success("Proceeding to checkout...")}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

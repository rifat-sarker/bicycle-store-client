import { Link } from "react-router-dom";
import { useGetCartQuery } from "../../redux/features/cart/cartApi";
import { TCartItem } from "../../types";

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);

  console.log(cartData);

  const cartItems: TCartItem[] = Array.isArray(cartData?.data?.cartItems)
    ? cartData.data.cartItems
    : [];

    // console.log(cartData?.data?.cartItems);
    console.log(cartItems);


  const validCartItems = cartItems.filter((item) => item.product); // ✅ Filter items with missing product

  const totalPrice = validCartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  console.log(totalPrice);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Cart Items */}
        <div className="flex-1 md:w-4/5 space-y-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : validCartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            validCartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] border">
                  <img
                    src={item.product.productImg}
                    alt={item.product.name}
                    className="w-full h-full object-contain rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.product.category} | Brand: {item.product.brand}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Model: {item.product.model}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-green-700 text-base">
                      ${item.product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary Section */}
        <div className="md:w-1/5 w-full">
          <div className="p-4 border rounded-lg shadow-md bg-white sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <p className="text-base">
              Items:{" "}
              <span className="font-semibold">{validCartItems.length}</span>
            </p>
            <p className="text-base mt-2">
              Total:{" "}
              <span className="text-green-700 font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
            <Link to="/checkout">
              <button className="mt-6 w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAddOrUpdateCartMutation } from "../redux/features/cart/cartApi";
import { useAppSelector } from "../redux/hooks";
import { TProduct } from "../types";

export const useAddToCartHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [addOrUpdateCart] = useAddOrUpdateCartMutation();
  const { user } = useAppSelector((state) => state.auth);

  const handleAddToCart = (product: TProduct | undefined) => {
    if (!product) return;

    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      productImg: product.productImg,
      availableQty: product.quantity,
      productId: product._id,
    };

    if (!user) {
      toast.error("Please login to add items to cart");
      navigate(`/login?redirect=${location.pathname}`);
      return;
    }

    addOrUpdateCart(cartItem);
    toast.success("Added to cart");
  };

  return { handleAddToCart };
};

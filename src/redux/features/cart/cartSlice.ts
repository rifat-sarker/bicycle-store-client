import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  productImg: string;
  quantity: number; // in cart
  availableQty: number; // actual product stock
}

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
}

const initialState: CartState = {
  items: [],
  savedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableQty) {
          existingItem.quantity += 1;
          // toast.info("Increased quantity in cart");
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        toast.success("Added to cart");
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      // toast.success("Removed from cart");
    },

    clearCart: (state) => {
      state.items = [];
      // toast.info("Cart cleared");
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i._id === action.payload.productId);
      if (!item) return;

      const newQty = action.payload.quantity;
      if (newQty > 0 && newQty <= item.availableQty) {
        item.quantity = newQty;
        // toast.info("Quantity updated");
      }
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity < item.availableQty) {
        item.quantity += 1;
        // toast.info("Increased quantity");
      }
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        // toast.info("Decreased quantity");
      }
    },

    // Save for later (remove from cart, add to saved)
    saveForLater: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        const [item] = state.items.splice(itemIndex, 1);
        state.savedItems.push(item);
        toast.info("Saved for later");
      }
    },

    // Move from savedItems to cart
    moveToCartFromSaved: (state, action: PayloadAction<string>) => {
      const itemIndex = state.savedItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        const [item] = state.savedItems.splice(itemIndex, 1);
        const existingCartItem = state.items.find(
          (cartItem) => cartItem._id === item._id
        );
        if (existingCartItem) {
          if (existingCartItem.quantity < existingCartItem.availableQty) {
            existingCartItem.quantity += 1;
          }
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
        toast.success("Moved to cart");
      }
    },

    // Remove item from savedItems
    removeFromSaved: (state, action: PayloadAction<string>) => {
      state.savedItems = state.savedItems.filter(
        (item) => item._id !== action.payload
      );
      toast.info("Removed from saved items");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  saveForLater,
  moveToCartFromSaved,
  removeFromSaved,
} = cartSlice.actions;

export default cartSlice.reducer;

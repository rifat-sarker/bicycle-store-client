import React from 'react';
import { useAddOrUpdateCartMutation } from './redux/features/cart/cartApi';
import { useGetProductByIdQuery } from './redux/features/admin/productManagementApi';
import { toast } from 'sonner';

const AddToCart = () => {

      const { data: product, isLoading } = useGetProductByIdQuery(id as string);
      const [addOrUpdateCart, { isLoading: isAdding }] =
        useAddOrUpdateCartMutation();
    
      const productData = product?.data;
    


     const handleAddToCart = () => {
        if (!productData) return;
        // Map productData to CartItem shape
        const cartItem = {
          _id: productData._id,
          name: productData.name,
          price: productData.price,
          productImg: productData.productImg,
          availableQty: productData.quantity,
          productId: productData._id,
        };
        addOrUpdateCart(cartItem);
        toast.success("Added to cart");
      };
    
    return (
        <div>
            
        </div>
    );
};

export default AddToCart;
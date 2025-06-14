import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"], 
    }),

    addOrUpdateCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/cart",
        method: "POST",
        body: cartInfo,
      }),
      invalidatesTags: ["Cart"], 
    }),

    updateCartItemQuantity: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `/cart/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    toggleSaveCartItem: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/save/${cartItemId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddOrUpdateCartMutation,
  useUpdateCartItemQuantityMutation,
  useToggleSaveCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;

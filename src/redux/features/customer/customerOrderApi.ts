import { baseApi } from "../../api/baseApi";

const customerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/orders/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useVerifyOrderQuery,
} = customerOrderApi;

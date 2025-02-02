import { baseApi } from "../../api/baseApi";

const customerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = customerOrderApi;

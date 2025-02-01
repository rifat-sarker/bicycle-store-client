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
  }),
});

export const { useGetAllOrdersQuery, useDeleteOrderMutation } = customerOrderApi;

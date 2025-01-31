import { baseApi } from "../../api/baseApi";

const customerOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = customerOrderApi;

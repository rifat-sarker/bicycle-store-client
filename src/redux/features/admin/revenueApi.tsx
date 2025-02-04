import { baseApi } from "../../api/baseApi";

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    revenue: builder.query({
      query: () => ({
        url: "/orders/revenue",
        method: "GET",
      }),
    }),
  }),
});

export const { useRevenueQuery } = revenueApi;

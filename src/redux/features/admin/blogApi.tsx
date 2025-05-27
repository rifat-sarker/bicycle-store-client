import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    blog: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
    }),
  }),
});

export const { useBlogQuery } = blogApi;

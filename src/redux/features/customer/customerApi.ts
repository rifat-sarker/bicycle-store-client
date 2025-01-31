import { baseApi } from "../../api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation, useUpdatePasswordMutation } = customerApi;

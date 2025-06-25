import { ICategory } from "../../../types/category";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { TProduct } from "../../../types/productManagement.type";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductBySlugAndId: builder.query({
      query: (slugAndId: string) => ({
        url: `/products/${slugAndId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TProduct>) => response,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),

    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<ICategory[]>) =>
        response.data ?? [],
    }),

    getProductsByCategorySlug: builder.query({
      query: (slug) => ({
        url: `categories/products/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductBySlugAndIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetCategoriesQuery,
  useGetProductsByCategorySlugQuery,
} = productManagementApi;

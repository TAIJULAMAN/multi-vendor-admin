import { baseApi } from "../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (params) => ({
        url: "category",
        method: "GET",
        params, // e.g., { page: 1, limit: 10 }
      }),
      providesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "category",
        method: "POST",
        body, // expects { name, description }
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body, // expects { name }
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

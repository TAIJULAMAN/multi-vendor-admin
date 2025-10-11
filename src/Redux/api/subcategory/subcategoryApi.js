import { baseApi } from "../baseApi";

export const subcategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategories: builder.query({
      query: ({ categoryId, params } = {}) => ({
        url: `category/${categoryId}/subcategories`,
        method: "GET",
        params, // optional: { page, limit }
      }),
      providesTags: ["subCategory"],
    }),
    createSubCategory: builder.mutation({
      query: (body) => ({
        url: "category/subcategories",
        method: "POST",
        body, // expects { name, parentID }
      }),
      invalidatesTags: ["subCategory", "category"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `category/subcategories/${id}`,
        method: "PATCH",
        body, // expects { name }
      }),
      invalidatesTags: ["subCategory", "category"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `category/subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategory", "category"],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetAllSubCategoriesQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subcategoryApi;

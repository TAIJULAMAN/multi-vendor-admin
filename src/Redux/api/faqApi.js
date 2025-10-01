import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs with optional search/filter
    getAllFaq: builder.query({
      query: (params) => ({
        url: "faq/findB_by_all_faq",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),

    // Get specific FAQ by ID
    getFaqById: builder.query({
      query: (_id) => ({
        url: `faq/find_by_specific_faq/${_id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    // Create new FAQ
    createFaq: builder.mutation({
      query: (data) => ({
        url: "faq/create_faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    // Update existing FAQ
    updateFaq: builder.mutation({
      query: ({ _id, data }) => ({
        url: `faq/update_faq/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    // Delete FAQ
    deleteFaq: builder.mutation({
      query: (_id) => ({
        url: `faq/delete_faq/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useGetFaqByIdQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;

export default faqApi;
import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs
    getAllFaq: builder.query({
      query: (params) => ({
        url: "faqs",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),

    // Get specific FAQ by ID
    getFaqById: builder.query({
      query: (_id) => ({
        url: `faqs/${_id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),

    // Create new FAQ
    createFaq: builder.mutation({
      query: (data) => ({
        url: "faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    // Update existing FAQ
    updateFaq: builder.mutation({
      query: ({ _id, data }) => ({
        url: `faqs/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    // Delete FAQ
    deleteFaq: builder.mutation({
      query: (_id) => ({
        url: `faqs/${_id}`,
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
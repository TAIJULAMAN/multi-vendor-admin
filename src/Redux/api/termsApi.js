import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "terms",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    createTerms: builder.mutation({
      query: ({ content }) => ({
        url: "terms",
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
});

export const { useGetTermsAndConditionsQuery, useCreateTermsMutation } =
  termsAndConditionsApi;

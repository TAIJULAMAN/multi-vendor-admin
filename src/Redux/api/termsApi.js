import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getTermsAndConditions: builder.query({
                              query: () => ({
                                        url: 'setting/find_by_terms_conditions',
                                        method: 'GET',
                              }),
                              providesTags: ['termsAndConditions'],
                    }),
                    updateTermsAndConditions: builder.mutation({
                              query: ({ requestData }) => ({
                                        url: 'setting/terms_conditions',
                                        method: 'POST',
                                        body: requestData,
                              }),
                              invalidatesTags: ['termsAndConditions'],
                    }),
          }),
});

export const {
      useGetTermsAndConditionsQuery,
      useUpdateTermsAndConditionsMutation
} = termsAndConditionsApi;
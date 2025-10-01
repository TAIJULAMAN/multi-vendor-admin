import { baseApi } from "./baseApi";

const aboutUsApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAboutUs: builder.query({
                              query: () => ({
                                        url: 'setting/find_by_about_us',
                                        method: 'GET',
                              }),
                              providesTags: ['aboutUs'],
                    }),
                    updateAboutUs: builder.mutation({
                              query: ({ requestData }) => ({
                                        url: 'setting/about',
                                        method: 'POST',
                                        body: requestData,
                              }),
                              invalidatesTags: ['aboutUs'],
                    }),
          }),
});

export const {
      useGetAboutUsQuery,
      useUpdateAboutUsMutation
} = aboutUsApi;
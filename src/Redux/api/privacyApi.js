import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "privacy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    createPrivacy: builder.mutation({
      query: ({ content }) => ({
        url: "privacy",
        method: "POST",
        body: { content },
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useCreatePrivacyMutation } = privacyApi;

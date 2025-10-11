import { baseApi } from "../baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChat: builder.query({
      query: () => ({
        url: `/chat`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    getMessageOfChat: builder.query({
      query: (chatId) => ({
        url: `/chat/${chatId}/messages`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),
    startChat: builder.mutation({
      query: (data) => ({
        url: `/chat/start`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetChatQuery,
  useGetMessageOfChatQuery,
  useStartChatMutation,
} = chatApi;

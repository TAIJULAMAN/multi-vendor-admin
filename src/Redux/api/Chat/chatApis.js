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
      transformResponse: (response) => {
        return response?.data?.reverse();
      },
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
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/chat/message`,
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
  useSendMessageMutation,
} = chatApi;

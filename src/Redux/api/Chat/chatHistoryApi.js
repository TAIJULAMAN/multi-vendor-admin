import { baseApi } from "../baseApi";

const chatHistoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChannelChatHistory: builder.query({ //getting all my channels
            query: () => `channel/my_channel`,
            providesTags: ['ChannelChatHistory'],
        }),

        

        channelChatDetails: builder.query({
  query: ([channelName, page = 1, limit = 20]) => 
    `message/plate_ways_chat_history/${channelName}?page=${page}&limit=${limit}`,
  providesTags: ['ChannelChatDetails'],
}),




        handleImgMSG: builder.mutation({
            query: (formData) => ({
                url: `message/send_message`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['ChannelChatDetails'],
        }),

        handleDeleteMSG: builder.mutation({
          query: (messageId) => ({
              url: `message/delete_message/${messageId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['ChannelChatDetails'],
        }),
    }),
});

export const { useGetChannelChatHistoryQuery , useChannelChatDetailsQuery, useHandleImgMSGMutation, useHandleDeleteMSGMutation } = chatHistoryApi;
export default chatHistoryApi;
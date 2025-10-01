import { baseApi } from "../baseApi";

const createChatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: ({ id, formData }) => ({
        url: `message/send-message/${id}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateMessageMutation } = createChatApi;
export default createChatApi;

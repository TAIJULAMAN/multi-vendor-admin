import { baseApi } from "../baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelpRequest: builder.query({
      query: (params) => ({
        url: "help-center",
        method: "GET",
        params,
      }),
      providesTags: ["support"],
    }),
    sendReplyOfHelpRequest: builder.mutation({
      query: ({ id, message }) => ({
        url: `help-center/${id}/reply`,
        method: "PATCH",
        body: { message },
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const { useGetAllHelpRequestQuery, useSendReplyOfHelpRequestMutation } =
  supportApi;

export default supportApi;

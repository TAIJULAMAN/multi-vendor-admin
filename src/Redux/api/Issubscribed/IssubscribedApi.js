import { baseApi } from "../baseApi";


const Issubscribed = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    issubscribed: builder.mutation({
      query: ({id}) => ({
        url: `current_subscribed_buyer/checked_subscribed_buyer/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useIssubscribedMutation } = Issubscribed;
export default Issubscribed;

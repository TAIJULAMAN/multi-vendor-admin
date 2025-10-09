import { baseApi } from "../baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs
    getAllNotification: builder.query({
      query: (params) => ({
        url: "notifications",
        method: "GET",
        params,
      }),
      providesTags: ["notification"],
    }),
    // Mark a single notification as read (no body)
    updateNotification: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetAllNotificationQuery, useUpdateNotificationMutation } =
  notificationApi;

export default notificationApi;

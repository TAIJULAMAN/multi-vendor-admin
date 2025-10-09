import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProfile: builder.query({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "user/me",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),
    changeAdminPassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "auth/change-password",
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;

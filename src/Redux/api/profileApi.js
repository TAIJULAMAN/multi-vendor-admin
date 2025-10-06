import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `auth/myprofile`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    getAdminProfile: builder.query({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "auth/update_my_profile",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["auth"],
    }),
    changeAdminPassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "auth/change-password",
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;

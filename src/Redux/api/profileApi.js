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
      query: (data) => ({
        url: "user/change_password",
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;

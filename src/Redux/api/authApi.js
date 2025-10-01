import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "user/create_user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getMyProfile: builder.query({
      query: (token) => ({
        url: "auth/myprofile",
        method: "GET",
        headers: { Authorization: token },
      }),
      providesTags: ["auth"],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "user/verification_forgot_user",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ userId, password }) => {
        const token = localStorage.getItem("accessToken");
        return {
          url: "user/reset_password",
          method: "POST",
          body: { userId, password },
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["User"],
    }),

    userVarification: builder.mutation({
      query: (data) => ({
        url: "user/user_verification",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLogInMutation,
  useCreateUserMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useGetMyProfileQuery,
  useUserVarificationMutation,
} = authApi;

export default authApi;

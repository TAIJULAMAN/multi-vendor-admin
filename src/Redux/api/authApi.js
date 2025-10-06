import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {},
      invalidatesTags: ["admin"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({}),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({}),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({}),

      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;

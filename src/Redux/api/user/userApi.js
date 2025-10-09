import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "user/admin/users",
        method: "GET",
        params, // e.g., { page: 1, limit: 10, search: "" }
      }),
      
      providesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `user/admin/users/${id}/block`,
        method: "PATCH",
        body: { isBlocked },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = userApi;

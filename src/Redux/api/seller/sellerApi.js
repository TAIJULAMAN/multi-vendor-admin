import { baseApi } from "../baseApi";

export const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSellers: builder.query({
      query: (params) => ({
        url: "user/sellers/all",
        method: "GET",
        params, // e.g., { page: 1, limit: 10 }
      }),

      providesTags: ["seller"],
    }),
    blockSeller: builder.mutation({
      query: ({ id, isBlocked }) => ({
        url: `user/admin/users/${id}/block`,
        method: "PATCH",
        body: { isBlocked },
      }),
      invalidatesTags: ["seller"],
    }),
    approveSeller: builder.mutation({
      // Approves a seller account by userId
      query: (userId) => ({
        url: `admin/sellers/approve/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["seller"],
    }),
    updateSellerProfile: builder.mutation({
      // Admin updates seller by user ID
      query: (userId) => ({
        url: `admin/sellers/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["seller"],
    }),
  }),
});

export const {
  useGetAllSellersQuery,
  useBlockSellerMutation,
  useApproveSellerMutation,
} = sellerApi;

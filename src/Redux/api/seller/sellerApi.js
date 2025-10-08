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
      // Updates the current seller's profile
      // Pass the full payload as 'body' (JSON or FormData depending on backend)
      query: (body) => ({
        url: `user/seller/profile`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["seller"],
    }),
  }),
});

export const {
  useGetAllSellersQuery,
  useBlockSellerMutation,
  useApproveSellerMutation,
  useUpdateSellerProfileMutation,
} = sellerApi;

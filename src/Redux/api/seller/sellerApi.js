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
  }),
});

export const { useGetAllSellersQuery, useBlockSellerMutation } = sellerApi;

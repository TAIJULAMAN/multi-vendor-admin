import { baseApi } from "../baseApi";

export const adsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create ad (supports FormData for file upload)
    createAds: builder.mutation({
      query: (formData) => ({
        url: "ads",
        method: "POST",
        body: formData, // should be FormData, not JSON
      }),
      invalidatesTags: ["ads"],
    }),

    // Get all ads
    getAllAds: builder.query({
      query: (params) => ({
        url: "ads",
        method: "GET",
        params,
      }),
      providesTags: ["ads"],
    }),
    // Update ad (PUT multipart/form-data)
    updateAds: builder.mutation({
      query: ({ id, formData }) => ({
        url: `ads/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ads"],
    }),

    // Delete ad
    deleteAds: builder.mutation({
      query: (id) => ({
        url: `ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ads"],
    }),
  }),
});

export const {
  useCreateAdsMutation,
  useGetAllAdsQuery,
  useUpdateAdsMutation,
  useDeleteAdsMutation,
} = adsApi;

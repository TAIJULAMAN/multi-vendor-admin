import { baseApi } from "../baseApi";

const myAdvertsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAdverts: builder.query({
      query: () => ({
        url: `plates_sales/myAdverts`,
        method: "GET",
      }),
      providesTags: ["plates"],
    }),
  getMyAdvertStatistics: builder.query({
      query: (id) => ({
        url: `plates_sales/find_by_statistics/${id}`, // dynamic id
        method: "GET",
      }),
      providesTags: ["plates"],
    }),
    deleteAdvert: builder.mutation({
      query: (advertId) => ({
        url: `plates_sales/delete_plate_sales/${advertId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plates"],
    }),
    updateAdvert: builder.mutation({
      query: ({ advertId, data }) => {
        console.log("🔎 UpdateAdvert called with:", { advertId, data });
        return {
          url: `plates_sales/update_plate_sales/${advertId}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["plates"],
    }),
    addAdvert: builder.mutation({
      query: (formData) => {
        console.log("📝 addAdvert called with:", formData); // <-- log here
        return {
          url: "plates_sales/create_plates_sales",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["plates"],
    }),
  }),
});

export const {
  useGetMyAdvertsQuery,
  useGetMyAdvertStatisticsQuery,
  useDeleteAdvertMutation,
  useUpdateAdvertMutation,
  useAddAdvertMutation,
} = myAdvertsApi;

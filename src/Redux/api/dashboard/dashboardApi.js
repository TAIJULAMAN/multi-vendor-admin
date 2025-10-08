import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard/user-seller-totals",
        method: "GET",
        params, // e.g., { page: 1, limit: 10 }
      }),
      providesTags: ["dashboard"],
    }),
    
  }),
});

export const {
  useGetAllDashboardQuery,
} = dashboardApi;

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
    getSalesOverview: builder.query({
      query: ({ year } = {}) => ({
        url: "dashboard/sales-overview",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    
  }),
});

export const {
  useGetAllDashboardQuery,
  useGetSalesOverviewQuery,
} = dashboardApi;

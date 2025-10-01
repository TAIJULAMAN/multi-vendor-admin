import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: "subscription/find_all_buyer_subscription",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
    getSpecificSubscription: builder.query({
      query: () => ({
        url: "subscription/findB_by_specific_subscription/68a3a0495f80907c52164597",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export const { useGetAllSubscriptionQuery, useGetSpecificSubscriptionQuery } =
  subscriptionApi;

export default subscriptionApi;

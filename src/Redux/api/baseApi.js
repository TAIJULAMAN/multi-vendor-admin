import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const token = state?.auth?.token;
      // console.log("token from base api", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "dashboard",
    "user",
    "seller",
    "category",
    "privacy",
    "termsAndConditions",
    "subCategory",
    "profile",
    "support",
    "notification",
    "ads",
    "faq",
  ],
});

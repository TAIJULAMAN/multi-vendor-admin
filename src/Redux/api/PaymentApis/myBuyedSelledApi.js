// Endpoint: payment_gateway/create-plates-valued-checkout-session

import { baseApi } from "../baseApi";

const myBuyedSelledApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMyBuyPlates: builder.query({
            query: () => ({
                url: "payment_gateway/all_my_buy_plates",
                method: "GET",
            }),
        }),
        getAllMySelledPlates: builder.query({
            query: () => ({
                url: "payment_gateway/all_my_selling_plates",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllMyBuyPlatesQuery, useGetAllMySelledPlatesQuery } = myBuyedSelledApi;
export default myBuyedSelledApi;

// Endpoint: payment_gateway/create-plates-valued-checkout-session

import { baseApi } from "../baseApi";

const createCheckoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutForValued: builder.mutation({
            query: (data) => ({
                url: "payment_gateway/create-plates-valued-checkout-session",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreateCheckoutForValuedMutation } = createCheckoutApi;
export default createCheckoutApi;

import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBuyerSellerCheckoutSession: builder.mutation({
            query: (data) => ({
                url: "payment_gateway/create-buyer-seller-checkout-session",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useCreateBuyerSellerCheckoutSessionMutation } = paymentApi;
export default paymentApi;

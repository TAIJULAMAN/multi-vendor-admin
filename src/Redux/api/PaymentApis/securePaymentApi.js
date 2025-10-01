import { baseApi } from "../baseApi";


const securePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentSecure: builder.mutation({
      query: () => ({
        url: "payment_gateway/create-onboarding-link",
        method: "POST",
      }),
    }),
  }),
});

export const { useCreatePaymentSecureMutation } = securePaymentApi;
export default securePaymentApi;

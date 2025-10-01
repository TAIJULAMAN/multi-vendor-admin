import { baseApi } from "../baseApi";

const myBuyedPlatesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMyBuyedPlates: builder.query({
            query: ({ page, limit }) => ({
                url: `payment_gateway/all_my_buy_plates?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['listedPlates'],
        }),
    }),
});

export const {
    useGetAllMyBuyedPlatesQuery,
} = myBuyedPlatesApi;

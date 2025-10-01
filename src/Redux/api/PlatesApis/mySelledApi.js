import { baseApi } from "../baseApi";

const mySellingPlatesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMySellingPlates: builder.query({
            query: ({ page, limit }) => ({
                url: `payment_gateway/all_my_selling_plates?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
            providesTags: ['listedPlates'],
        }),
    }),
});

export const {
    useGetAllMySellingPlatesQuery,
} = mySellingPlatesApi;

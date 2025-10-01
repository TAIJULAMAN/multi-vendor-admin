import { baseApi } from "../baseApi";

const singlePlateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSinglePlate: builder.query({
            query: (plateId) => ({
                url: `plates_sales/find_by_specific_number_plate/${plateId}`,
                method: 'GET',
            }),
            providesTags: ['singlePlate'],
        }),
        getSimilarPlates: builder.query({
            query: (plateId) => ({
                url: `plates_sales/find_by_similer_plate/${plateId}`,
                method: 'GET',
            }),
            providesTags: ['similarPlates'],
        }),
    }),
});

export const {
    useGetSinglePlateQuery,
    useGetSimilarPlatesQuery,
} = singlePlateApi;

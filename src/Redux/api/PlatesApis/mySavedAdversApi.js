import { baseApi } from "../baseApi";

const mySavedPlatesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMySavedPlates: builder.query({
            query: () => ({
                url: `plates_sales/my_save_plate_sales`,
                method: 'GET',
            }),
            providesTags: ['savedPlates'],
        }),
        addToSavedPlates: builder.mutation({
            query: (plateId) => ({
                url: `plates_sales/save_plate_sales/${plateId}`,
                method: 'GET',
            }),
            invalidatesTags: ['savedPlates'],
        }),
        removeFromSavedPlates: builder.mutation({
            query: (plateId) => ({
                url: `plates_sales/delete_save_plates/${plateId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['savedPlates'],
        }),
    }),
});

export const {
    useGetMySavedPlatesQuery,
    useAddToSavedPlatesMutation,
    useRemoveFromSavedPlatesMutation,
} = mySavedPlatesApi;

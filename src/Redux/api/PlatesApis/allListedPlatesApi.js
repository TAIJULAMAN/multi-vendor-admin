import { baseApi } from "../baseApi";


const allPlatesApi = baseApi.injectEndpoints({
          endpoints: (builder) => ({
                    getAllPlates: builder.query({
                              query: ({page, limit, searchTerm}) => ({
                                        url: `plates_sales/find_by_all_listed_sales_plate?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
                                        method: 'GET',
                              }),
                              providesTags: ['listedPlates'],
                    }),
          }),
});

export const {
      useGetAllPlatesQuery,
} = allPlatesApi;


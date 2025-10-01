import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    // Create new Contact
    createContact: builder.mutation({
      query: (data) => ({
        url: "contact/create_contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),

    // Get all Contacts with optional search/filter
    getAllContact: builder.query({
      query: (params) => ({
        url: "contact/all_contact",
        method: "GET",
        params,
      }),
      providesTags: ["contact"],
    }),

    // Delete Contact
    deleteContact: builder.mutation({
      query: (_id) => ({
        url: `contact/delete_contact/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),


  }),
});

export const {
  useGetAllContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactApi;

export default contactApi;
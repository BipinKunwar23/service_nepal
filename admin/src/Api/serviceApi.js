import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const serviceApi = createApi({
  reducerPath: "service",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/service/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes:['Services'],
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => "providers",
    }),
    createServices: builder.mutation({
      query: (formdata) => {
        const id = formdata.get("id");
        return {
          url: `create/${id}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ['Services'],

    }),
    editServices: builder.mutation({
      query: (formdata) => {
        const id = formdata.get("id");
        return {
          url: `edit/${id}`,
          method: "POST",
          body: formdata,
         
        };
      },
      invalidatesTags: ['Services'],
    }),
    deleteServices: builder.mutation({
      query: ({serviceId,providerId}) => {
        return {
          url: `${serviceId}/delete/${providerId}`,
          method: "DELETE",
         
        };
      },
      invalidatesTags: ['Services'],

    }),

  

   


  }),
});
export const {
  useGetAllServicesQuery,
  useCreateServicesMutation,
  useEditServicesMutation,
  useDeleteServicesMutation,
} = serviceApi;

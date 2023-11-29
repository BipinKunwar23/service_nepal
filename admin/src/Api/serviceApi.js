import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const serviceApi = createApi({
  reducerPath: "service",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/services/",
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
    setupServices: builder.mutation({
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

    getAllProviderServices: builder.query({
      query: (providerId) => `provider/${providerId}`,
      providesTags:(result)=>
        result ?
        [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
        :['Services'],
      
    }),
    getProviderServiceByCategory: builder.query({
      query: ({providerId,categoryId}) =>`provider/${providerId}/category/${categoryId}`,
      providesTags:(result)=>
        result ?
        [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
        :['Services'],
      
    }),
    getProviderServiceById: builder.query({
      query: ({serviceId,providerId}) =>`${serviceId}/provider/${providerId}`,
      providesTags:['Services'],

    }),
    getAllProviderCategory: builder.query({
      query: (providerId) => `provider/category/${providerId}`,
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
      :['Services'],

    }),
  }),
});
export const {
  useGetAllServicesQuery,
  useSetupServicesMutation,
  useEditServicesMutation,
  useGetAllProviderServicesQuery,
  useGetAllProviderCategoryQuery,
  useGetProviderServiceByCategoryQuery,
  useGetProviderServiceByIdQuery,
  useDeleteServicesMutation
} = serviceApi;

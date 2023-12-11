import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const providerApi = createApi({
  reducerPath: "provider",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/provider/",
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
      query: ({formdata,id}) => {
        return {
          url: `services/create/${id}`,
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
          url: `services/update/${id}`,
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




    getProviderServiceById: builder.query({
      query: ({providerId,serviceId}) =>`${providerId}/services/${serviceId}`,
      providesTags:['Services'],

    }),
    viewProviderServiceDetailsById: builder.query({
      query: ({providerId,serviceId}) =>`${providerId}/service/${serviceId}/view`,
      providesTags:['Services'],

    }),

    getProviderService:builder.query({
      query:({providerId, categoryId,subcategoryId})=>{
          return !categoryId && !subcategoryId
            ? `${providerId}/services`
            : categoryId && !subcategoryId
            ? `${providerId}/category/${categoryId}`
            : `${providerId}/subcategory/${subcategoryId}`;
      },
      providesTags:(result)=>
        result ?
        [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
        :['Services'],
    }),
    
    getProvider:builder.query({
      query:({categoryId,subcategoryId,service})=>{
          return !categoryId && !subcategoryId && !service
            ? "all"
            :  service ? `search/service?name=${service}`
            
            : categoryId && !subcategoryId 
            ? `category/${categoryId}`
            : `subcategory/${subcategoryId}`;
      },
      providesTags:(result)=>
        result ?
        [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
        :['Services'],
    }),
    getProviderDetails:builder.query({
      query:(providerId)=>`${providerId}/details`
    }),
    getProviderServiceScope:builder.query({
      query:({providerId,serviceId})=>`${providerId}/${serviceId}/scope`
    })
   
  }),


});
export const {
  useGetAllServicesQuery,
  useSetupServicesMutation,
  useEditServicesMutation,
  useGetProviderServiceByIdQuery,
  useDeleteServicesMutation,
  useGetProviderServiceQuery,
  useGetProviderQuery,
  useGetProviderDetailsQuery,
  useViewProviderServiceDetailsByIdQuery,
  useGetProviderServiceScopeQuery
  
  
  
} = providerApi;

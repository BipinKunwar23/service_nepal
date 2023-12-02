import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const catServiceAPi = createApi({
  reducerPath: "catService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/services/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorize", localStorage.getItem("token"));
      return headers;
    },
  }),
tagTypes:['services'],

  endpoints: (build) => ({
    addCatServices: build.mutation({
      query: ({ formdata, id }) => ({
        url: `create/${id}`,
        method: "post",
        body: formdata,
      }),
      invalidatesTags: ['services'],

    }),
    viewCategoryServices: build.query({
      query: (id) => `show/${id}`,
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'services', id })), 'services']
      :['services'],
    }),
    getCatServiceById: build.query({
      query: (id) => `${id}`,
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'services', id })), 'services']
      :['services'],
    }),
    getOtherCatservice: build.query({
      query: (id) => `other/${id}`,
    }),
    getAllCatservices: build.query({
      query: () => "all",
    }),
    getServicesByCategory: build.query({
      query: (id) => `category/${id}`,
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'services', id })), 'services']
      :['services'],
    }),
    getServices: build.query({
      query: ({ category, subcategory }) => {
        return !category && !subcategory
          ? "all"
          : category && !subcategory
          ? `category/${category}`
          : `${subcategory}`;
      },
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'services', id })), 'services']
      :['services'],
    }),

    
    viewServiceById: build.query({
      query: (id) => `view/${id}`,
      providesTags:['services'],

      
    }),
    editService: build.mutation({
      query: ({formdata,id}) => ({
        url: `edit/${id}`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ['services'],
    }),

  }),
});
export const {
  useAddCatServicesMutation,
  useGetCatServiceByIdQuery,
  useGetOtherCatserviceQuery,
  useViewCategoryServicesQuery,
  useGetAllCatservicesQuery,
  useGetServicesByCategoryQuery,
  useGetServicesQuery,
  useEditServiceMutation,
  useViewServiceByIdQuery
} = catServiceAPi;

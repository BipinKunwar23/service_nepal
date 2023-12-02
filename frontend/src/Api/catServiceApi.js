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
tagTypes:['Services'],

  endpoints: (build) => ({
    addCatServices: build.mutation({
      query: ({ service, id }) => ({
        url: `create/${id}`,
        method: "post",
        body: service,
      }),
    }),
    viewCategoryServices: build.query({
      query: (id) => `show/${id}`,
    }),
    getCatServiceById: build.query({
      query: (id) => `${id}`,
    }),
    getOtherCatservice: build.query({
      query: (id) => `other/${id}`,
    }),
    getAllCatservices: build.query({
      query: () => "all",
    }),
    getServicesByCategory: build.query({
      query: (id) => `category/${id}`,
    }),
    getServices: build.query({
      query: ({ category, subcategory }) => {
        return !category && !subcategory
          ? "all"
          : category && !subcategory
          ? `category/${category}`
          : `${subcategory}`;
      },
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
  useGetServicesQuery
} = catServiceAPi;

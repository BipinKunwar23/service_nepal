import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userServiceApi = createApi({
  reducerPath: "buyerService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user/service/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    getServiceCards: builder.query({
      query: (page = 1) => `all?page=${page}`,
    }),
    getServiceDetailsById: builder.query({
      query: ({serviceId,optionId}) => `${serviceId}/option/${optionId}`,
    }),
    getServicePackage: builder.query({
      query: ({ serviceId, packageName }) =>
        `${serviceId}/package?name=${packageName}`,
    }),
 

    getFilterTypes: builder.query({
      query: (serviceId) => `filter_type/${serviceId}`,
    }),
    getFilteredServices: builder.query({
      query: ({ serviceId, filter }) => {
        return `filter/${serviceId}${filter}`;
      },
    }),

    getSearchList: builder.query({
      query: (name) => `search/list/${name}`,
    }),
    getSearchedService: builder.query({
      query: (name) => `search?service=${name}`,
    }),
  }),
});
export const {
  useGetServiceCardsQuery,
  useGetServiceDetailsByIdQuery,
  useGetServicePackageQuery,
  useGetFilterTypesQuery,
  useGetFilteredServicesQuery,
  useGetSearchListQuery,
  useGetSearchedServiceQuery
  
} = userServiceApi;

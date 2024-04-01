import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const buyerFilterApi = createApi({
  reducerPath: "filterService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/buyer/filter/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

      return headers;
    },
  }),
  tagTypes: ["Orders"],

  endpoints: (build) => ({
    searchProvider: build.query({
      query: (service) => `service?name=${service}`,
    }),
    searchLocaton: build.query({
      query: (categoryId) => {
        return !categoryId ? "location/get" : `location/category/${categoryId}`;
      },
    }),

    getFilterTypes: build.query({
      query: (serviceId) => `types/${serviceId}`,
    }),
    getFilteredServices: build.query({
      query: ({ serviceId, filter }) => {
        return `service/${serviceId}${filter}`;
      },
    }),

    getSearchList: build.query({
      query: (name) => `search/list/${name}`,
    }),
    getSearchedService: build.query({
      query: (name) =>  `search?service=${name}`
    }),
  }),
});

export const {
  useSearchProviderQuery,
  useSearchLocatonQuery,
  useGetFilterTypesQuery,
  useGetFilteredServicesQuery,
  useGetSearchListQuery,
  useGetSearchedServiceQuery
} = buyerFilterApi;

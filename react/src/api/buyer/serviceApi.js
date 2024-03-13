import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const buyerServiceApi = createApi({
  reducerPath: "buyerService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/buyer/service/",
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
      query: (page=1) => `all?page=${page}`,
    }),
    getServiceDetailsById: builder.query({
      query: (serviceId) => `${serviceId}`,
    }),
    getServicePackage: builder.query({
      query: ({serviceId,packageName}) => `${serviceId}/package?name=${packageName}`,
    }),
  }),
});
export const { useGetServiceCardsQuery, useGetServiceDetailsByIdQuery, useGetServicePackageQuery } =
buyerServiceApi;

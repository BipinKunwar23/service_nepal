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
      query: () => "all",
    }),
    getServiceDetailsById: builder.query({
      query: (serviceId) => `${serviceId}/view`,
    }),
  }),
});
export const { useGetServiceCardsQuery, useGetServiceDetailsByIdQuery } =
buyerServiceApi;

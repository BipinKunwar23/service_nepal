import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const buyerCatalogApi = createApi({
  reducerPath: "buyerCatalog",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/buyer/catalog/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCatalog: builder.query({
      query: () => "show",
    }),
  }),
});
export const { useGetCatalogQuery } = buyerCatalogApi;

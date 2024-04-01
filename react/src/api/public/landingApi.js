import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const landingApi = createApi({
  reducerPath: "landing",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorize", localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["Orders"],

  endpoints: (build) => ({
    getLandingPageData: build.query({
      query: () => "landing/show",
    }),

   
  }),
});

export const {
    useGetLandingPageDataQuery
 
} = landingApi;

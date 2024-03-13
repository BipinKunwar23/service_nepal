import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const searchHistoryApi = createApi({
  reducerPath: "searchHistoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/history/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    viewSeaerchHistory: build.query({
      query: (subcategoryId) => `view/${subcategoryId}`,
    }),
    createSearchHistory: build.mutation({
      query: ({ values, subcategoryId }) => {
        return {
          url: `create/${subcategoryId}`,
          method: "POST",
          body: values,
        };
      },
    }),
    updateRating: build.mutation({
      query: ({ values, searchId }) => {
        return {
          url: `update/rating/${searchId}`,
          method: "POST",
          body: values,
        };
      },
    }),
    updateLocation: build.mutation({
      query: ({ values, searchId }) => {
        return {
          url: `update/location/${searchId}`,
          method: "POST",
          body: values,
        };
      },
    }),
    updateBudget: build.mutation({
      query: ({ values, searchId }) => {
        return {
          url: `update/budget/${searchId}`,
          method: "POST",
          body: values,
        };
      },
    }),
  }),
});

export const {
  useViewSeaerchHistoryQuery,
  useCreateSearchHistoryMutation,
  useUpdateBudgetMutation,
  useUpdateLocationMutation,
  useUpdateRatingMutation,
} = searchHistoryApi;

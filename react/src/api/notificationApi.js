import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const notificationApi = createApi({
  reducerPath: "notifications",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/notification/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    showNotificaitons: build.query({
      query: () => "all",
    }),
  }),
});

export const { useShowNotificaitonsQuery } = notificationApi;

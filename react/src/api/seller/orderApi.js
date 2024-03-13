import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerOrderApi = createApi({
  reducerPath: "selerrOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/order",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getReceivedOrders: build.query({
      query: () => "all",
    }),

    getProviderReceivedOrderDetail: build.query({
      query: (orderId) => `${orderId}/received`,
    }),

    AcceptOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/accept`,
        method: "PUT",
      }),
    }),
    CancelOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/cancel`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetReceivedOrdersQuery,
  useGetProviderReceivedOrderDetailQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
} = sellerOrderApi;

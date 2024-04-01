import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const buyerOrderApi = createApi({
  reducerPath: "buyerOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/buyer/order",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: ({ serviceId, ...values }) => {
        return {
          url: `service/${serviceId}`,
          method: "POST",
          body: values,
        };
      },
    }),

    getCustomerOrders: build.query({
      query: () => "all",
    }),
    getProviderReceivedOrders: build.query({
      query: (id) => `provider/${id}`,
    }),
    viewOrderDetails: build.query({
      query: (id) => `${id}`,
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
  usePlaceOrderMutation,
  useGetCustomerOrdersQuery,
  useGetProviderReceivedOrdersQuery,
  useGetProviderReceivedOrderDetailQuery,
  useViewOrderDetailsQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
} = buyerOrderApi;

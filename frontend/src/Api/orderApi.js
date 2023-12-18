import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/orders/" }),
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: ({ formdata, customerId, serviceId,providerId }) => {
        return {
          url: `create/${customerId}/service/${serviceId}/provider/${providerId}`,
          method: "POST",
          body: formdata,
        };
      },
    }),

    getCustomerOrders: build.query({
      query: (id) => `customer/${id}`,
    }),
    getProviderReceivedOrders: build.query({
      query: (id) => `provider/${id}`,
    }),
    viewCustomerOrderDetail: build.query({
      query: (id) => `${id}/made`,
    }),
    getProviderReceivedOrderDetail: build.query({
      query: (orderId) => `${orderId}/received`,
    }),

    AcceptOrder: build.mutation({
      query: (orderId) => (
        {
          url: `${orderId}/accept`,
          method: "PUT",
        }
      )
    }),
    CancelOrder: build.mutation({
      query: (orderId) => (
        {
          url: `${orderId}/cancel`,
          method: "PUT",
        }
      )
    }),

  }),
});

export const {
  usePlaceOrderMutation,
  useGetCustomerOrdersQuery,
  useGetProviderReceivedOrdersQuery,
  useGetProviderReceivedOrderDetailQuery,
  useViewCustomerOrderDetailQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation
} = orderApi;

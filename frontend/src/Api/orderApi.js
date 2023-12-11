import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/orders/" }),
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: ({ formdata, customerId, serviceId }) => {
        return {
          url: `create/${customerId}/service/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
    }),

    getCustomerOrders: build.query({
      query: (id) => `get/customer/${id}`,
    }),
    getProviderReceivedOrders: build.query({
      query: (id) => `customer/all/${id}`,
    }),
    viewOrderDetailsById: build.query({
      query: (orderId) => `customer/${orderId}/details`,
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetCustomerOrdersQuery,
  useGetProviderReceivedOrdersQuery,
  useViewOrderDetailsByIdQuery
} = orderApi;

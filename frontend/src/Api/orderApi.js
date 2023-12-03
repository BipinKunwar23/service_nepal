import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/orders/" }),
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: ({ customerId, serviceId, ...order }) => {
        return {
          url: `create/${customerId}/service/${serviceId}`,
          method: "POST",
          body: order,
        };
      },
    }),

    getCustomerOrders: build.query({
      query: (id) => `get/customer/${id}`,
    }),
  }),
});

export const { usePlaceOrderMutation, useGetCustomerOrdersQuery } = orderApi;

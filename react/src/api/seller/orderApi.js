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
  tagTypes: ["Services"],

  endpoints: (build) => ({
    getReceivedOrders: build.query({
      query: () => "all",
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
      :['Services'],
    }),

    getOrderDetail: build.query({
      query: (orderId) => `view/${orderId}`,
      providesTags: ["Services"],

    }),

    AcceptOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/accept`,
        method: "PUT",
      }),
      invalidatesTags: ["Services"],

    }),
    CancelOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Services"],

    }),
    CompleteOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/complete`,
        method: "PUT",
      }),
      invalidatesTags: ["Services"],

    }),
    DeleteOrder: build.mutation({
      query: (orderId) => ({
        url: `${orderId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],

    }),
    getCostByDay: build.query({
      query: () => `cost`,
    }),
  }),
});

export const {
  useGetReceivedOrdersQuery,
  useGetOrderDetailQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useGetCostByDayQuery,
  useCompleteOrderMutation,
  useDeleteOrderMutation
} = sellerOrderApi;

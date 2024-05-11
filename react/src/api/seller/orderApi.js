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
    getStatisticData: build.query({
      query: () => `statistic`,
    }),
    getOrderLocation: build.query({
      query: () => `location`,
    }),
    getDonutCity: build.query({
      query: (locations) => `donut/city?locations=${locations.join(',')}`,
    }),
  
    getDonutStatus: build.query({
      query: (locationId) => `donut/status/${locationId}`,
    }),
  
    getDonutData: build.query({
      query: (locationId) =>{
        console.log('locationId',locationId);
        return locationId?.length===1 ? `donut/status/${locationId[0]}` : locationId.length>1 ?`donut/city` : null
      },
    }),
  }),
});

export const {
  useGetReceivedOrdersQuery,
  useGetOrderDetailQuery,
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useDeleteOrderMutation,
  useGetStatisticDataQuery,
  useGetOrderLocationQuery,
  useGetDonutDataQuery,
  useGetDonutStatusQuery,
  useGetDonutCityQuery
} = sellerOrderApi;

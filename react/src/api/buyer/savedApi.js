import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const savedApi = createApi({
  reducerPath: "saved",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/saved",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Services"],

  endpoints: (build) => ({
    createList: build.mutation({
      query: (values) => {
        return {
          url: `list`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    getList: build.query({
      query: (serviceId) => `list/${serviceId}`,
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
      :['Services'],
    }),
  
    addFavorite: build.mutation({
      query: ({listId,serviceId}) => {
        return {
          url: `favourite/${listId}/service/${serviceId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Services"],

    }),
    addWishList: build.mutation({
        query: ({listId,serviceId}) => {
          return {
            url: `wishlist/${listId}/service/${serviceId}`,
            method: "POST",
          };
        },
      invalidatesTags: ["Services"],

      }),

    getSavedServices: build.query({
      query: () => "services",
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Services', id })), 'Services']
      :['Services'],
    
    }),
    getSavedServicesByList: build.query({
      query: (id) => `list/${id}/service`,
     
    }),
  }),
});

export const {
  useCreateListMutation,
  useGetListQuery,
  useAddFavoriteMutation,
  useAddWishListMutation,
  useGetSavedServicesQuery,
  useGetSavedServicesByListQuery
} = savedApi;

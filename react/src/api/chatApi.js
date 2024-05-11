import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const chatApi = createApi({
  reducerPath: "chats",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/chat/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Category"],

  endpoints: (build) => ({
    showChats: build.query({
      query: (receiverId) => `private/${receiverId}`,
    }),
    sendMessage: build.mutation({
      query: ({ formdata,receiverId }) => {
        return {
          url: `private/${receiverId}`,
          method: "post",
          body: formdata,
        };
      },
      invalidatesTags: ['Category'],

    }),
    recentUsers: build.query({
      query: () => "private/all",
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
      :['Category'],
      
    }),
    deleteChat: build.mutation({
      query: (receiverId) => {
        return {
          url: `private/${receiverId}`,
          method: "delete",
        };
      },
      invalidatesTags: ['Category'],

    }),
  }),
});

export const {
  useShowChatsQuery,
  useSendMessageMutation,
  useRecentUsersQuery,
  useDeleteChatMutation
} = chatApi;

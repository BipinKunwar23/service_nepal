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
  tagTypes:['Chats'],
  endpoints: (build) => ({
    showChats: build.query({
      query: (receiverId) => `private/${receiverId}`,
    //   providesTags:(result)=>
    //   result ?
    //   [ ...result.map(({ id }) => ({ type: 'Chats', id })), 'Chats']
    //   :['Chats'],
    }),
    sendMessage: build.mutation({
      query: ({ message, receiverId }) => {
        return {
          url: `private/${receiverId}`,
          method: "post",
          body: message,
        };
      },
    //   invalidatesTags:['Chats']
    }),
  }),
});

export const { useShowChatsQuery, useSendMessageMutation } = chatApi;

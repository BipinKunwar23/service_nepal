import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerProfileApi = createApi({
  reducerPath: "sellerProfile",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/service",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createProfile: builder.mutation({
      query: (values) => {
        return {
          url: `edit/${id}`,
          method: "POST",
          body: values,
        };
      },
    }),

    addProfession: builder.mutation({
      query: (values) => {
        return {
          url: `edit/${id}`,
          method: "POST",
          body: values,
        };
      },
    }),
    addAvailabiltiy: builder.mutation({
      query: (values) => {
        return {
          url: `edit/${id}`,
          method: "POST",
          body: values,
        };
      },
    }),
    addSecurityInfo: builder.mutation({
      query: (values) => {
        return {
          url: `security`,
          method: "POST",
          body: values,
        };
      },
    }),
  }),
});
export const {
  useCreateProfileMutation,
  useAddAvailabiltiyMutation,
  useAddProfessionMutation,
  useAddSecurityInfoMutation,
} = sellerProfileApi;

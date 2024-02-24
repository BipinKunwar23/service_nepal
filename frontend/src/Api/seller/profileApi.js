import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerProfileApi = createApi({
  reducerPath: "sellerProfile",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/profile",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),


  endpoints: (builder) => ({
    addPersonal: builder.mutation({
      query: (values) => {
        return {
          url: "personal",
          method: "POST",
          body: values,
        };
      },
    }),

    addQualification: builder.mutation({
      query: (values) => {
        return {
          url: "qualification",
          method: "POST",
          body: values,
        };
      },
    }),
    addAvailability: builder.mutation({
      query: (values) => {
        return {
          url: "availability",
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
  useAddPersonalMutation,
  useAddAvailabilityMutation,
  useAddQualificationMutation,
  useAddSecurityInfoMutation,

} = sellerProfileApi;

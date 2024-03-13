import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const buyerProgressApi = createApi({
  reducerPath: "buyerProgress",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/progress/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorize", localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes:['Porgress'],

  endpoints: (builder) => ({
    workStatus: builder.mutation({
      query: ({ formdata, orderId }) => {
        return {
          url: `status/${orderId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ['Progress'],

    }),

    getCustomerTask: builder.query({
      query: (orderId) => `customerTask/${orderId}`,
      providesTags:['Progress'],

    }),

    viewStatus: builder.query({
      query: (orderId) => `view/status/${orderId}`,
      providesTags:['Progress'],

    }),
    getStatusDetails: builder.query({
      query: (progressId) => `${progressId}/status/details`,
      providesTags:['Progress'],

    }),

    updateStatus: builder.mutation({
      query: ({ formdata, progressId }) => {
        return {
          url: `${progressId}/update`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ['Progress'],

    }),
  }),
});
export const {
  useWorkStatusMutation,
  useGetCustomerTaskQuery,
  useViewStatusQuery,
  useGetStatusDetailsQuery,
  useUpdateStatusMutation
} = buyerProgressApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const statusApi = createApi({
  reducerPath: "statusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/status",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    acceptStatus: builder.mutation({
      query: ({ orderId,values }) => {
        return {
          url: `accept/${orderId}`,
          method: "POST",
          body: values,
        };
      },
    }),
    cancelStatus: builder.mutation({
      query: ({ orderId,values }) => {
        return {
          url: `accept/${orderId}`,
          method: "POST",
          body: values,
        };
      },
    }),
    reviewServiceProvider: builder.mutation({
      query: ({ providerId, ...values }) => {
        return {
          url: `review/${providerId}`,
          method: "post",
          body: values,
        };
      },
    }),

    getProviderFeedbacks: builder.query({
      query: ({ providerId, categoryId }) =>
        `${providerId}/feedback/${categoryId}`,
    }),
  }),
});
export const {
  useGetProviderFeedbacksQuery,
  useAcceptStatusMutation,
  useCancelStatusMutation,
  useReviewServiceProviderMutation,
} = statusApi;

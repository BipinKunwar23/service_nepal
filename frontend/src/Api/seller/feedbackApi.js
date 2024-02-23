import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerFeedbackApi = createApi({
  reducerPath: "sellerFeedback",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/provider/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    rateServiceProvider: builder.mutation({
      query: ({ providerId, ...values }) => {
        return {
          url: `rating/${providerId}`,
          method: "post",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    reviewServiceProvider: builder.mutation({
      query: ({ providerId, ...values }) => {
        return {
          url: `review/${providerId}`,
          method: "post",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    getProviderFeedbacks: builder.query({
      query: ({ providerId, categoryId }) =>
        `${providerId}/feedback/${categoryId}`,
      providesTags: ["Services"],
    }),
  }),
});
export const {
  useGetProviderFeedbacksQuery,
  useRateServiceProviderMutation,
  useReviewServiceProviderMutation,
} = sellerFeedbackApi;

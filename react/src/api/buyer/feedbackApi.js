import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const buyerFeedbackApi = createApi({
  reducerPath: "buyerrFeedback",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/buyer/review/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    

    reviewService: builder.mutation({
      query: ({ serviceId, ...values }) => {
        return {
          url: `${serviceId}`,
          method: "post",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    getServiceReview: builder.query({
      query: (serviceId) =>
        `/${serviceId}`,
      providesTags: ["Services"],
    }),
  }),
});
export const {
  useGetServiceReviewQuery,
  useReviewServiceMutation
} = buyerFeedbackApi;

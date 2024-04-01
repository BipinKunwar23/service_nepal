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
      query: ({ sellerId, ...values }) => {
        return {
          url: `${sellerId}`,
          method: "post",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    getServiceReview: builder.query({
      query: (sellerId) =>
        `${sellerId}`,
      providesTags: ["Services"],
    }),
   
    addTestimonial: builder.mutation({
      query: ({ formdata }) => ({
        url: "testimonail",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Category"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ formdata }) => ({
        url: "testimonial",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});
export const {
  useGetServiceReviewQuery,
  useReviewServiceMutation,
  useUpdateTestimonialMutation,
  useAddTestimonialMutation
} = buyerFeedbackApi;

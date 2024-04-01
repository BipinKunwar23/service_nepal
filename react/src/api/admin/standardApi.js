import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const standardApi = createApi({
  reducerPath: "standards",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/standard/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["services"],
  endpoints: (builder) => ({
    
    addServiceStandards: builder.mutation({
      query: ({ values, id }) => ({
        url: `create/${id}`,
        method: "post",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),
    editServiceStandard: builder.mutation({
      query: ({ values, id }) => {
        return {
          url: `edit/${id}`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["subCategory"],
    }),
    getStandardByServiceId: builder.query({
      query: (id) => `${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),

    addStandardValue: builder.mutation({
      query: ({ values, id }) => ({
        url: `value/${id}`,
        method: "post",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),
    updateStandardValue: builder.mutation({
      query: ({ values, id }) => ({
        url: `value/edit/${id}`,
        method: "put",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),

    getValueByStandard: builder.query({
      query: (id) => `value/${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),
  }),
});
export const {

  useAddServiceStandardsMutation,
  useGetStandardByServiceIdQuery,
  useGetValueByStandardQuery,
  useAddStandardValueMutation,
  useEditServiceStandardMutation,
  useUpdateStandardValueMutation
} = standardApi;

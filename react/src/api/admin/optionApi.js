import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const optionApi = createApi({
  reducerPath: "options",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/option/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["subCategory"],
  endpoints: (builder) => ({
    getOptionsByService: builder.query({
      query: (serviceId) => `service/${serviceId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "subCategory", id })),
              "subCategory",
            ]
          : ["subCategory"],
    }),
    addOption: builder.mutation({
      query: ({ values, serviceId }) => {
        return {
          url: `create/${serviceId}`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["subCategory"],
    }),
    editOption: builder.mutation({
      query: ({ values, id }) => {
        return {
          url: `edit/${id}`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["subCategory"],
    }),

    addServiceStandards: builder.mutation({
      query: ({ values, id }) => ({
        url: `standard/create/${id}`,
        method: "post",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),
    getStandardByServiceId: builder.query({
      query: (id) => `standard/${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),

    addStandardValue: builder.mutation({
      query: ({ values, id }) => ({
        url: `standard/value/create/${id}`,
        method: "post",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),

    getValueByStandard: builder.query({
      query: (id) => `standard/value/${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),
  }),
});
export const {
  useGetOptionsByServiceQuery,
  useAddOptionMutation,
  useAddServiceStandardsMutation,
  useGetStandardByServiceIdQuery,
  useGetValueByStandardQuery,
  useAddStandardValueMutation,
  useEditOptionMutation
} = optionApi;

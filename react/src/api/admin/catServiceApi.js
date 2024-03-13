import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const catServiceAPi = createApi({
  reducerPath: "catService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/service/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorize", localStorage.getItem("token"));
      return headers;
    },
  }),
  tagTypes: ["services"],

  endpoints: (build) => ({
    addCatServices: build.mutation({
      query: ({ values, id }) => ({
        url: `create/${id}`,
        method: "post",
        body: values,
      }),
      invalidatesTags: ["services"],
    }),

    getCatServiceById: build.query({
      query: (id) => `${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),

    getBySubcategory: build.query({
      query: (id) => `subcategory/${id}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "services", id })), "services"]
          : ["services"],
    }),

    getServices: build.query({
      query: () => {
        return "all";
      },
      providesTags: ["services"],
    }),

    viewServiceById: build.query({
      query: (id) => `view/${id}`,
      providesTags: ["services"],
    }),
    editService: build.mutation({
      query: ({ formdata, id }) => ({
        url: `edit/${id}`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["services"],
    }),

   


  }),
});
export const {
  useAddCatServicesMutation,
  useGetCatServiceByIdQuery,
  useGetServicesQuery,
  useEditServiceMutation,
  useViewServiceByIdQuery,
  useGetBySubcategoryQuery
} = catServiceAPi;

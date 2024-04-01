import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const aboutApi = createApi({
  reducerPath: "abouts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/about/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    viewCompanyInfo: builder.query({
      query: () => "company",
      providesTags: ["Category"],

    }),
    viewTeams: builder.query({
      query: () => "teams",
    }),
    viewFaqs: builder.query({
      query: () => "faqs",
    }),
    viewlegalinfo: builder.query({
      query: () => "legal",
    }),

    viewAboutUs: builder.query({
      query: (id) => `about`,
      providesTags: ["Category"],
    }),

    addCompanyInfo: builder.mutation({
      query: ({ formdata }) => ({
        url: "company",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Category"],
    }),
    addTeams: builder.mutation({
      query: ({ formdata }) => ({
        url: "teams",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Category"],
    }),
 
    addFaqs: builder.mutation({
      query: (values) => ({
        url: "faqs",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Category"],
    }),

    addLegalInfo: builder.mutation({
      query: () => ({
        url: "legal",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCompanyInfo: builder.mutation({
        query: ({ formdata,id }) => ({
          url: `company/edit/${id}`,
          method: "POST",
          body: formdata,
        }),
        invalidatesTags: ["Category"],
      }),
      updateTeams: builder.mutation({
        query: ({ formdata, id }) => ({
          url: `teams/edit/${id}`,
          method: "POST",
          body: formdata,
        }),
        invalidatesTags: ["Category"],
      }),
     
      updateFaqs: builder.mutation({
        query: (values) => ({
          url: "faqs",
          method: "put",
          body: values,
        }),
        invalidatesTags: ["Category"],
      }),
  
      updateLegalInfo: builder.mutation({
        query: (values) => ({
          url: "legal",
          method: "PUT",
          body: values,
        }),
        invalidatesTags: ["Category"],
      }),
  }),
});
export const {

    useAddCompanyInfoMutation,
    useAddFaqsMutation,
    useAddLegalInfoMutation,
    useAddTeamsMutation,
    useUpdateCompanyInfoMutation,
    useUpdateTeamsMutation,
    useViewAboutUsQuery,
    useViewCompanyInfoQuery,
    useViewFaqsQuery,
    useViewTeamsQuery,
    useViewlegalinfoQuery,
    useUpdateFaqsMutation,
    useUpdateLegalInfoMutation,
} = aboutApi;

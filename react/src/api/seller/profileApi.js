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
  tagTypes: ["profiles"],


  endpoints: (builder) => ({
    addPersonal: builder.mutation({
      query: (values) => {
        return {
          url: "personal",
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    updatePersonal: builder.mutation({
      query: (values) => {
        return {
          url: "personal/update",
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),

    addQualification: builder.mutation({
      query: (values) => {
        return {
          url: "qualification",
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    updateQualification: builder.mutation({
      query: (values) => {
        return {
          url: "qualification",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    addAvailability: builder.mutation({
      query: (values) => {
        return {
          url: "availability",
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    updateAvailability: builder.mutation({
      query: (values) => {
        return {
          url: "availability",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    addSecurityInfo: builder.mutation({
      query: (values) => {
        return {
          url: `security`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["profiles"],

    }),
    setRole: builder.mutation({
      query: () => {
        return {
          url: "role",
          method: "POST",
        };
      },
      invalidatesTags: ["profiles"],

    }),
    checkRole:builder.query({
      query:()=>"role"
    }),
    viewProfile: builder.query({
      query:()=>'view',
      providesTags: ["profiles"],

      // providesTags:(result)=>
      // result ?
      // [ ...result.map(({ id }) => ({ type: 'profiles', id })), 'profiles']
      // :['profiles'],
    })
  }),
});
export const {
  useAddPersonalMutation,
  useAddAvailabilityMutation,
  useAddQualificationMutation,
  useAddSecurityInfoMutation,
  useViewProfileQuery,
  useUpdateAvailabilityMutation,
  useUpdatePersonalMutation,
  useUpdateQualificationMutation,
  useSetRoleMutation,
  useCheckRoleQuery
  

} = sellerProfileApi;

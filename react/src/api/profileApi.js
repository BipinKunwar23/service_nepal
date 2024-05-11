import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/profile/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Services"],

  endpoints: (build) => ({
    viewProfile: build.query({
      query: () => "view",
      providesTags: ["Services"],

    }),
    createProfile: build.mutation({
      query: (formdata) => {
        const userId = formdata.get("userId");
        return {
          url: "/create",
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],

    }),
    editProfile: build.mutation({
      query: (formdata) => {
        const userId = formdata.get("userId");
        return {
          url: "/edit",
          method: "POST",
          body: formdata,
        };
      },
    }),
    editName: build.mutation({
      query: (values) => {
        return {
          url: "edit/name",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    editPhoto: build.mutation({
        query: (formdata) => {
          return {
            url: "edit/photo",
            method: "POST",
            body: formdata,
          };
        },
      invalidatesTags: ["Services"],

      }),
    editLocation: build.mutation({
      query: (values) => {
        return {
          url: "edit/address",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    editContact: build.mutation({
      query: (values) => {
        return {
          url: "edit/phone",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    editBio: build.mutation({
      query: (values) => {
        return {
          url: "edit/bio",
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    editSkill: build.mutation({
      query: (formdata) => {
        const userId = formdata.get("userId");
        return {
          url: "/edit",
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],

    }),
  }),
});

export const {
  useCreateProfileMutation,
  useEditProfileMutation,
  useViewProfileQuery,
  useEditBioMutation,
  useEditContactMutation,
  useEditLocationMutation,
  useEditSkillMutation,
  useEditPhotoMutation,
  useEditNameMutation
} = profileApi;

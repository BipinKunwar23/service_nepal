import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerServiceApi = createApi({
  reducerPath: "sellerService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/service/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({
    createOverview: builder.mutation({
      query: ({ optionId, values }) => {
        return {
          url: `overview/${optionId}`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),
    updateOverview: builder.mutation({
      query: ({ optionId, values }) => {
        return {
          url: `overview/${optionId}`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    addServicePrice: builder.mutation({
      query: ({ serviceId, price }) => {
        return {
          url: `price/${serviceId}`,
          method: "POST",
          body: price,
        };
      },
      invalidatesTags: ["Services"],
    }),
    updateServicePrice: builder.mutation({
      query: ({ serviceId, price }) => {
        return {
          url: `price/${serviceId}`,
          method: "PUT",
          body: price,
        };
      },
      invalidatesTags: ["Services"],
    }),

   
    addGallery: builder.mutation({
      query: ({ serviceId, formdata }) => {
        return {
          url: `gallery/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],
    }),
    updateGallery: builder.mutation({
      query: ({ serviceId, formdata }) => {
        return {
          url: `gallery/update/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],
    }),
    addRequirements: builder.mutation({
      query: ({ serviceId, values }) => {
        return {
          url: `requirement/${serviceId} `,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),
    updateRequirements: builder.mutation({
      query: ({ serviceId, values }) => {
        return {
          url: `requirement/${serviceId} `,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],
    }),

    saveService: builder.mutation({
      query: (serviceId) => {
        return {
          url:  `save/${serviceId}` ,
          method: "POST",
        };
      },
      invalidatesTags: ["Services"],
    }),

  
    addDescription: builder.mutation({
      query: ({formdata,serviceId }) => {
        return {
          url: `detail/create/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],
    }),
    updateDescription: builder.mutation({
      query: ({formdata,serviceId }) => {
        return {
          url: `detail/update/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],
    }),


    editServices: builder.mutation({
      query: (formdata) => {
        const id = formdata.get("id");
        return {
          url: `edit/${id}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],
    }),

    deleteServices: builder.mutation({
      query: (serviceId) => {
        return {
          url: `delete/${serviceId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Services"],
    }),

    viewServiceCards: builder.query({
      query: () => {
        return "cards";
      },
      providesTags: ["Services"],
    }),

    viewServiceDetails: builder.query({
      query: (serviceId) => `${serviceId}`,
      providesTags: ["Services"],
    }),
    viewSpecificServiceDetails: builder.query({
      query: (serviceId) => `specific/${serviceId}`,
      providesTags: ["Services"],
    }),
    viewDraftService: builder.query({
      query: ({serviceId,type}) => {
        return type==='specific'? `draft/specific/${serviceId}` : type==="general"? `draft/general/${serviceId}` : null
      },
      providesTags: ["Services"],
    }),
    viewOptonDetails: builder.query({
      query: ({ optionId }) => `option/${optionId}`,
      providesTags: ["Services"],
    }),

    viewServiceSummary: builder.query({
      query: () => "view/all",
      providesTags: ["Services"],
    }),

    getServiceStandard: builder.query({
      query: (serviceId) => `standard/${serviceId}`,
    }),
  }),
});
export const {

  useAddServicePriceMutation,
  useEditServicesMutation,
  useDeleteServicesMutation,
  useAddGalleryMutation,
  useAddRequirementsMutation,
  useViewServiceCardsQuery,
  useViewServiceSummaryQuery,
  useViewServiceDetailsQuery,
  useViewSpecificServiceDetailsQuery,
  useGetServiceStandardQuery,
  useCreateOverviewMutation,
  useUpdateOverviewMutation,
  useAddDescriptionMutation,
  useUpdateDescriptionMutation,
  useUpdateServicePriceMutation,
  useUpdateGalleryMutation,
  useUpdateRequirementsMutation,
  useViewOptonDetailsQuery,
  useViewDraftServiceQuery,
  useSaveServiceMutation
} = sellerServiceApi;

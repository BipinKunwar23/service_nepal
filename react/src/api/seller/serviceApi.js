import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerServiceApi = createApi({
  reducerPath: "sellerService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/seller/service/",
    prepareHeaders:(headers)=>{
      // headers.set('Content-Type','multipart/form-data')
      headers.set('Accept','application/json')
      headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
      return headers
    }
  }),
  tagTypes:['Services'],
  endpoints: (builder) => ({
    
  
  
    createOverview: builder.mutation({
      query: ({optionId,values}) => {
        return {
          url: `overview/${optionId}`,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Services"],


    }),
    updateOverview: builder.mutation({
      query: ({optionId,values}) => {
        return {
          url: `overview/${optionId}`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["Services"],


    }),
    addServicePrice: builder.mutation({
      query: ({optionId,price}) => {
        return {
          url: `price/${optionId}`,
          method: "POST",
          body: price,
        };
      },
      invalidatesTags: ["Services"],


    }),
    updateServicePrice: builder.mutation({
      query: ({optionId,price}) => {
        return {
          url: `price/${optionId}`,
          method: "PUT",
          body: price,
        };
      },
      invalidatesTags: ["Services"],

    }),

    addDescrptionFaq: builder.mutation({
      query: ({serviceId,values}) => {
        return {
          url: `faqs/${serviceId}`,
          method: "POST",
          body: values,
        };
      },

      invalidatesTags: ["Services"],

    }),
    updateDescrptionFaq: builder.mutation({
      query: ({serviceId,values}) => {
        return {
          url: `faqs/${serviceId}`,
          method: "PUT",
          body: values,
        };
      },

      invalidatesTags: ["Services"],

    }),
    addGallery: builder.mutation({
      query: ({serviceId, formdata}) => {
        return {
          url: `gallery/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],

    }),
    updateGallery: builder.mutation({
      query: ({serviceId, formdata}) => {
        return {
          url: `gallery/update/${serviceId}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Services"],

    }),
    addRequirements: builder.mutation({
      query: ({serviceId, values}) => {
        return {
          url: `requirement/${serviceId} `,
          method: "POST",
          body: values,
        };
      },
      invalidatesTags: ["Services"],

    }),
    updateRequirements: builder.mutation({
      query: ({serviceId, values}) => {
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
          url: `save/${serviceId} `,
          method: "POST",
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
      invalidatesTags: ['Services'],
    }),

  

    deleteServices: builder.mutation({
      query: (serviceId) => {
        return {
          url: `delete/${serviceId}`,
          method: "DELETE",
         
        };
        
      },
      invalidatesTags: ['Services'],

    }),

    viewServiceCards:builder.query({
      query:()=>{
        return "cards"
      },
      providesTags: ["Services"],

    }),

    viewServiceDetails:builder.query({
      query:(serviceId)=>`${serviceId}`,
      providesTags: ["Services"],

    }),
   

    viewServiceSummary:builder.query({
      query:()=>"all",
      providesTags: ["Services"],

    }),
   
    getServiceStandard:builder.query({
      query:(optionId)=>`option/standard/${optionId}`
    }),
  }),
});
export const {
  useCreateOverviewMutation,
  useAddServicePriceMutation,
  useEditServicesMutation,
  useDeleteServicesMutation,
  useAddDescrptionFaqMutation,
  useAddGalleryMutation,
  useAddRequirementsMutation,
  useViewServiceCardsQuery,
  useViewServiceDetailsQuery,
  useViewServiceSummaryQuery,
  useGetServiceStandardQuery,
  useSaveServiceMutation,
  useUpdateOverviewMutation,
  useUpdateServicePriceMutation,
  useUpdateDescrptionFaqMutation,
  useUpdateGalleryMutation,
  useUpdateRequirementsMutation


  
  
} = sellerServiceApi;

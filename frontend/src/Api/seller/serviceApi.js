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
      query: (values) => {
        return {
          url: 'overview',
          method: "POST",
          body: values,
        };
      },

    }),

    addServicePrice: builder.mutation({
      query: (values) => {
        return {
          url: 'price',
          method: "POST",
          body: values,
        };
      },

    }),

    addDescrptionFaq: builder.mutation({
      query: (values) => {
        return {
          url: 'faqs',
          method: "POST",
          body: values,
        };
      },

    }),
    addGallery: builder.mutation({
      query: (formdata) => {
        return {
          url: 'gallery',
          method: "POST",
          body: formdata,
        };
      },

    }),
    addRequirements: builder.mutation({
      query: (values) => {
        return {
          url: 'requirement',
          method: "POST",
          body: values,
        };
      },

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

    getDraftServices: builder.query({
      query: () => "draft",
     
    }),

    deleteServices: builder.mutation({
      query: ({serviceId,providerId}) => {
        return {
          url: `${serviceId}/delete/${providerId}`,
          method: "DELETE",
         
        };
      },
      invalidatesTags: ['Services'],

    }),

    viewServiceCards:builder.query({
      query:()=>{
        return "cards"
      }
    }),

    viewServiceDetails:builder.query({
      query:(serviceId)=>`${serviceId}`
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
  useGetDraftServicesQuery,
  useViewServiceCardsQuery,
  useViewServiceDetailsQuery


  
  
} = sellerServiceApi;

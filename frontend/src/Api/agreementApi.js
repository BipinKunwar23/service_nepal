import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const agreementApi = createApi({
  reducerPath: "agreement",
 

baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/order/agreement',
prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set('Accept','application/json')
    headers.set('Authorize',localStorage.getItem('token'))
    return headers
  }}),

endpoints:(builder)=>({
    initialAgreement: builder.mutation({
        query: ({values,orderId}) => ({
          url: `initial/${orderId}`,
          method: "POST",
          body: values,
        }),
  
      }),
     finalAgreement: builder.mutation({
        query: ({values,orderId}) => ({
          url: `final/${orderId}`,
          method: "POST",
          body: values,
        }),
  
      }), 
      checkInitialAgreement:builder.query({
        query:(orderId)=>`check/initial/${orderId}`
      }),
      checkFinalAgreement:builder.query({
        query:(orderId)=>`check/final/${orderId}`
      }),

      AcceptInitialAgreement: builder.mutation({
        query: (orderId) => ({
          url: `${orderId}/initial/accept`,
          method: "PUT",
        }),
  
      }), 

  
})
 
});
export const {
useInitialAgreementMutation,
useFinalAgreementMutation,
useCheckInitialAgreementQuery,
useCheckFinalAgreementQuery,
useAcceptInitialAgreementMutation
} = agreementApi;

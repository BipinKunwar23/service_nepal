import React from 'react'
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/api/orders/',
    prepareHeaders:(headers)=>{
        // headers.set('Content-Type','multipart/form-data')
        headers.set('Accept','application/json')
        headers.set('Authorize',localStorage.getItem('token'))
        return headers
      }}),
  tagTypes:['Orders'],

    endpoints:(build=>({
        viewOrders:build.query({
            query:(userId=>`view/${userId}`)
        }),
        placeOrder:build.mutation({
            query:(({customerId,serviceId,...order})=>{
                return {
                    url:`create/${customerId}/service/${serviceId}`,
                    method:'POST',
                    body:order
    
                }
            }),
      invalidatesTags: ['Orders'],

        }),
        getCustomerOrders:build.query({
            query:(customerId)=>`get/customer/${customerId}`,
            providesTags:(result)=>
            result ?
            [ ...result.map(({ id }) => ({ type: 'Orders', id })), 'Orders']
            :['Orders'],
      
        })
    }))
})
  
export const {
usePlaceOrderMutation,
useViewOrdersQuery,
useGetCustomerOrdersQuery
}=orderApi


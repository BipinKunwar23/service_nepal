import React from 'react'
import {  createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/api/profile/',
    prepareHeaders:(headers)=>{
        // headers.set('Content-Type','multipart/form-data')
        headers.set('Accept','application/json')
        headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return headers
      }
    }),
    endpoints:(build=>({
        viewProfile:build.query({
            query:(()=>'view')
        }),
        createProfile:build.mutation({
            query:((formdata)=>{
                const userId= formdata.get('userId')
                return {
                    url:'/create',
                    method:'POST',
                    body:formdata
    
                }
            })
        }),
        editProfile:build.mutation({
            query:((formdata)=>{
                const userId= formdata.get('userId')
                return {
                    url:'/edit',
                    method:'POST',
                    body:formdata
    
                }
            })
        }),
       
    }))
})
  
export const {
useCreateProfileMutation,
useEditProfileMutation,
useViewProfileQuery,


}=profileApi


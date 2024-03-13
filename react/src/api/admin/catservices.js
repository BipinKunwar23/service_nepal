import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
export const catserviceApi=createApi({
    reducerPath:'catservice',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/catservices/'}),
    endpoints:(builder)=>({
        viewCategoryServices:builder.query({
            query:(id)=>`show/${id}`
        }),
        getCatServiceById:builder.query({
            query:(id)=>`show/${id}`
        }),
        getOtherCatservice:builder.query({
            query:(id)=>`other/${id}`
        })
    })
})
export const {useViewCategoryServicesQuery,useGetCatServiceByIdQuery,useGetOtherCatserviceQuery}=catserviceApi
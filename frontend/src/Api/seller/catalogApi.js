import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerCatalogApi = createApi({
  reducerPath: "sellerCatalog",
 

baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/catalog/',
prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set('Accept','application/json')
    headers.set('Authorize',localStorage.getItem('token'))
    return headers
  }}),
endpoints:(builder)=>({
   
    getCategory:builder.query({
        query:()=>"category/show"
    }),
    getSubCategoryByCategoryId:builder.query({
        query:()=>"subcategory/show"
    }),
    getServiceBySubcategoryId:builder.query({
        query:()=>"service/show"
    }),
    getSubServiceByServiceId:builder.query({
        query:()=>"subservice/show"
    }),
  
  
})
 
});
export const {
useGetCategoryQuery,
useGetServiceBySubcategoryIdQuery,
useGetSubCategoryByCategoryIdQuery,
useGetSubServiceByServiceIdQuery
} = sellerCatalogApi

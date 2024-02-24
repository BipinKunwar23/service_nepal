import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sellerCatalogApi = createApi({
  reducerPath: "sellerCatalog",
 

baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/seller/catalog/',
prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set("Accept", "application/json");
    headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    return headers
  }}),
endpoints:(builder)=>({
   
    getCategory:builder.query({
        query:()=>"category/show"
    }),
    
    getSubCategory:builder.query({
        query:()=>"subcategory/show"
    }),
    getSubCategoryByCategoryId:builder.query({
        query:(categoryId)=>"subcategory/show"
    }),
    getServiceBySubcategoryId:builder.query({
        query:()=>"service/show"
    }),
    getSubServiceByServiceId:builder.query({
        query:()=>"subservice/show"
    }),
    getCatalog: builder.query({
        query: () => "show",
      }),
  
})
 
});
export const {
useGetCategoryQuery,
useGetSubCategoryQuery,
useGetServiceBySubcategoryIdQuery,
useGetSubCategoryByCategoryIdQuery,
useGetSubServiceByServiceIdQuery,
useGetCatalogQuery
} = sellerCatalogApi

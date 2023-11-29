import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const subCategoryApi = createApi({
  reducerPath: "subCategory",
 

baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/subcategory/',
prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set('Accept','application/json')
    headers.set('Authorize',localStorage.getItem('token'))
    return headers
  }}),
endpoints:(builder)=>({
  getAllSubCategory:builder.query({
    query:()=>"viewAll"
}),
getSubCategoryById:builder.query({
  query:(id)=>`view/${id}`
}),
addSubCategory: builder.mutation({
  query: ({ id, ...subcategory }) => ({
    url: `create/${id}`,
    method: "post",
    body: subcategory,
  }),
}),
getSubCategory:builder.query({
  query:(categoryId)=>{
    return !categoryId? "viewAll" : `view/${categoryId}`
  }
}),
getProviderSubCategory:builder.query({
  query:({categoryId,providerId})=>{
    return !categoryId ? `provider/${providerId}` : `provider/${providerId}/category/${categoryId}`
  }
})
  
})
 
});
export const {
 useGetAllSubCategoryQuery,
 useGetSubCategoryByIdQuery,
 useAddSubCategoryMutation,
 useGetSubCategoryQuery,
 useGetProviderSubCategoryQuery
} = subCategoryApi;

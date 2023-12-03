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

tagTypes:['subCategory'],

endpoints:(builder)=>({
  getAllSubCategory:builder.query({
    query:()=>"viewAll",
    providesTags:(result)=>
    result ?
    [ ...result.map(({ id }) => ({ type: 'subCategory', id })), 'subCategory']
    :['subCategory'],
}),
getSubCategoryById:builder.query({
  query:(id)=>`view/${id}`,
  providesTags:(result)=>
  result ?
  [ ...result.map(({ id }) => ({ type: 'subCategory', id })), 'subCategory']
  :['subCategory'],
}),
addSubCategory: builder.mutation({
  query: ({ id, ...subcategory }) => ({
    url: `create/${id}`,
    method: "post",
    body: subcategory,
  }),
  invalidatesTags: ['subCategory'],

}),
getSubCategory:builder.query({
  query:(categoryId)=>{
    return !categoryId? "viewAll" : `view/${categoryId}`
  },
  providesTags:(result)=>
  result ?
  [ ...result.map(({ id }) => ({ type: 'subCategory', id })), 'subCategory']
  :['subCategory'],
}),
getProviderSubCategory:builder.query({
  query:({categoryId,providerId})=>{
    return !categoryId ? `provider/${providerId}` : `provider/${providerId}/category/${categoryId}`
  },
  providesTags:(result)=>
  result ?
  [ ...result.map(({ id }) => ({ type: 'subCategory', id })), 'subCategory']
  :['subCategory'],
}),

viewSubCategoryById:builder.query({
  query:(id)=>`view/detail/${id}`,
  providesTags:['subCategory'],

}),

editSubCategory: builder.mutation({
  query: ({id,...subcategory}) => ({
    url: `edit/${id}`,
    method: "PUT",
    body: subcategory,
  }),
  invalidatesTags: ['subCategory'],

}),
  
})
 
});
export const {
 useGetAllSubCategoryQuery,
 useGetSubCategoryByIdQuery,
 useAddSubCategoryMutation,
 useGetSubCategoryQuery,
 useGetProviderSubCategoryQuery,
 useEditSubCategoryMutation,
 useViewSubCategoryByIdQuery
} = subCategoryApi;

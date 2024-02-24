import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const subCategoryApi = createApi({
  reducerPath: "subCategory",
 

baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8000/api/admin/subcategory/',
prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set('Accept','application/json')
    headers.set('Authorize',localStorage.getItem('token'))
    return headers
  }}),

tagTypes:['subCategory'],

endpoints:(builder)=>({
  getAllSubCategory:builder.query({
    query:()=>"all",
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
  query: ({formdata,id }) => ({
    url: `create/${id}`,
    method: "post",
    body: formdata,
  }),
  invalidatesTags: ['subCategory'],

}),

getSubCategory:builder.query({
  query:(categoryId)=>{
    return !categoryId? "all" : `view/category/${categoryId}`
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
 useEditSubCategoryMutation,
 useViewSubCategoryByIdQuery
} = subCategoryApi;

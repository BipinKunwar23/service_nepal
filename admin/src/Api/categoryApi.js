import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/category/" ,
  prepareHeaders:(headers)=>{
    // headers.set('Content-Type','multipart/form-data')
    headers.set('Accept','application/json')
    headers.set('Authorize',localStorage.getItem('token'))
    return headers
  }
}),
tagTypes:['Category'],

  endpoints: (builder) => ({
    viewCategory: builder.query({
      query: () => "view",
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
      :['Category'],
    }),
    getCategoryById: builder.query({
      query: (id) => `view/${id}`,
  providesTags:['Category'],

    }),
    
    getCategoryService: builder.query({
      query: (id) => `service/${id}`,
    }),
    getProviderCategory: builder.query({
      query: (providerId) => `provider/${providerId}`,
    }),
    addCategory: builder.mutation({
      query: ({formdata}) => ({
        url: "create",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ['Category'],

    }),


    addCatgService:builder.mutation({
      query:({id,...service})=>({
        url:`service/create/${id}`,
        method:'post',
        body:service
      })
    }),
    editCategory: builder.mutation({
      query: ({id,...category}) => ({
        url: `edit/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ['Category'],

    }),
   
    
  }),
});
export const {
  useViewCategoryQuery,
  useGetCategoryByIdQuery,
  useGetCategoryServiceQuery,
  useAddCategoryMutation,
  useAddCatgServiceMutation,
  useGetProviderCategoryQuery,
  useEditCategoryMutation,
  
} = categoryApi;

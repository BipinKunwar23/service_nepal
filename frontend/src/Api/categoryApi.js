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
    getCategoryService: builder.query({
      query: (id) => `service/${id}`,
    }),
    getProviderCategory: builder.query({
      query: (providerId) => `provider/${providerId}`,
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "create",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ['Category'],

    }),
    updateCategory: builder.mutation({
      query: ({id,...category}) => ({
        url: `update/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ['Category'],

    }),
  
    addCatgService:builder.mutation({
      query:({id,...service})=>({
        url:`service/create/${id}`,
        method:'post',
        body:service
      })
    })
  }),
});
export const {
  useViewCategoryQuery,
  useGetCategoryServiceQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useAddCatgServiceMutation,
  useGetProviderCategoryQuery
} = categoryApi;

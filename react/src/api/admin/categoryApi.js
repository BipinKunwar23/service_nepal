import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/admin/category/" ,
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
      query: () => "all",
      providesTags:(result)=>
      result ?
      [ ...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
      :['Category'],
    }),


    getCategoryById: builder.query({
      query: (id) => `view/${id}`,
  providesTags:['Category'],

    }),
    

    
    addCategory: builder.mutation({
      query: ({formdata}) => ({
        url: "create",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ['Category'],

    }),


   
    editCategory: builder.mutation({
      query: ({formdata, id}) => ({
        url: `edit/${id}`,
        method: "POST",
        body: formdata,
      }),
      
      invalidatesTags: ['Category'],

    }),
   
    
  }),
});
export const {
  useViewCategoryQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  
} = categoryApi;

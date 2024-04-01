import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin/user/",
    prepareHeaders: (headers) => {
      // headers.set('Content-Type','multipart/form-data')
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes:['Services'],
  endpoints: (builder) => ({
    viewAllUsers: builder.query({
      query: () => "all",
    }),
    getAllServices: builder.query({
      query: () => "service/all",
    }),
    viewAllOrders: builder.query({
      query: () => "order/all",
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => {
        return {
          url: `order/cancel/${orderId}`,
          method: "DELETE",
          body: formdata,
         
        };
      },
    }),
    approveService: builder.mutation({
      query: (serviceId) => {
        return {
          url: `service/approve/${serviceId}`,
          method: "POST",
         
        };
      },
      invalidatesTags: ['Services'],

    }),

    modifyService: builder.mutation({
      query: (serviceId) => {
        return {
          url: `service/modify/${serviceId}`,
          method: "POST",
         
        };
      },
      invalidatesTags: ['Services'],

    }),

  
    denyService: builder.mutation({
      query: (serviceId) => {
        return {
          url: `service/deny/${serviceId}`,
          method: "DELETE",
         
        };
      },

    }),

  

   


  }),
});
export const {
  useViewAllUsersQuery,
  useGetAllServicesQuery,
  useViewAllOrdersQuery,
  useApproveServiceMutation,
  useCancelOrderMutation,
  useDenyServiceMutation,
  useModifyServiceMutation
} = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const authApi = createApi({
  reducerPath: "userAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/user/",
  withCredentials: true,
prepareHeaders:(headers)=>{
  // headers.set('Content-Type','multipart/form-data')
  headers.set('Accept','application/json')
  headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return headers
}
}),
  
  endpoints: (build) => ({
    getById: build.query({
      query: (id) => `customer/${id}`,
    }),
    searchUser: build.mutation({
      query: (user) => ({
        url: "customer/find",
        method: "POST",
        body: user,
      }),
    }),
    validateUser: build.mutation({
      query: (user) => ({
        url: "customer/valid",
        method: "POST",
        body: user,
      }),
    }),
    searchEmail: build.mutation({
      query: ({ password_confirmation, ...user }) => ({
        url: "customer/edit/email",
        method: "POST",
        body: user,
      }),
    }),
    registerUser: build.mutation({
      query: ({...user}) => ({
        url: `create`,
        method: "POST",
        body: user,
      }),
    }),

    loginUser: build.mutation({
      query: (credential) => ({
        url: `login`,
        method: "POST",
        body: credential,
        
      }),
    
    }),
  editUser: build.query({
      query: (id) =>`profile/${id}`
       
    }),
    updateUser:build.mutation({
      query: (formdata) => {
        const id=formdata.get('user_id')
        return ({

        url: `profile/edit/${id}`,
        method: "POST",
        body: formdata,
      })
    },
    }),
    logOutUser: build.mutation({
      query: (id) => ({
        url: `customer/delete/${id}`,
        method: "DELETE",
      }),
    }),
    deactivateUser: build.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
      }),
    }),
    // viewProfile:build.query({
    //   query:(id)=>`profile/${id}`
    // }),
    providerAuth:build.query({
      query:(id)=>`profile/auth/${id}`
    })
  }),
});

export const {
  useSearchUserMutation,
  useValidateUserMutation,
  useSearchEmailMutation,
  useGetByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogOutUserMutation,
  useDeactivateUserMutation,
  useUpdateUserMutation,
  useEditUserQuery,
  useViewProfileQuery,
  useProviderAuthQuery
} = authApi;



// export const rtkQueryErrorLogger = (store) => (next) => (action) => {
//   if (isRejectedWithValue(action)) {
//     console.log(action);
//     const error = action.payload
//     if (error.status === "FETCH_ERROR") {
//       store.dispatch({
//         type: 'API_REQUEST_ERROR',
//         payload: {
//           status: error.status,
//           message: error.message,
//           data: error.data
//         }
//       })
//       // network error
//       // console.warn('Network error:', error)
//       // toast.error({ title: 'Network error', message: 'Could not connect to server' })
//     } else if (error.status >= 500) {
//       // server error
//       console.warn('Server error:', error)
//       // toast.error({ title: 'Server error', message: 'Something went wrong on the server' })
//     } else if (error.status >= 400) {
//       // client error
//       console.warn('Client error:', error)
//       // toast.warn({ title: 'Client error', message: 'Invalid request' })
//     } else {
//       // connection error
//       console.warn('Connection error:', error)
//       // toast.error({ title: 'Connection error', message: 'Could not connect to server' })
//     }
//   }

//   return next(action)
// }


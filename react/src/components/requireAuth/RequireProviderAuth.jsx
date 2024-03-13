import React from 'react'
import { useProviderAuthQuery } from '../../Api/AuthSlice';
import { Navigate, useLocation } from 'react-router-dom';

const RequireProviderAuth = ({children}) => {
    const userId=localStorage.getItem('userId');
    const {data:hasProfile,isLoading,isError}=useProviderAuthQuery(userId)
    const location=useLocation()
if(isLoading){
    return <div>Processing...</div>
}
if(!hasProfile){
    return <Navigate to="/user/profile/create" state={{path:location.pathname}}/>
}
  return children
   
}

export default RequireProviderAuth
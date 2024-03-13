import React from 'react'
import { useCheckRoleQuery } from '../../../../api/seller/profileApi'
import Loader from '../../../../components/Loader'
import { Navigate } from 'react-router-dom'
const RequireRole = ({children}) => {
    const {data,isLoading}=useCheckRoleQuery()
    if(isLoading){
        return <Loader/>
    }
    if(data?.role==="seller"){
        return (
          <>
          {children}
          </>
        )

    }
    return <Navigate to={`/user/${localStorage.getItem('name')}/seller/profile`}  replace={true}/>
}

export default RequireRole
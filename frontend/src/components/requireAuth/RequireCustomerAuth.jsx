import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const RequireCustomerAuth = ({children}) => {
  const logged=localStorage.getItem("logged");
  const location=useLocation();
  if(!logged){
    return <Navigate to="/signin" state={{path:location.pathname}}/>
  }
  return children
}

export default RequireCustomerAuth
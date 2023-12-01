import React from 'react'
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const RequireAuth = ({children}) => {
    const location=useLocation()
    const logged = localStorage.getItem("logged");
if(!logged){
    return <Navigate to="/signin" state={{path:location.pathname}}/>
}
  return  children
}

export default RequireAuth
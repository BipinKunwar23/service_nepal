import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Provider from './Provider'
const ViewProvider = () => {
  return (
    <>
    <div>ViewProvider</div>
    <Routes>
        <Route path='/' element={<Provider/>}/>
    </Routes>
    
    </>
  )
}

export default ViewProvider
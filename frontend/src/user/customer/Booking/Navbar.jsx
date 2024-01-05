import React from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const BookingNavbar = () => {
    const {orderId}=useParams()
    const navigate=useNavigate()
  return (
    <nav className="flex place-content-center order-dashboard p-4 box-border bg-gray-100">
        <ul className=" p-2 flex gap-12 text-red-500 font-bold  ">
          <li className="">
            <NavLink to={`order/${orderId}`}>Order</NavLink>
          </li>
          <li>
            <NavLink to={`agreement/${orderId}`}>Agreeement</NavLink>
          </li>
          <li>
            <NavLink to={`progress/${orderId}`}>Progress</NavLink>
          </li>
          <li>
         <button 
         onClick={()=>{
            navigate("/received/orders", {replace:true})
         }}
         className='underline text-green-600 underline-offset-2 '
         >
            Back to Summary
         </button>

          </li>
        </ul>
      </nav>
  )
}

export default BookingNavbar
import React from 'react'
import { useNavigate } from 'react-router-dom';
import sellerLogo from "../../../images/seler.jpg"

const buyerProfile = () => {
    const navigate=useNavigate()
  return (
    <div className="flex-1 p-10   box-border  shadow-sm shadow-gray-400 bg-white h-[70Vh]">
    <div className=" gap-4 grid place-content-center ">
      <img src={sellerLogo} alt="" className="w-[200px] h-[200px]" />

      <button
        className="bg-green-500 text-white text-[1.1em] p-2 px-4 font-semibold"
        onClick={() => {
          navigate(`/user/${localStorage.getItem('name')}/seller/guideline`);
        }}
      >
        Become a seller
      </button>
    </div>
  </div>
  )
}

export default buyerProfile
import React from 'react'

const SellerProfile = ({photo,name}) => {
  return (
    <div className="flex justify-between mb-6">
    <div className="flex gap-4">
      <img
        src={`http://localhost:8000/${photo}`}
        className="w-20 h-20 rounded-full"
        alt=""
      />
      <h2 className="font-semibold text-[1.3em] text-gray-800 place-self-center">
        {name}
      </h2>
    </div>
  </div>
  )
}

export default SellerProfile
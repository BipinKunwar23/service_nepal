import React from 'react'

const SellerProfile = ({user}) => {
  return (
    <div className="flex justify-between">
    <div className="flex gap-4">
      <img
        src={`http://localhost:8000/${user?.profile?.photo}`}
        className="w-[90px] h-[90px] rounded-full"
        alt=""
      />
      <h2 className="font-semibold text-[1.3em] text-gray-800 place-self-center">
        {user?.name}
      </h2>
    </div>
  </div>
  )
}

export default SellerProfile
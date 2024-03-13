import React from 'react'

const searchBox = () => {
  return (
     <div className="flex place-content-center">
    <input
      type="search"
      className="border border-gray-600 w-[60Vw] rounded-full p-2 focus:outline-none "
      placeholder="Find Your Srevices"
    />
  </div>
  )
}

export default searchBox
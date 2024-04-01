import React from 'react'
import { FaHome } from 'react-icons/fa'

const ServiceCategory = ({category,service}) => {
  return (
    <div>
         <ul className="flex   text-[1em] text-gray-700 font-semibold">
        <li className='flex gap-2'>
          <i className='text-lg'><FaHome/></i>{category?.name} <span className=" "> {"/"}</span>
        </li>
       
        <li>
          {service?.name} <span className=""> </span>
        </li>
      </ul>
    </div>
  )
}

export default ServiceCategory
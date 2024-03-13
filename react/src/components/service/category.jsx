import React from 'react'

const ServiceCategory = ({category,subcategory,service,option}) => {
  return (
    <div>
         <ul className="flex gap-4 my-5 font-semibold ">
        <li>
          {category?.name} <span className="ml-2 "> {">"}</span>
        </li>
        <li>
          {subcategory?.name} <span className="ml-2 "> {">"}</span>
        </li>
        <li>
          {service?.name} <span className="ml-2 "> {">"}</span>
        </li>
        <li className="">{option?.name}</li>
      </ul>
    </div>
  )
}

export default ServiceCategory
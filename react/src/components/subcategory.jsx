import React from 'react'

const SubCategory = ({subcategories}) => {
  return (
    <div className="grid  font-semibold shadow h-[90Vh] shadow-gray-400 p-5 ">
    <ul className="flex flex-col ">
      <li>Departments</li>
      {
        subcategories.map((subcategory)=>{
          return  <li className="m-2" key={subcategory?.id} >
            {subcategory?.name.toUpperCase()}
          </li>
             
        })
      }
    </ul>
    </div>
  )
}

export default SubCategory
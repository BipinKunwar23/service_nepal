import React from 'react'
import SubCategory from "./subcategory"
import { useSelector } from 'react-redux'

import ServiceCard from './serviceCard'
const cardSection = ({subcategories,children}) => {
const selected=useSelector((state)=>state.categorySlice.subcategory);
  return (

    <section className="service-section grid grid-cols-4   gap-1">
    {/* Sub category section  */}

    <SubCategory subcategories={subcategories}  />


    {/* Provider-Card Section */}
    <section className=" col-start-2   gap-1 box-border  col-span-4 row-start-1 flex-1   ">
   
      {
        children
      }
    </section>


  </section>
  )
}

export default cardSection
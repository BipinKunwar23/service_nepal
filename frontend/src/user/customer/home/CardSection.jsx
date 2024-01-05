import React from 'react'
import SubCategory from "../../../services/subCategory"
import { useSelector } from 'react-redux'
import { Location } from './searching/location'

const CardSection = ({subcategories,children}) => {
const selected=useSelector((state)=>state.categorySlice.subcategory);
  return (

    <section className="service-section grid grid-cols-4  gap-1">
    {/* Sub category section  */}
    <section className='   bg-[#CDF4F3]  min-h-screen'>

    <SubCategory subcategories={subcategories}  />
    {/* <Location/> */}
    </section>


    {/* Provider-Card Section */}
    <section className=" col-start-2  bg-white rounded-lg gap-1 box-border  col-span-4 row-start-1 flex-1 py-4  ">
      {/* {
        Object.keys(selected).length===0 ? <AllSevice /> : <ServiceById/>
      } */}
      {
        children 
      }
    </section>


  </section>
  )
}

export default CardSection
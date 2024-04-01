import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SellerProfile from '../../../components/service/profile';
import ServiceCategory from '../../../components/service/category';
const SpecificServiceDetail = ({services}) => {
    const {serviceId}=useParams()
    const navigate=useNavigate()

  return (
    <section className='px-4'>
   
    
   <SellerProfile photo={services?.description?.image}  name={services?.user?.profile?.name}/>

    <div className=" text-[1.1em] text-gray-500 ">
        <ServiceCategory
          category={services?.service?.subcategory?.category}
          subcategory={services?.service?.subcategory}
          service={services?.service}
          option={services?.option}
        />
      </div>
    <section className="grid grid-cols-2 gap-8  mx-auto p-20 my-8 box-border border shadow">
      <div className="">
        <img
          src={`http://localhost:8000/${services?.description?.image}`}
          className="object-cover object-center w-full h-[400px]"
          alt=""
        />
      </div>
      <div className="space-y-3">
        <h2 className="font-semibold text-2xl">{services?.title}</h2>
        <p className="text-gray-600 ">
          {services?.description?.description}
        </p>
        <p className="text-gray-600 text-xl">
          {" "}
          <span className="text-black mr-3">NPR</span>
          {services?.description?.price}
        </p>
        <div>
          <p className="mt-4 font-semibold text-xl">
            {services?.description?.note}
          </p>
        </div>
       
      </div>
    </section>
  </section>
  )
}

export default SpecificServiceDetail
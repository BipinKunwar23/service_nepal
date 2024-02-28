import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import {useGetSearchedServiceQuery } from '../../api/buyer/filterApi'
import ServiceCard from '../../views/buyer/service/serviceCard'

const SearchResult = () => {
const [searchParams,setSearchParams]=useSearchParams()
const service=searchParams.get('service');

const {data:services,isLoading}=useGetSearchedServiceQuery(service)
console.log('services',services);
if(isLoading){
  return 
}
if(services.length===0){
  return (
    <div className='p-10 text-xl'> 
      <p className='text-center'>No Result Found For {service}</p>
    </div>
  )
}
  return (
    <section className='p-5'>
<h2 className='mb-5 text-3xl '>Result For {service}</h2>
<div>
  <ServiceCard cards={services}/>
</div>
    </section>
  )
}

export default SearchResult
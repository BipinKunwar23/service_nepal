import React from 'react'
import { useSearchLocatonQuery } from '../../../../Api/searchingApi'
import { useSelector } from 'react-redux'

export const Location = () => {
    const categoryId=useSelector((state)=>state.categorySlice.category);
    const {data:locations,isLoading}=useSearchLocatonQuery(categoryId);
    if(isLoading){
        return
    }
  return (
    <div className='mx-5'>
        <ul>
            <li className='mb-2 font-bold' >Available Location</li>
            {
                locations.map((location)=>{
                    return <li key={location.address} className='mb-2 mx-2 hover:bg-gray-300 cursor-pointer p-2 ' >{location.address}</li>
                })
            }
        </ul>
    </div>
  )
}

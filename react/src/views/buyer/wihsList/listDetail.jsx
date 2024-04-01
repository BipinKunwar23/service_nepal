import React from 'react'
import { useGetSavedServicesByListQuery } from '../../../api/buyer/savedApi'
import { useParams, useSearchParams } from 'react-router-dom'
import Loader from '../../../components/Loader'
import ServiceCard from '../../../components/card/serviceCard'
const ListDetail = () => {
    const {listId}=useParams()
    const {data,isLoading}=useGetSavedServicesByListQuery(listId)
    console.log('data',data);
    const [searchParams,setSearchParams]=useSearchParams()
    if(isLoading){
        return <Loader/>
    }
  return (
    <div className='p-10'>
        <div className='mb-6'>
           <p className='space-x-2 text-[1.1em] font-semibold '> Home <span className='mx-2'>{`>`}</span> My List</p>
        </div>
        <div>
            <h2 className='text-4xl font-semibold text-gray-900 '>{searchParams.get('name')}</h2>
        </div>
        {
            data && data?.length>0 ?
        <div>
            <ServiceCard cards={data}  url={`/user/${localStorage.getItem('name')}/service`} />
        </div>
        :
        <div className='mt-'>
            <p className='text-gray-600 text-xl text-center'>No Saved items has been found</p>
        </div>
        }
    </div>
  )
}

export default ListDetail
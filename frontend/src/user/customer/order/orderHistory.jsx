import React from 'react'
import { useGetCustomerOrdersQuery } from '../../../Api/orderApi'
import Error from './../../../ErrorHandling/error';
const orderHistory = () => {
    const id=localStorage.getItem('userId');
    const {data,isLoading,isError,error}=useGetCustomerOrdersQuery(id)
    if(isLoading){
        return <div>loading...</div>
    }
  return (
    <div className='bg-gray-700 p-20'>
        <h2 className='text-xl text-gray-200  mb-10'> Order History</h2>

        <section className='grid grid-cols-2 gap-5'>
            {
                data.map((order)=>{
                    return <div className='shadow shadow-gray-800  bg-gray-100 p-5'>
                    <div className='flex gap-5 mb-5 ' key={order.id}>
                        <p>Order: {order.id}</p>
                        <p>Status: {order.status}</p>
                    </div>
                    <div className='flex gap-8'>
                    <p className=''>Service:{order.service}</p>
                    <div >
                        <p>Date: {order.createdAt.split('T')[0]}</p>
                    </div>
                    <button className=' text-green-600 text-lg underline'>View Details</button>
    
                    </div>
                   
                </div>
                })
            }
            
        </section>
    </div>
  )
}

export default orderHistory
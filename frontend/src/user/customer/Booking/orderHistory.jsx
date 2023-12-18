import React from 'react'
import { useGetCustomerOrdersQuery } from '../../../Api/orderApi'
import Error from '../../../ErrorHandling/error';
import Loader from '../../../components/Loader';
import { useNavigate } from 'react-router-dom';
const orderHistory = () => {
    const id=localStorage.getItem('userId');
    const {data:orders,isLoading,isError,error}=useGetCustomerOrdersQuery(id)
    const navigate=useNavigate()
    if(isLoading){
        return <Loader/>
    }
  return (
    <section className="p-10 ">
    <section className="grid grid-cols-1  mx-auto gap-2">
    <p className="text-center text-xl font-semibold p-2">Order History</p>
      <table className="" cellPadding={8}>
        <thead>
          <tr className=" bg-blue-500 text-left text-white p-4 mb-4 " >
            <th>Id</th>
            <th>Service</th>
            <th>Provider Name</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Address</th>

            <th>Ordered At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

          <tbody>
            {orders.map((order) => {
            return  <tr key={order.id} className="mb-2  even:bg-slate-400 odd:bg-gray-600 text-white ">
                <td className=' '>{order.id}</td>
                <td>{order.service}</td>
                <td>{order.provider?.name}</td>
                <td>{order.provider?.phone}</td>
                <td>{order.provider?.email}</td>
                <td>{`${order.provider?.address?.muncipility}-${order.provider?.address?.ward}, ${order.provider?.address?.district}`}</td>

                <td>{order.created}</td>
                <td>{order.status}</td>
                <td>
                  <button className=" text-orange-400 text-lg underline" 
                  onClick={()=>{
                      navigate(`order/${order.id}`)
                  }}
                  >
                    View Detail
                  </button>
                </td>
              </tr>;
            })}
          </tbody>
      </table>
    </section>
  </section>
  )
}

export default orderHistory
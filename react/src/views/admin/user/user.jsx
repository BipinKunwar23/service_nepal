import React from 'react'
import { useViewAllUsersQuery } from '../../../api/admin/userApi'
import Loader from './../../../components/Loader';
const GetUers = () => {
    const {data,isLoading}=useViewAllUsersQuery()
    console.log('users',data);
    if(isLoading){
    return <Loader/>
    }
  return (
    <div className='p-4 mt-6'>
        <div>
            <h2 className='text-4xl text-blue-400'>Users</h2>
        </div>
        <div className="my-4">
            <ul className="flex gap-14 text-gray-400 ">
              <li>
                <button>ALL</button>
              </li>
              <li>
                <button>BUYER</button>
              </li>
              <li>
                <button>SELLER</button>
              </li>
              
            </ul>
          </div>
         <table className="w-full box-border table-auto  bg-white text-gray-500 text-[1em] ">
            <thead>
             
              <tr className="text-left font-semibold  border-b text-gray-700 ">
           
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className='p-2'>User Name</td>
                <td className='p-2'>Photo</td>

                <td className='p-2'>Email</td>
                <td className='p-2'>Contact No</td>
                <td className='p-2'>Address</td>
              </tr>
            </thead>
            <tbody className="">
              {data?.map((user) => {
                return (
                  <tr key={user?.id} className="text-left border-b text-gray-500"
                 
                  >
                    <td className="py-3 px-2">
                      <input type="checkbox" />
                    </td>

                    <td className=" w-[250px]  p-2">{user?.name}</td>
                    <td className='px-2 py-3'>
                        <img src={`http://localhost:8000/${user?.profile?.photo}`} alt=""  className='w-20  object-cover object-center h-16'/>
                    </td>

                    <td className="   w-[200px] overflow-ellipsis p-2 ">{user?.email}</td>
                    <td className=" w-30 p-2  ">{user?.profile?.phone_number}</td>
                    <td className=" ">{user?.profile?.address}</td>

                    <td className="text-center p-2  w-[100px] relative text-red-600 underline ">
                     Remove

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
    </div>
  )
}

export default GetUers
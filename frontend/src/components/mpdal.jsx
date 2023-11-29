import React from 'react'
import { GrStatusGood } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
const Modal = ({message,navigation}) => {
    const navigate=useNavigate();
  return (
    <div className='grid place-content-center  bg-gray-700 p-20'>
        <div className='w-[30Vw] h-[45Vh] p-5 bg-white flex flex-col '>
            <div className='flex justify-end'>
            <button className='text-red-600 text-3xl font-semibold'
            onClick={()=>{
                navigate(`${navigation}`,{replace:true})
            }}
            > X</button>
            </div>
            <div className='flex-1 grid place-content-center '>

        <p className='text-4xl  flex-1 flex gap-5'>
            <i className=''>
                <GrStatusGood className=''/>
            </i>
            <span>
            {message}
            </span>
            
            </p>
            </div>
        </div>

    </div>
  )
}

export default Modal
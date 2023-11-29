import React from 'react'
import { useSelector } from 'react-redux'
import { setCategoryAciton } from '../redux/categorySlice'
import { useDispatch } from 'react-redux'
import {setSubcategory} from "../redux/categorySlice"
const SubCategory = ({subcategories}) => {
  const dispatch=useDispatch()
  const AddSubCategory=()=>{
    return <div className='flex justify-center'>
        <button className='bg-green-600 l p-2 px-8 rounded-full   text-white'
        onClick={()=>{
          dispatch(setCategoryAciton("subcategory"));

        }}
        >Add More</button>
    </div>
  }
  
  const catg = useSelector((state) => state.categorySlice.category);
  const subcatg = useSelector((state) => state.categorySlice.subcategory);

  return (
    <div className="flex flex-col font-semibold shadow min-h-screen shadow-gray-400   ">
    <ul className="flex flex-col mb-8 border-b p-5 border-gray-300 ">
      <li>Departments</li>
      {
        subcategories.map((subcategory)=>{
          return  <ul className={`m-1 flex gap-3 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md ${subcatg===subcategory?.id && "bg-gray-200"}`} key={subcategory?.id} 
          
          >
            <li className='flex-1' 
           
            >
            <button 
             onClick={()=>{
              dispatch(setSubcategory(subcategory?.id))
            }}
            >{subcategory?.name.toUpperCase()}</button>

            </li>
            <li >
              <button className='text-sky-600 hover:text-sky-700'>View</button>
            </li>
            <li>
              <button className='text-sky-600 hover:text-sky-700'>Edit</button>
            </li>
            <li>
              <button className='text-sky-600 hover:text-sky-700'>Delete</button>
            </li>
         
          </ul>
             
        })
      }
      
    </ul>
    {
    catg && <AddSubCategory/> 
    }
    </div>
  )
}

export default SubCategory
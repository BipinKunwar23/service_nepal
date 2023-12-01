import React from 'react'
import { useSelector } from 'react-redux'
import { setCategoryAciton } from '../redux/categorySlice'
import { useDispatch } from 'react-redux'
import {setSubcategory} from "../redux/categorySlice"
const SubCategory = ({subcategories}) => {
  const dispatch=useDispatch()

  
  const catg = useSelector((state) => state.categorySlice.category);
  const subcatg = useSelector((state) => state.categorySlice.subcategory);

  return (
    <div className="flex flex-col font-semibold shadow min-h-screen shadow-gray-400 bg-gray-100  ">
    <ul className="flex flex-col mb-8 border-b p-5 ">
      <li>Departments</li>
      {
        subcategories.map((subcategory)=>{
          return  <li className={`m-1  gap-3 hover:bg-gray-200 hover:cursor-pointer p-2 rounded-md ${subcatg===subcategory?.id && "shadow-sm shadow-gray-600 rounded-lg"}`} key={subcategory?.id} 
          
          >
          
            <button 
             onClick={()=>{
              dispatch(setSubcategory(subcategory?.id))
            }}
            className='text-[#554] font-semibold'
            >{subcategory?.name}</button>

            
          </li>
             
        })
      }
      
    </ul>
   
    </div>
  )
}

export default SubCategory
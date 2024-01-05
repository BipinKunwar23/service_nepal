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
    <div className="flex flex-col font-semibold text-gray-800   ">
    <ul className="flex flex-col  px-4 py-2">
      <li>Departments</li>
      {
        subcategories.map((subcategory)=>{
          return  <li className={`m-1  gap-3 hover:bg-blue-600  hover:text-white hover:cursor-pointer p-3 rounded-md ${subcatg===subcategory?.id && "bg-blue-600 text-white  "}`} key={subcategory?.id} 
          
          >
          
            <button 
             onClick={()=>{
              dispatch(setSubcategory(subcategory?.id))
            }}
            className=' font-semibold'
            >{subcategory?.name}</button>

            
          </li>
             
        })
      }
      
    </ul>
   
    </div>
  )
}

export default SubCategory
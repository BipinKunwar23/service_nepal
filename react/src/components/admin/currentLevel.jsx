import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

const CurrentLevel = () => {
  const {categoryId,subcategoryId,subsubcategoryId,serviceId,standardId}=useParams
  const [searchParams,setSearchParams]=useSearchParams()

  const labels = useSelector((state) => state.categorySlice.labels);



  return (
    <div className='p-3 bg-gray-200'>
      <ul className='flex gap-5'>
      <li>Home</li>
    {
      labels.filter((item)=>item?.name!==null).map((label)=> <li>
<button>{`>`}{label?.name}</button>
      </li>)
    }

      </ul>
    </div>
  )
}

export default CurrentLevel
import React, { useState } from 'react'

const overView = () => {
    const [page,setPage]=useState("standard")
  return (
    <section>

        <div className='mt-20 flex place-content-center gap-10 text-lg font-semibold'>
            <button
            className={`${page==="standard" && "border-b-2  border-blue-600 "}`}

            onClick={()=>{
                setPage("standard")
            }}
            >STANDARDS</button>
            <button
            onClick={()=>{
                setPage("type")
            }}
            className={`${page==="type" && "border-b-2  border-blue-600 "}`}
            >TYPES</button>

        </div>
      
    </section>
  )
}

export default overView
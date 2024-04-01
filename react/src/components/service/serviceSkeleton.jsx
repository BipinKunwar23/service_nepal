import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ServiceSkeleton = () => {
  return (
    <div className='p-8'>

      <div className='grid grid-cols-3 gap-10'>
        <div className='space-y-8 col-span-2'>
          <div>

          <Skeleton height={40}/>
          </div>
          <div className='space-y-4'>
            <div className='flex gap-2'>
              <p>
              <Skeleton circle height={100} width={100}/>

              </p>
              <p className='flex-1 grid content-center'>
                <Skeleton height={40}/>
              </p>
            </div>
            <div>
              <Skeleton height={40}/>
            </div>
            <div>
              <Skeleton height={400}/>
            </div>
            <div>
              <Skeleton count={5} height={40}/>
            </div>

          </div>
        </div>
        <div className='space-y-8'>
          <div>
          <Skeleton height={40} width={100}/>

          </div>
          <div className='flex justify-between gap-3'>
            <p className='flex-1'>
              <Skeleton height={60}/>
            </p>
            <p className='flex-1'>
              <Skeleton height={60}/>
            </p>
            <p className='flex-1'>
              <Skeleton height={60}/>
            </p>
          </div>

          <div className='space-y-4'>
            <div className='flex justify-between gap-10'>
              <p className='flex-1 '>
                <Skeleton height={50}/>
              </p>
              <p className='flex-1'>
                <Skeleton height={50}/>
              </p>
            </div>
            <div>
              <Skeleton count={4} height={30}/>
            </div>
            <div>
              <ul>
                <li>
                  <Skeleton height={40}/>
                </li>
                <li className='ml-1'>
              <Skeleton count={4} height={40}/>
                </li>
              </ul>
            </div>
            
          </div>
          
        </div>
      </div>
     
    </div>
  )
}

export default ServiceSkeleton
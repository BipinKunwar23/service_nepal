import React from 'react'
import RecentUser from './recentUser'
import { Outlet, useMatch, useSearchParams } from 'react-router-dom'
import { Chat } from './chat'
const viewChat = () => {
  const [searchParms,setSearchParams]=useSearchParams()
  const receiverId=searchParms.get('receiverId');

  return (
    <section className='flex  h-[88Vh] '>
      <div className='w-[20Vw] border shadow h-full overflow-y-auto '>
        <RecentUser/>
      </div>
      <div className='flex-1 border'>
        {
          receiverId ?<Chat receiverId={receiverId}/>:
          <div className='grid place-content-center h-full'>
            <p className='text-4xl text-gray-600'>Start Conversation</p>
          </div>
        

        }
      </div>
    </section>
  )
}

export default viewChat
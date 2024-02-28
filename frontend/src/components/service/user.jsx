import React from 'react'

const User = ({user}) => {
  return (
    <div>

        <div>
            <h2 className='text-xl  bg-gray-700 text-white p-2'>About Me</h2>
        </div>
        <div className='p-2 flex flex-col gap-4'>
        <div className=''>
            <p className='text-gray-400 '>{user?.profile?.bio}</p>
        </div>
        <div>
            <h2 className='font-semibold'>My Skills</h2>
            {/* <ul>
                {
                    user?.profession?.skills?.map((skill)=>{
                        return <li></li>
                    })
                }
            </ul> */}
        </div>
        <div>
            <ul className='flex justify-around'>
                <li className=''>Address: <span className='text-gray-600'>{user?.profile?.address}</span></li>
                <li>Contact: <span className='text-gray-600'>{user?.profile?.phone_number}</span></li>

            </ul>
        </div>
        <div>
            <h2>Available At {user?.availability?.time?.start} - {user?.availability?.time?.end} On SUN, MON </h2>
        </div>

        </div>
    </div>
  )
}

export default User
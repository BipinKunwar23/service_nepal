import React, { useState } from 'react'

const Getstarted = () => {
    const medias=[
        {
            id:1,
            name:'Facebook',
           
        },
        {
            id:2,
            name:'Instagram',
           
        },  {
            id:3,
            name:'WhatsApp',
           
        }
    ]

    const [deivery,setdeleviry]=useState(false)
    console.log(deivery);
  return (
    <section className="grid  place-items-center bg-slate-300 p-3">
    <section className="join-service p-5 ">
    <div className="mb-2">
      <p className="text-indigo-400 text-3xl font-semibold text-center">
        How People Can
      </p>
      <p className="text-indigo-400 text-3xl font-semibold text-center">
        Find You ?
      </p>
    </div>
    <div className=" service-field">
      <label htmlFor="">Your Profession</label>
      <input type="text" />
    </div>
    <div className="service-field">
      <label htmlFor="">About Profession</label>
      <textarea name="" id="" cols="30" rows="2"></textarea>
    </div>
    <div className=" service-field">
      <label htmlFor="">Contact Number</label>
      <input type="text" />
    </div>
    <div className=" service-field">
      <label htmlFor="">Email</label>
      <input type="text" />
    </div>
    <div className="shadow shadow-slate-200 p-5 ">
    <table className='w-[80%] text-center  text-[1em]  text-slate-500 font-semibold' cellPadding={2}>
        <thead>
            <tr >
                <th></th>
                <th>Social Media</th>
                <th>Link</th>
            </tr>
        </thead>
        <tbody className=''>
            {
                medias.map(media=>{
                    return <tr className=''>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>{media.name}</td>
                        <td>
                            <input type="text" className='border border-gray-400 p-1 rounded-md' />
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
         
   
     
    </div>
    <div className=" service-field">
      <label htmlFor="">Contact Address</label>
      <input type="text" />
    </div>

    <div className='flex place-content-center'>
        <button className='bg-gray-400 text-white p-2 px-4 rounded-md'>Save Information</button>
    </div>
  </section>
  </section>
  )
}

export default Getstarted
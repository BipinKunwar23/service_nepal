import React, { useEffect } from 'react'
import { useSearchProviderQuery } from "../../../../api/searchingApi";
import { useSelector ,useDispatch} from 'react-redux';
import {setService} from "../../../../redux/cardSlice"
const Provider = () => {
  const dispatch=useDispatch();
    const search=useSelector((state)=>state.cardSlice.searchProvider)
    
    useEffect(()=>{
      if(search===null){
        dispatch(setService(null))
      }
    },[search])
    const { data: services, isLoading } = useSearchProviderQuery(search);
    if(isLoading){
        return <>
        </>
    }
if(services.length!==0){
  return (
  
    <section className='grid grid-cols-1 gap-4 p-4 bg-white shadow shadow-gray-800 rounded-md absolute top-12 w-full'>
        {
          services.map((service)=> <p key={service?.id}
          className='hover:bg-[rgba(0,0,0,0.3)] p-2 rounded-lg hover:cursor-pointer'
          
          onClick={()=>{
            dispatch(setService(search ? service?.name :null))
          }}
          >{service?.name}</p>)
        }
    </section>
  )
}

}

export default Provider
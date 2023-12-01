import React from 'react'
import { useSearchProviderQuery } from "../../../../Api/searchingApi";
import { useSelector ,useDispatch} from 'react-redux';
import {setService} from "../../../../redux/cardSlice"
const Provider = () => {
  const dispatch=useDispatch();
    const search=useSelector((state)=>state.cardSlice.searchProvider)
    
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
            dispatch(setService(service?.name))
          }}
          >{service?.name}</p>)
        }
    </section>
  )
}

}

export default Provider
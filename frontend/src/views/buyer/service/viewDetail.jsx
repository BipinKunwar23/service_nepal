import React from 'react'
import Service from '../../../components/service/service'
import { useGetServiceDetailsByIdQuery } from '../../../api/buyer/serviceApi'
import Loader from '../../../components/Loader';
import { useParams } from 'react-router-dom';
const ViewDetails = () => {
  const { serviceId } = useParams();

  const { data, isLoading } = useGetServiceDetailsByIdQuery(serviceId);
  console.log('data',data);
  if(isLoading){
    return <Loader/>
  }

  return (
    <section>
    <section className=''>
        <Service services={data}/>

    </section>

    </section>
  )
}

export default ViewDetails
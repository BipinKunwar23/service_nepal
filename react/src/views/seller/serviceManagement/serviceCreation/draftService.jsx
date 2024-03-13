import React from 'react'
import { useViewServiceDetailsQuery } from '../../../../api/seller/serviceApi';
import Loader from '../../../../components/Loader';
import CreateService from './ceeateService';
import { useParams } from 'react-router-dom';
const DraftService = () => {
    const {serviceId}=useParams()
    const { data, isLoading } =  useViewServiceDetailsQuery(serviceId);
    if(isLoading){
        return <Loader/>
    }
  return (
    <>
    <CreateService data={data}/>
    </>
  )
}

export default DraftService
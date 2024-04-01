import React from 'react'
import {
    useViewServiceDetailsQuery,
  } from "../../../../api/seller/serviceApi";
import { useParams } from 'react-router-dom';
import Loader from '../../../../components/Loader';
import GeneralServiceDetail from './generalDetail';
import SpecificServiceDetail from './specificDetail';
const SellerServiceDetail = () => {
  const { serviceId } = useParams();

    const { data={}, isLoading } = useViewServiceDetailsQuery(serviceId);
    console.log('value',data);
    if (isLoading) {
        return <Loader />;
      }
  return (
    <>
    {
        data?.services?.service?.type==="general" ? <GeneralServiceDetail data={data}/> : <SpecificServiceDetail services={data}/>
    }
    </>
  )
}

export default SellerServiceDetail
import React, { useEffect } from 'react'
import { useViewDraftServiceQuery } from '../../../../api/seller/serviceApi';
import Loader from '../../../../components/Loader';
import CreateService from './ceeateService';
import { useParams, useSearchParams } from 'react-router-dom';
import { setType } from '../../../../redux/sellerSlice';
import { useDispatch } from 'react-redux';
const DraftService = () => {
    const {serviceId}=useParams()
    console.log('serviceId',serviceId);
    const dispatch=useDispatch()
    const [searchParams,setSearchParams]=useSearchParams()
    const { data, isLoading } =  useViewDraftServiceQuery({serviceId,type:searchParams.get('type')});
    useEffect(()=>{
      dispatch(setType(searchParams.get('type')))
    },[searchParams])

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
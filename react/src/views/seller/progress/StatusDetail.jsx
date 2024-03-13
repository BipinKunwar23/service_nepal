import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetStatusDetailsQuery } from '../../../api/buyer/progressApi'
import Loader from '../../../components/Loader'
const StatusDetail = () => {
    const {progressId}=useParams()
    const {data,isLoading}=useGetStatusDetailsQuery(progressId)
    if(isLoading){
        return <Loader/>
    }
  return (
    <div className='min-h-screen'>StatusDetail</div>
   
  )
}

export default StatusDetail
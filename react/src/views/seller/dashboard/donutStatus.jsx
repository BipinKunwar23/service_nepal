import React from 'react'
import { useGetDonutStatusQuery } from '../../../api/seller/orderApi'
import DonutChart from './donut';
import Loader from '../../../components/Loader';
const DonutStatus = ({locationId}) => {
  const { data=[], isLoading } = useGetDonutStatusQuery(locationId);
  if(isLoading){
return <Loader/>
  }

  return (
    <DonutChart series={data?.orderCounts} labels={data?.labels}/>
  )
}

export default DonutStatus
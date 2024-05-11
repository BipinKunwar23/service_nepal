import React from 'react'
import { useGetDonutCityQuery } from '../../../api/seller/orderApi'
import Loader from '../../../components/Loader'
import DonutChart from './donut'
const DonutCity = ({locations=[]}) => {
    const {data,isLoading}=useGetDonutCityQuery(locations)
    console.log('citydata',data);
    if(isLoading){
        return <Loader/>
    }
  return (
    <div>
        <DonutChart series={data?.orderCounts} labels={data?.labels}/>
    </div>
  )
}

export default DonutCity
import React from 'react'
import Rating from './rating'
import Feedback from './feedback'
import { useGetServiceReviewQuery } from "../../../api/buyer/feedbackApi";
import Loader from '../../../components/Loader';
import { useParams } from 'react-router-dom';

const BuyerReview = () => {
  const { serviceId } = useParams();

  const { data, isLoading } = useGetServiceReviewQuery(serviceId);
  console.log('data',data);
  if(isLoading){
    return <Loader/>
  }

  return (
    <section className=' p-10 relative grid grid-cols-3 gap-6'>
        <Rating rating={data?.overall_stars}/>
        <Feedback feedbacks={data?.feedbacks}/>
        
    </section>
  )
}

export default BuyerReview
import React from 'react'
import Rating from './rating'
import Feedback from './feedback'
import { useGetServiceReviewQuery } from "../../../api/buyer/feedbackApi";
import Loader from '../../../components/Loader';
import { useParams } from 'react-router-dom';

const BuyerReview = ({sellerId}) => {
  console.log('sellerId',sellerId);

  const { data, isLoading } = useGetServiceReviewQuery(sellerId);
  console.log('data',data);
  if(isLoading){
    return <Loader/>
  }

  return (
    <section className=' relative grid grid-cols-3 mt-4 gap-6'>
        <Feedback feedbacks={data?.feedbacks}/>
        <Rating rating={data?.overall_stars}/>
        
    </section>
  )
}

export default BuyerReview
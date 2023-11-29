import React from "react";
import { usePlaceOrderMutation } from "../../../Api/orderApi";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import Modal from "../../../components/mpdal";
import Error from "../../../components/ErrorHandling/error";
import { useNavigate } from "react-router-dom";
const Order = () => {
  const navigate=useNavigate();
  
const {register,handleSubmit,control,reset}=useForm();
const customerId=localStorage.getItem('userId');
const serviceId=useSelector((state)=>state.cardSlice.serviceId);
console.log('services',serviceId);
const [placeOrder,{data,isLoading,isSuccess,isError,error}]=usePlaceOrderMutation();
const onSubmit=async (values)=>{
  console.log(values);
  await placeOrder({...values,customerId,serviceId})
  .unwrap()
  .then(response=>{
    console.log(response);
    reset();
  })
  .catch(error=>{
    // console.log(error);
  })

}
console.log(error);

if(isError){
  return <Error error={error}/>
}
if(isSuccess){
  return <Modal message={data?.message} navigation="/customer/orders/history"/>
}
  return (
    <section className="grid place-content-center p-10  bg-[#D6FFFF]   ">
      <form action="" className=" w-[60Vw] bg-[#154D69] grid grid-cols-1  p-20  gap-5 auto-rows-min shadow shadow-gray-800  text-gray-700" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center  text-gray-400 p-5 font-bold text-2xl">Your Service Order Form</h2>
        <div className="order">
        <div>
          <label htmlFor=""> Starting  Date</label>
          <input type="date" 
          {...register('date')}
          />
          
        </div>
       
        <div>
          <label htmlFor=""> Staring Time</label>
          <input type="time"
          defaultValue="10:00"
          {...register('time')}
          />
        </div>
        <div>
          <label htmlFor=""> Working Duration</label>
          <input type="text"
          {...register('duration')}
          />
        </div>
        <div>
          <label htmlFor="">Delivery Location</label>
          <input type="text" 
           {...register('location')}
           />
          
        </div>
        <div>
          <label htmlFor=""> Email Address</label>
          <input type="email" 
          {...register('email')}
          
          />
        </div>
        <div>
          <label htmlFor=""> Phone Number</label>
          <input type="text" 
          {...register('number')}
          
          />

        </div>

        </div>
        <div className=" flex flex-col gap-5 text-gray-400 font-semibold">
          <label htmlFor="">Problem Descripton</label>
          <textarea name="" id="" cols="30" rows="3" 
          {...register('description')}
          
          ></textarea>

        </div>
        <div className="mt-5">
          <div className="flex-1 flex justify-around">

          <button className="bg-gray-800 text-white p-2  px-8 rounded-md " type="button"
          onClick={()=>{
            reset();
            navigate("/customer");
          }}
          >Cancel Order</button>

          <button className=" bg-gray-800 p-2 text-white rounded-md px-7" type="submit">Submit Orders</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Order;

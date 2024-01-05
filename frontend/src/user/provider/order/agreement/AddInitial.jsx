import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate, useParams } from "react-router-dom";
import { setSteps } from '../../../../redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialAgreementMutation } from "../../../../Api/agreementApi";
import Loader from '../../../../components/Loader';

const AddInitial = () => {
  const { register, control, handleSubmit } = useForm();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {orderId}=useParams();
  const [btnContinue, setBtnContinue]=useState('')
  const status = useSelector((state) => state.orderSlice.status);

  const [initialAgreement,{data,isLoading, isSuccess}]=useInitialAgreementMutation();
  const onSubmit = async (values) => {
    console.log(values);
    await initialAgreement({values,orderId})
    .unwrap()
    .then((response)=>{
      // if(btnContinue==='btn-continue'){
      //   navigate('')
      // }
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  if(isLoading){
    return <Loader/>
  }
  return(
  <form action="" onSubmit={handleSubmit(onSubmit)}>
    <div className="my-3">
      <p className="text-lg font-semibold text-gray-600 text-center ">Initial Agreement</p>
    </div>
    <section  className="grid grid-cols-3 text-slate-600">

    <div>
      <p className="ml-4 font-bold text-lg">Availability</p>
      <div>
        <div className="selected-field">
          <label htmlFor="">Available From (Possible Date)</label>
          <input type="date" {...register("available_date")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Available Time</label>
          <input type="text" {...register("available_time")} />
        </div>
        <div className="selected-field">
          <label htmlFor=""> Completion On (Possible Date)</label>
          <input type="date" {...register("completion_date")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Required Duration (Possible)</label>
          <input type="text" {...register("durations")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Delay(Possible)</label>
          <input type="text" {...register("delays")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Reason(Delay)</label>
          <input type="text" {...register("delay_reason")} />
        </div>
      </div>
    </div>
    <div>
      <p className="ml-4 font-bold text-lg">Price</p>
      <div>
        <div className="selected-field">
          <label htmlFor="">Delivery Charge</label>
          <input type="text" {...register("delivery_charge")} />
        </div>

        <div className="selected-field">
          <label htmlFor="">Work Load (Service Amount)</label>
          <input type="text" {...register("size")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Total Charge</label>
          <input type="text" {...register("total")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Discount Amount</label>
          <input type="text" {...register("discount")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Additonal Charge</label>
          <input type="text" {...register("additional")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Emergency Charge</label>
          <input type="text" {...register("emergency")} />
        </div>
      </div>
    </div>
    <div>
      <p className="ml-4 font-bold text-lg" >Payment</p>
      <div>
        <div className="selected-field">
          <label htmlFor="">Advance Payment</label>
          <input type="text" {...register("advance_payment")} />
        </div>
        <div className="selected-field">
          <label htmlFor=""> Payment Method</label>
          <input type="text" {...register("payment_method")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Payment Time</label>
          <input type="text" {...register("payment_time")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Bank Name</label>
          <input type="text" {...register("bank")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Account Name</label>
          <input type="text" {...register("account_name")} />
        </div>
        <div className="selected-field">
          <label htmlFor="">Account Number</label>
          <input type="text" {...register("account_no")} />
        </div>
      </div>
    </div>
    </section>
    <div className="flex place-content-center gap-10 agreement-button ">
          <button
              onClick={() => {
             navigate(`/received/orders/${orderId}`, {replace:true})
              }}
              type="button"
            >
              Cancel{" "}
            </button>
            <button type="submit" >Submit</button>
          
          </div>
  </form>
  )
};

export default AddInitial;

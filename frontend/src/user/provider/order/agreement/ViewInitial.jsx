import React from "react";
import {
  useCheckInitialAgreementQuery,
} from "../../../../Api/agreementApi";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
const viewInitial = () => {
  const { orderId } = useParams();
  const status = useSelector((state) => state.orderSlice.status);
  console.log("status", status);
  const { data: initial, isLoading } = useCheckInitialAgreementQuery(orderId);
  console.log("initial", initial);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="shadow shadow-gray-300 mt-10 ">
      <div className="text-slate-700 p-3 border-b">
        <p className="text-center text-xl font-bold  ">Initial Agreement</p>
        <p className="text-center mt-5 text-md">
          <strong className="mr-4 text-[1.1em]">Status:</strong>{" "}
          {status?.isIAccept ? (
            <span className="text-green-600 font-semibold">Accepted</span>
          ) : (
            <span className="text-green-600 font-semibold">
              Not Accepted Yet
            </span>
          )}
        </p>
      </div>
      <section className="grid grid-cols-3  text-slate-700 border-b mb-5 ">
        <div className="border-r border-gray-300 p-5 box-border">
          <p className="ml-4 font-bold text-lg">Availability</p>
          <div>
            <div className="agreement-field">
              <strong htmlFor="">Available From (Possible Date)</strong>
              <p>{initial.available_date}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Available Time</strong>
              <p>{initial.available_time}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor=""> Completion On (Possible Date)</strong>
              <p>{initial.completion_date}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Required Duration (Possible)</strong>
              <p>{initial.durations}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Delay(Possible)</strong>
              <p>{initial.delays}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Reason(Delay)</strong>
              <p>{initial.delay_reason}</p>
            </div>
          </div>
        </div>
        <div className="border-r border-gray-300 p-5 box-border">
          <p className="ml-4 font-bold text-lg">Price</p>

          <div>
            <div className="agreement-field">
              <strong htmlFor="">Delivery Charge</strong>
              <p>{initial.delivery_charge}</p>
            </div>

            <div className="agreement-field">
              <strong htmlFor="">Work Load (Service Amount)</strong>
              <p>{initial.size}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Total Charge</strong>
              <p>{initial.total}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Discount Amount</strong>
              <p>{initial.discount}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Additonal Charge</strong>
              <p>{initial.additional}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Emergency Charge</strong>
              <p>{initial.emergency}</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="ml-4 font-bold text-lg">Payment</p>
          <div>
            <div className="agreement-field">
              <strong htmlFor="">Advance Payment</strong>
              <p>{initial.advance_payment}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor=""> Payment Method</strong>
              <p>{initial.payment_method}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Payment Time</strong>
              <p>{initial.payment_time}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Bank Name</strong>
              <p>{initial.bank}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Account Name</strong>
              <p>{initial.account_name}</p>
            </div>
            <div className="agreement-field">
              <strong htmlFor="">Account Number</strong>
              <p>{initial.account_no}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="p-4 flex justify-evenly">
        <button className="bg-green-700 p-2 px-4 mx-auto mt-5  block rounded-full text-white">
          Cancel Aagreement
        </button>
        <button className="bg-green-700 p-2 px-4 mx-auto mt-5  block rounded-full text-white">
          Edit Details
        </button>
      </div>
    </section>
  );
};

export default viewInitial;

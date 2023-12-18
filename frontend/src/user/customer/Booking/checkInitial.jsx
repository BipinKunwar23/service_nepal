import React from "react";
import { useCheckInitialAgreementQuery,useAcceptAgreementMutation } from "../../../Api/agreementApi";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

const checkInitial = () => {
  const { orderId } = useParams();
  const status = useSelector((state) => state.orderSlice.status);
  console.log("status", status);
  const { register, control, setValue, handleSubmit } = useForm();
  const { data: initial, isLoading } = useCheckInitialAgreementQuery(orderId);
  const [acceptAgreement,{isLoading:isAccept}] = useAcceptAgreementMutation();

  const handleAccept=async()=>{
    await acceptAgreement(orderId)
    .unwrap()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if (isLoading || isAccept) {
    return <Loader />;
  }
  if (!initial) {
    return <div>No Agreemnet is Found</div>;
  }
  return (
    <section className="shadow shadow-gray-300 mt-10 py-5">
      <div className="text-slate-700 p-3 border-b">
        <p className="text-center text-xl font-bold  ">Initial Agreement</p>
        <p className="text-center mt-5 text-md">
          <strong className="mr-4 text-[1.1em]">Status:</strong>{" "}
          {status?.isInitial ? (
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
      {!status?.isInitial && (
        <div>
          <form
            action=""
            className="flex gap-10 my-5 w-[80%] mx-auto flex-col border-2 p-10"
            onSubmit={handleSubmit(handleAccept)}
          >
              <Controller
                name="isInitial"
                control={control}
                defaultValue={false}
                render={({ field }) => {
                  return (
                    <div className="flex gap-5 ">
                      <div>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            const { checked } = e.target;
                            if (checked) {
                              setValue("isInitial", true);
                            } else {
                              setValue("isInitial", false);
                            }
                          }}
                        />
                      </div>
                      <p className="mr-4">
                        Accept Avaiabilty, Price and Payment Details as per the
                        agreement and allow service provider to make final
                        agreement or to provide service for you
                      </p>
                    </div>
                  );
                }}
              />

            <button
              type="submit"
              className="bg-blue-600 w-1/2 place-self-center text-white p-2 px-4 rounded-full shadow"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default checkInitial;

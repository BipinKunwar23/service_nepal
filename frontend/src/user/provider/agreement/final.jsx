import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSteps } from "../../../redux/orderSlice";
import { useFinalAgreementMutation } from "../../../Api/agreementApi";

const Final = () => {
  const { register, control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [finalAgreement, { data, isLoading, isSuccess }] =
    useFinalAgreementMutation();

  const step = useSelector((state) => state.orderSlice.step);
  const { orderId } = useParams();
  const onSubmit = async (values) => {
    console.log(values);
    await finalAgreement({ values, orderId })
      .unwrap()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <section className="grid grid-cols-3  text-slate-600">
        <div>
          <p className="ml-4 font-bold text-lg">Terms and Codition</p>
          <div>
            <div className="selected-field">
              <label htmlFor=""> Material</label>
              <input type="text" {...register("material")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Payment</label>
              <input type="text" {...register("payment_condition")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Prequisites</label>
              <input type="text" {...register("prerequisites")} />
            </div>
          </div>
        </div>

        <div>
          <p className="ml-4 font-bold text-lg">Tracking Service</p>
          <div className="selected-field">
            <label htmlFor="">Confirmation Time</label>
            <input type="text" {...register("confirm_time")} />
          </div>

          <div className="selected-field">
            <label htmlFor="">Response Time</label>
            <input type="text" {...register("response_time")} />
          </div>
          <div className="selected-field">
            <label htmlFor=""> Status Update</label>
            <input type="text" {...register("status_time")} />
          </div>
        </div>
        <div>
          <p className="ml-4 font-bold text-lg">Qualtry Assurance</p>
          <div>
            <div className="selected-field">
              <label htmlFor=""> Acheivement</label>
              <input type="text" {...register("acheivement")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Limitation</label>
              <input type="text" {...register("limitation")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Risks</label>
              <input type="text" {...register("risks")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Service Waranty</label>
              <input type="text" {...register("waranty")} />
            </div>
          </div>
        </div>
        <div>
          <p className="ml-4 font-bold text-lg">Refund Policy</p>
          <div>
            <div className="selected-field">
              <label htmlFor=""> Description</label>
              <input type="text" {...register("refund")} />
            </div>
            <div className="selected-field">
              <label htmlFor="">Refundable Amount</label>
              <input type="text" {...register("refund_amount")} />
            </div>
          </div>
        </div>
        <div>
          <p className="ml-4 font-bold text-lg">Reference </p>
          <div>
            <div className="selected-field">
              <label htmlFor=""> Name</label>
              <input type="text" {...register("refernce_name")} />
            </div>
            <div className="selected-field">
              <label htmlFor=""> Contact</label>
              <input type="text" {...register("refernce_contact")} />
            </div>
          </div>
        </div>
      </section>
      <div className="flex place-content-center gap-10 agreement-button">
        {!step.initial && (
          <button
            type="button"
            onClick={() => {
              dispatch(setSteps({ initial: true, final: false }));
            }}
          >
            Back
          </button>
        )}
        <button type="submit">Submit</button>
        <button
          onClick={() => {
            navigate(`/received/orders/${orderId}`, { replace: true });
          }}
          type="button"
        >
          Cancel{" "}
        </button>
      </div>
    </form>
  );
};

export default Final;

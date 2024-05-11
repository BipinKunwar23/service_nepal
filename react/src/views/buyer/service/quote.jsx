import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setQuote } from "../../../redux/buyerSlice";

const AddQuote = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const dispatch = useDispatch();

  return (
    <div className="absolute top-0 w-full h-full bg-[rgba(0,0,0,0.1)]">
      <form
        className="  bg-white w-[52Vw] mx-auto translate-y-6 p-4    rounded shadow"
        action=""
        onSubmit={handleSubmit()}
      >
        <div className="   flex gap-4 p-4 border-b mb-2 text-gray-700 ">
          <p className="flex-1 text-xl font-semibold text-slate-800   ">
            Request A Quote
          </p>
          <button
            className="text-xl  "
            onClick={() => {
              dispatch(setQuote(false));
            }}
          >
            X
          </button>
        </div>

        <div className=" space-y-2 text-[0.95em] overflow-y-auto h-[65Vh] ">
          <div className="selected-field ">
            <label htmlFor="">
              Describe the service your're looking to purchase - please be
              detailed as possible.
            </label>

            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="I am looking for"
            ></textarea>
          </div>

          {/* <div className="selected-field ">
            <label htmlFor="">Full Address</label>

            <input type="text" {...register("address")} />
          </div> */}

          <div className="selected-field ">
            <label htmlFor="">
              Once you have place your order, when do you like your service get
              started ?
            </label>
            <input type="date" {...register("scheduled_date")} />
          </div>

          <div className="p-3 flex flex-col gap-3  ">
            <label
              htmlFor=""
              className="text-slate-700 mb-2  text-[1.1em] font-semibold "
            >
              What is your budget for this service ?
            </label>
            <div className="flex gap-2 border p-2.5 w-1/3">
              <span>Rs</span>
              <input type="number" {...register("scheduled_date")} className=" border-none focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 font-semibold place-self-end ">
          <input
            type="submit"
            value="Submit Request"
            className="border bg-gray-700 rounded w-36 p-2 shadow text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AddQuote;

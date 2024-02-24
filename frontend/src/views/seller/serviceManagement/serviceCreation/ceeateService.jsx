import React, { useCallback, useEffect, useState } from "react";
import OverView from "./overView";
import Pricing from "./pricing";
import Description from "./description";
import { Gallery } from "./gallery";
import Requirements from "./requirement";
import { useGetDraftServicesQuery } from "../../../../api/seller/serviceApi";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setSteps,
  setServiceId, 
  setStepCount,
} from "../../../../redux/sellerSlice";
const CreateService = () => {
  const { data, isLoading } = useGetDraftServicesQuery();
  console.log("draft", data);
  const steps = useSelector((state) => state.sellerSlice.steps);
  const stepCount = useSelector((state) => state.sellerSlice.stepCount);
console.log('stepcount',typeof(stepCount.toString()));
  const dispatch = useDispatch();


  const processData = async () => {
    if (data && Object.keys(data).length!==0) {
      let updatedSteps = [...steps];
  
      updatedSteps = await updateSteps(2, updatedSteps);
      dispatch(setServiceId(data?.id));
  
      if (data?.prices) {
        updatedSteps = await updateSteps(3, updatedSteps);
        if (data?.faqs.length!==0) {
          updatedSteps = await updateSteps(4, updatedSteps);
          if (data?.galleries.length!==0) {
            updatedSteps = await updateSteps(5, updatedSteps);
          }
        }
      }
  
      console.log('Final Updated Steps:', updatedSteps);
    }
  };
  
  const updateSteps = (id, currentSteps) => {
    return new Promise((resolve) => {
      const updatedSteps = [...currentSteps];
      const stepIndex = updatedSteps.findIndex((step) => step.id === id);
  
      if (stepIndex !== -1) {
        updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], show: true };
        dispatch(setSteps(updatedSteps));
        resolve(updatedSteps);
      } else {
        resolve(currentSteps);
      }
    });
  };
  
  useEffect(() => {
    processData();
  }, [data]);

  console.log("stpes", steps);

  const handlePages = () => {
    switch (stepCount) {
      case 1:
        return <OverView overview={data} />;

        break;
      case 2:
        return <Pricing data={data?.prices} />;

        break;
      case 3:
        return <Description data={data?.faqs} />;

        break;
      case 4:
        return <Gallery data={data?.galleries} />;

        break;
      case 5:
        return <Requirements data={data?.requirements} />;

        break;

      default:
        break;
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className=" py-4 px-10 mx-auto bg-gray-100">
      <section className="w-[80Vw] mx-auto">
        <div>
          <div className="flex justify-end">
            <div className="w-[200px] border h-6 rounded-full m-3  bg-white relative">
              <p className={` grid place-content-center  bg-green-600 h-full rounded-full    `}
              style={{
                width:`${(stepCount-1)*20}%`
              }}
              >
                <span className="absolute left-1/2 right-1/2 z-10 text-gray-700">
                { 
                  (stepCount-1)*20
                }%
                </span>
              </p>
            </div>

          </div>
        </div>
        <div className="flex justify-between mb-9 text-gray-300">


          {steps.map((step, index) => {
            return (
              <div className="flex gap-2" key={step.id}>
                <span className="bg-green-400 border rounded-full h-[30px] w-[30px] block text-center text-lg text-white ">
                  {step.id}
                </span>
                <button
                  className={`  text-[1.1em] font-semibold  ${
                    stepCount === step.id && "text-gray-800"
                  } `}
                  onClick={() => {
                    dispatch(setStepCount(step.id));
                  }}
                  disabled={!step.show}
                >
                  {step.title}
                </button>
              </div>
            );
          })}
        </div>
        <section className="p-5">{handlePages()}</section>
      </section>
    </section>
  );
};

export default CreateService;

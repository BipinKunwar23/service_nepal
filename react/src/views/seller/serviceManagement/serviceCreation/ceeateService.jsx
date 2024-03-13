import React, { useCallback, useEffect, useState } from "react";
import OverView from "./overView";
import Pricing from "./pricing";
import Description from "./description";
import { Gallery } from "./gallery";
import Requirements from "./requirement";
import Loader from "../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import PrviewService from "./preview";
import {
  setSteps,
  setServiceId, 
  setStepCount,
} from "../../../../redux/sellerSlice";
const CreateService = ({data}) => {

  console.log("draft", data);
  const steps = useSelector((state) => state.sellerSlice.steps);
  const stepCount = useSelector((state) => state.sellerSlice.stepCount);

  const [currentStep,setCurrentStep]=useState(0);

  console.log('currentStep',currentStep);
console.log('stepcount',typeof(stepCount.toString()));
  const dispatch = useDispatch();


  const processData = async () => {
    if (data && Object.keys(data).length!==0) {
      let updatedSteps = [...steps];
  
      updatedSteps = await updateSteps(2, updatedSteps);
      dispatch(setServiceId(data?.id));
  
      if (data?.packages?.length>0) {
        updatedSteps = await updateSteps(3, updatedSteps);
        if (data?.faqs.length!==0) {
          updatedSteps = await updateSteps(4, updatedSteps);
          if (data?.galleries.length!==0) {
            updatedSteps = await updateSteps(5, updatedSteps);
          }
          if (data?.requirements) {
            updatedSteps = await updateSteps(6, updatedSteps);
          }
        }
      }
  setCurrentStep(updatedSteps.length)
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
        return <Pricing data={data?.packages} optionId={data?.option_id} />;

        break;
      case 3:
        return <Description faqs={data?.faqs} description={data?.description} />;

        break;
      case 4:
        return <Gallery galleries={data?.galleries} />;

        break;
      case 5:
        return <Requirements data={data?.requirements} />;

        break;
        case 6:
          return <PrviewService services={data} />;
  
          break;

      default:
        break;
    }
  };


  return (
    <>
      <div className="p-6">
        <h2 className="text-green-600 font-semibold text-3xl">Technician</h2>
      </div>
    <section className=" py-4 px-10 mx-auto bg-gray-100">
      <section className="w-[80Vw] mx-auto">
        <div className="mb-3">
          <div className="flex justify-end gap-6">
            <div className="w-[200px] border h-6 rounded-full m-3  bg-white relative">
              <p className={` grid place-content-center   bg-green-600 h-full rounded-full    `}
              style={{
                width:`${currentStep*20}%`
              }}
              >
                <span className={`absolute left-1/2 right-1/2 z-10 text-gray-700 ${currentStep*20>=50 && "text-white"}`}>
                {  
                  currentStep*20
                }%
                </span>
              </p>
            </div>
            <div className="grid place-content-center text-lg">
              <button className={`  text-gray-300 font-semibold  ${
                    stepCount === 6 && "text-gray-800"
                  } `}
                  onClick={() => {
                    dispatch(setStepCount(6));
                  }}
                  disabled={data?.requirements===null}
                  >Preview</button>
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
        <section className="p-4 bg-white">{handlePages()}</section>
      </section>
    </section>
    </>

  );
};

export default CreateService;
